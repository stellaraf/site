/*
Netlify function code for Salesforce Lead Submission
*/

// Module Imports
const axios = require("axios");
const parser = require("ua-parser-js");

// Global Variables
const API_CONTACT_FORM_URL =
    "https://webhook.site/d2d2dbd7-ba82-4ca9-8c19-85b90927156b";
const IP_INFO_ENDPOINT = "http://free.ipwhois.io/json/";
const CODES = {
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    GATEWAY_TIMEOUT: 504
};

/**
 *
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
            }
        }
    }
    console.info(`[contact.js] User Agent: ${JSON.stringify(parsedUA)}`);
    return parsedUA;
}

function getIPInfo(ip, callback) {
    const endpoint = IP_INFO_ENDPOINT + ip;
    const unknownMsg = "Data Unavailable";
    const axiosConfig = { url: endpoint, method: "get" };
    axios(axiosConfig)
        .then(response => {
            const rawData = response.data;
            const ipInfo = {
                ip: rawData.ip || unknownMsg,
                asn: rawData.asn || unknownMsg,
                ipVersion: rawData.type || unknownMsg,
                ipOwner: rawData.org || unknownMsg,
                asnOwner: rawData.isp || unknownMsg,
                country: rawData.country || unknownMsg,
                state: rawData.state || unknownMsg,
                city: rawData.city || unknownMsg
            };
            console.info("Constructed:", ipInfo);
            callback(ipInfo);
        })
        .catch(error => {
            console.trace(error);
            const ipInfo = {
                ip: unknownMsg,
                asn: unknownMsg,
                ipVersion: unknownMsg,
                ipOwner: unknownMsg,
                asnOwner: unknownMsg,
                country: unknownMsg,
                state: unknownMsg,
                city: unknownMsg
            };
            console.info("Constructed via Error", ipInfo);
            callback(ipInfo);
        });
}

function submitFormData(formData, callback) {
    const axiosConfig = {
        url: API_CONTACT_FORM_URL,
        method: "post",
        data: formData
    };
    axios(axiosConfig)
        .then(response => {
            const callbackBody = JSON.stringify({
                status: "success",
                content: "Success!"
            });
            console.info("[Salesforce Response]", response.data);
            callback(callbackBody);
        })
        .catch(err => {
            throw new FormError(CODES.NOT_IMPLEMENTED, "failure", err);
        });
}

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
            const formDescription = `
            Form Data:
            
            Subject: ${data.contactSubject}
            Message:
            ${data.contactMessage}
            
            Request Metadata:
            Request ID: ${requestData.requestID}
            IP Address: ${requestData.clientIP} (${ipData.ipOwner})
            ASN: ${ipData.asn} (${ipData.asnOwner})
            Location: ${ipData.city}, ${ipData.state}, ${ipData.country}
            Device Type: ${requestData.userAgent.device.type}
            Device: ${requestData.userAgent.device.vendor} ${requestData.userAgent.device.model}
            OS: ${requestData.userAgent.os.name} ${requestData.userAgent.os.version}
            Browser: ${requestData.userAgent.browser.name} Version ${requestData.userAgent.browser.version}
            `;

            const names = data.contactName.split(" ");
            const formData = {
                Company: data.contactCompany,
                LastName: names.slice(1).join(" ") || "",
                FirstName: names[0] || "",
                Email: data.contactEmail,
                Phone: data.contactPhone,
                LeadSource: "Contact Form",
                Description: formDescription
            };
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

// Handle the lambda invocation
exports.handler = handleFormSubmit;
//
