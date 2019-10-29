/*
Netlify function code for Salesforce Lead Submission
*/

// Module Imports
const request = require("request");
const parser = require("ua-parser-js");

// Global Variables
const API_CONTACT_FORM_URL =
    "https://webhook.site/d2d2dbd7-ba82-4ca9-8c19-85b90927156b";
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

function getIPInfo(ip) {
    request.get("http://free.ipwhois.io/json/" + ip, (err, res, body) => {
        if (err) {
            console.warn(err);
            let msg = "Error retrieving IP Info";
            return {
                ip: msg,
                asn: msg,
                ipVersion: msg,
                ipOwner: msg,
                asnOwner: msg,
                country: msg,
                state: msg,
                city: msg
            };
        } else {
            const data = JSON.parse(body);
            const ipInfo = {
                ip: data.ip,
                asn: data.asn,
                ipVersion: data.type,
                ipOwner: data.org,
                asnOwner: data.isp,
                country: data.country,
                state: data.state,
                city: data.city
            };
            console.info(`Constructed IP Info: ${JSON.stringify(ipInfo)}`);
            return ipInfo;
        }
    });
}

function submitFormData(formData) {
    console.info(
        `[contact.js] Submitting form data: ${JSON.stringify(formData)}`
    );
    request.post(
        { baseUrl: API_CONTACT_FORM_URL, json: true, body: formData },
        (err, res, body) => {
            if (err) {
                throw new FormError(CODES.NOT_IMPLEMENTED, "failure", err);
            } else {
                if (body.success === "false") {
                    const errors = body.errors.join(", ");
                    throw new FormError(CODES.BAD_REQUEST, "failure", errors);
                } else {
                    console.info("Success Response:", JSON.stringify(body));
                    const callbackBody = JSON.stringify({
                        status: "success",
                        content: "Success!"
                    });
                    return callbackBody;
                }
            }
        }
    );
}

function handleFormSubmit(event, context, callback) {
    console.info(event);
    // Serialize submitted form data
    try {
        const [data, headers] = checkEventData(event);
        var metadataRaw = {
            clientIP: headers["client-ip"] || "Unknown",
            requestID: headers["x-bb-client-request-uuid"] || "Unknown",
            userAgent: headers["user-agent"] || "Unknown"
        };
        console.info(`[contact.js] Metadata: ${JSON.stringify(metadataRaw)}`);

        metadataRaw.userAgent = parseUserAgent(metadataRaw.userAgent);
        const ipInfo = getIPInfo(metadataRaw.clientIP);

        const formDescription = `
        Form Data:

        Subject: ${data.contactSubject}
        Message:
        ${data.contactMessage}

        Request Metadata:
        Request ID: ${metadataRaw.requestID}
        IP Address: ${metadataRaw.clientIP} (${ipInfo.ipOwner})
        ASN: ${ipInfo.asn} (${ipInfo.asnOwner})
        Location: ${ipInfo.city}, ${ipInfo.state}, ${ipInfo.country}
        Device Type: ${metadataRaw.userAgent.device.type}
        Device: ${metadataRaw.userAgent.device.vendor} ${metadataRaw.userAgent.device.model}
        OS: ${metadataRaw.userAgent.os.name} ${metadataRaw.userAgent.os.version}
        Browser: ${metadataRaw.userAgent.browser.name} Version ${metadataRaw.userAgent.browser.version}
        `;

        // Submit the form data to Salesforce
        // Simple string splitting to parse a last name which is required by Salesforce
        const names = data["contactName"].split(" ");
        // Re-serialize the data in the format Salesforce is expecting
        const formData = {
            Company: data.contactCompany,
            LastName: names.slice(1).join(" ") || "",
            FirstName: names[0] || "",
            Email: data.contactEmail,
            Phone: data.contactPhone,
            LeadSource: "stellar.tech Contact Form",
            Description: formDescription
        };
        const callbackBody = submitFormData(formData);

        console.info("Callback body:", callbackBody);
        callback(null, {
            statusCode: CODES.CREATED,
            body: callbackBody
        });
    } catch (error) {
        console.trace(error);
        let errorCode, errorMessage, errorContent;
        if (!(error instanceof FormError)) {
            errorCode = 500;
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
