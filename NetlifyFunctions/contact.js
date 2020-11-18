/*
Netlify function code for Salesforce Lead Submission
*/

// Module Imports
const axios = require("axios");
const querystring = require("querystring");
const parser = require("ua-parser-js");

// Environment Variables
const { FORM_API_ENDPOINT, FORM_IP_INFO_ENDPOINT, FORM_SF_OID } = process.env;

// Global Variables
const IP_DATA_UNKNOWN = "Data Unavailable";
const CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    GATEWAY_TIMEOUT: 504
};

/**
 * Common exception for callbacks
 * @param {number} code HTTP status code
 * @param {"success"|"failure"} message Success/failure state
 * @param {string} content Details
 */
function FormError(code, message, content) {
    this.name = "FormError";
    this.code = code;
    this.message = message;
    this.content = content;
}

/**
 * Serialize and validate submitted form data
 * @param {Raw event object} event
 */
function checkEventData(event) {
    let eventData = [];
    try {
        const data = JSON.parse(event.body);
        const headers = event.headers;
        if (!("origin" in headers)) {
            throw new FormError(
                CODES.UNAUTHORIZED,
                "failure",
                "Request did not originate from browser"
            );
        } else if (
            data === undefined ||
            data === null ||
            typeof data === "string"
        ) {
            // If the data is serialized but is empty for some reason, return an error
            throw new FormError(
                CODES.SERVER_ERROR,
                "failure",
                "No Form Data Received"
            );
        }
        eventData = [data, headers];
    } catch (error) {
        if (error instanceof FormError) {
            throw error;
        } else {
            throw new FormError(
                CODES.BAD_REQUEST,
                "failure",
                "Event Data Error"
            );
        }
    }
    return eventData;
}

/**
 * Parse & stringify user agent string
 * @param {User agent string from even headers} userAgentString
 */
function parseUserAgent(userAgentString) {
    let parsedUA = parser(userAgentString);
    if (userAgentString !== "") {
        for (const key in parsedUA) {
            if (typeof parsedUA[key] === "object") {
                for (const block in parsedUA[key]) {
                    if (typeof parsedUA[key][block] !== "string") {
                        parsedUA[key][block] = String(parsedUA[key][block]);
                    }
                }
            } else if (
                typeof parsedUA[key] !== "string" ||
                typeof parsedUA[key] !== "object"
            ) {
                parsedUA[key] = String(parsedUA[key]);
            } else if (parsedUA[key] === undefined) {
                parsedUA[key] = `${key} Unknown`;
            }
        }
    }
    console.info(`[contact.js] User Agent: ${JSON.stringify(parsedUA)}`);
    return parsedUA;
}

/**
 * Parse collected data and build new JSON object matching Salesforce fields
 * @param {Contact form object} formData
 * @param {Filtered headers & user agent object} requestData
 * @param {IP geolocation data object} ipData
 */
function buildLeadData(formData, requestData, ipData) {
    if (FORM_SF_OID === undefined) {
        throw new FormError(
            CODES.SERVER_ERROR,
            "failure",
            "No Salesforce OID was found"
        );
    }

    const lead_ip_fields = ["country", "city", "state"];
    let parsedForm = {};

    // If Phone Number is not provided, set doNotCall field to true/1
    if (formData.contactPhone === "") {
        parsedForm.doNotCall = "1";
    } else {
        parsedForm.phone = formData.contactPhone;
    }

    // If an IP geolocation field was found, add it to the parsedForm object
    lead_ip_fields.forEach((field, i) => {
        if (ipData[field] !== IP_DATA_UNKNOWN) {
            parsedForm[field] = ipData[field];
        }
    });

    // If a subject was provided, assign it to the description field
    if (formData.subject !== "") {
        parsedForm.description = formData.subject;
    }

    // Parse single Name field to First and Last Name
    const names = formData.contactName.split(" ");
    parsedForm.last_name = names.slice(1).join(" ");
    parsedForm.first_name = names[0];

    parsedForm.email = formData.contactEmail;
    parsedForm.company = formData.contactCompany;
    parsedForm.lead_source = "Website";
    parsedForm.oid = FORM_SF_OID;

    parsedForm["00N3j00000FccT7"] = `
    Message:
    ${formData.contactMessage}
    
    Request Metadata:
    Request ID: ${requestData.requestID}
    IP Address: ${requestData.clientIP} (${ipData.ipOwner})
    ASN: ${ipData.asn} (${ipData.asnOwner})
    Device Type: ${requestData.userAgent.device.type}
    Device: ${requestData.userAgent.device.vendor} ${requestData.userAgent.device.model}
    OS: ${requestData.userAgent.os.name} ${requestData.userAgent.os.version}
    Browser: ${requestData.userAgent.browser.name} Version ${requestData.userAgent.browser.version}
    `;
    console.info("Build Lead Data:", parsedForm);
    return parsedForm;
}
/**
 * Query ipwhois.io service to gather IP address info and add to form data
 * @param {IP address from event headers} ip
 * @param {Callback function} callback
 */
function getIPInfo(ip, callback) {
    const endpoint = FORM_IP_INFO_ENDPOINT + ip;
    const axiosConfig = { url: endpoint, method: "get" };
    axios(axiosConfig)
        .then(response => {
            const rawData = response.data;
            const ipInfo = {
                ip: rawData.ip || IP_DATA_UNKNOWN,
                asn: rawData.asn || IP_DATA_UNKNOWN,
                ipVersion: rawData.type || IP_DATA_UNKNOWN,
                ipOwner: rawData.org || IP_DATA_UNKNOWN,
                asnOwner: rawData.isp || IP_DATA_UNKNOWN,
                country: rawData.country || IP_DATA_UNKNOWN,
                state: rawData.region || IP_DATA_UNKNOWN,
                city: rawData.city || IP_DATA_UNKNOWN
            };
            console.info("Constructed:", ipInfo);
            callback(ipInfo);
        })
        .catch(error => {
            console.trace(error);
            const ipInfo = {
                ip: IP_DATA_UNKNOWN,
                asn: IP_DATA_UNKNOWN,
                ipVersion: IP_DATA_UNKNOWN,
                ipOwner: IP_DATA_UNKNOWN,
                asnOwner: IP_DATA_UNKNOWN,
                country: IP_DATA_UNKNOWN,
                state: IP_DATA_UNKNOWN,
                city: IP_DATA_UNKNOWN
            };
            console.info("Constructed via Error", ipInfo);
            callback(ipInfo);
        });
}

/**
 * Send validated, parsed, and newly constructed data to Salesforce web to lead API
 * @param {Constructed form data object} formData
 * @param {Callback function} callback
 */
function submitFormData(formData, callback) {
    const endpoint = [FORM_API_ENDPOINT, querystring.stringify(formData)].join(
        "&"
    );
    const axiosConfig = {
        url: endpoint,
        method: "post"
    };
    axios(axiosConfig)
        .then(response => {
            if (response.status === CODES.OK) {
                callback(
                    JSON.stringify({
                        status: "success",
                        content: "Success!"
                    })
                );
            } else {
                console.info(
                    "[Salesforce Response]",
                    response.status,
                    response.data
                );
                callback(
                    JSON.stringify({
                        status: "failure",
                        content: `${response.status}: ${response.data}`
                    })
                );
            }
        })
        .catch(err => {
            throw new FormError(CODES.NOT_IMPLEMENTED, "failure", err);
        });
}

/**
 *
 * @param {Event object from Netlify} event
 * @param {Context object from Netlify} context
 * @param {Callback function} callback
 */
function handleFormSubmit(event, context, callback) {
    console.info(event);
    // Serialize submitted form data
    try {
        const [data, headers] = checkEventData(event);
        const requestData = {
            clientIP: headers["client-ip"],
            requestID: headers["x-bb-client-request-uuid"] || "Unknown",
            userAgent: headers["user-agent"]
        };
        const parsedUserAgent = parseUserAgent(requestData.userAgent);
        requestData.userAgent = parsedUserAgent;

        getIPInfo(requestData.clientIP, ipData => {
            const formData = buildLeadData(data, requestData, ipData);
            submitFormData(formData, callbackBody => {
                console.info("Callback body:", callbackBody);
                callback(null, {
                    statusCode: CODES.CREATED,
                    body: callbackBody
                });
            });
        });
    } catch (error) {
        console.trace(error);
        let errorCode, errorMessage, errorContent;
        if (!(error instanceof FormError)) {
            errorCode = CODES.SERVER_ERROR;
            errorMessage = "failure";
            errorContent = error;
        } else {
            errorCode = error.code;
            errorMessage = error.message;
            errorContent = error.content;
        }
        // If errors occur while submitting the data to Salesforce, return an error
        callback(null, {
            statusCode: errorCode,
            body: JSON.stringify({
                status: errorMessage,
                content: errorContent
            })
        });
    }
}

exports.handler = handleFormSubmit;
