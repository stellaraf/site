/*
Netlify function code for Salesforce Lead Submission
*/

// Module Imports
// const request = require("request");
const axios = require("axios");
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

function checkEventData(event, callback) {
    try {
        const data = JSON.parse(event.body);
        const headers = event.headers;
        const status = "failure";
        var content, code;

        if (!("origin" in headers)) {
            content = "Request did not originate from browser";
            code = CODES.UNAUTHORIZED;
        } else if (
            data === undefined ||
            data === null ||
            typeof data === "string"
        ) {
            // If the data is serialized but is empty for some reason, return an error
            content = "No Data Received";
            code = CODES.SERVER_ERROR;
        }
        if (content === undefined && code === undefined) {
            return [data, headers];
        } else {
            console.error(
                `[contact.js] Code: ${String(code)} Content: ${content}`
            );
            callback(null, {
                statusCode: code || CODES.SERVER_ERROR,
                body: JSON.stringify({
                    status: status,
                    content: content || "General Error"
                })
            });
        }
    } catch (runtimeError) {
        console.error(`[contact.js] Runtime Error: ${runtimeError}`);
    }
}

async function parseUserAgent(userAgentString) {
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
    return parsedUA;
}

async function getIPInfo(ip) {
    let ipInfoRaw = {
        ip: "Unknown",
        asn: "Unknown",
        ipVersion: "Unknown",
        ipOwner: "Unknown",
        asnOwner: "Unknown",
        country: "Unknown",
        state: "Unknown",
        city: "Unknown"
    };
    const ipInfoEndpoint = "http://free.ipwhois.io/json/" + ip;
    const response = await axios.get(ipInfoEndpoint);
    ipInfoRaw.ip = response.ip;
    ipInfoRaw.asn = response.asn;
    ipInfoRaw.ipVersion = response.ipVersion;
    ipInfoRaw.ipOwner = response.org;
    ipInfoRaw.asnOwner = response.isp;
    ipInfoRaw.country = response.country;
    ipInfoRaw.state = response.state;
    ipInfoRaw.city = response.city;
    console.info(`Constructed IP Info: ${ipInfoRaw}`);
    return ipInfoRaw;
}

async function submitFormData(formData, callback) {
    var statusCode, statusMsg, content;
    var callbackBody = JSON.stringify({
        status: "failure",
        content: "General Error"
    });
    axios({
        method: "post",
        url: API_CONTACT_FORM_URL,
        data: formData,
        headers: { "Content-Type": "application/json" }
    })
        .then(res => {
            if (res.data.success === "true") {
                content = "Success!";
                statusCode = CODES.CREATED;
                statusMsg = "success";
                console.info(
                    `[contact.js] Success, Response: ${JSON.stringify(
                        res.data
                    )}`
                );
            } else {
                content = res.data.errors.join(", ");
                statusCode = CODES.BAD_REQUEST;
                statusMsg = "failure";
                console.error(
                    `[contact.js] Failure, Response: ${JSON.stringify(
                        res.data
                    )}`
                );
            }
        })
        .catch(error => {
            content = String(error);
            statusCode = CODES.NOT_IMPLEMENTED;
            statusMsg = "failure";
            console.error(`[contact.js] Failure, Error: ${error}`);
        })
        .finally(() => {
            callbackBody = JSON.stringify({
                status: statusMsg,
                content: content
            });
            console.log(
                `[contact.js] Calling back: Status Code: ${statusCode}, Body: ${callbackBody}`
            );
            callback(null, {
                statusCode: statusCode,
                body: callbackBody
            });
        });
    return callbackBody;
}

async function handleFormSubmit(event, context, callback) {
    console.info(event);
    // if (API_CONTACT_FORM_URL === undefined || API_CONTACT_FORM_URL === null) {
    //     callback(null, {
    //         statusCode: CODES.SERVER_ERROR,
    //         body: JSON.stringify({
    //             status: "failure",
    //             content: "Unable to read API URL from environment variables"
    //         })
    //     });
    // }
    // Serialize submitted form data
    try {
        const [data, headers] = checkEventData(event, callback);
        // const data = JSON.parse(event.body);
        // const headers = event.headers;

        // if (!("origin" in headers)) {
        //     callback(null, {
        //         statusCode: CODES.UNAUTHORIZED,
        //         body: JSON.stringify({
        //             status: "failure",
        //             content: "Request did not originate from browser"
        //         })
        //     });
        // }

        // if (data === undefined || data === null || typeof data === "string") {
        //     // If the data is serialized but is empty for some reason, return an error
        //     callback(null, {
        //         statusCode: CODES.SERVER_ERROR,
        //         body: JSON.stringify({
        //             status: "failure",
        //             content: "No Data Received"
        //         })
        //     });
        // }
        var metadataRaw = {
            clientIP: headers["client-ip"] || "Unknown",
            requestID: headers["x-bb-client-request-uuid"] || "Unknown",
            userAgent: headers["user-agent"] || "Unknown"
        };
        metadataRaw.userAgent = await parseUserAgent(metadataRaw.userAgent);
        // if (metadataRaw.userAgent !== "") {
        //     const parsedUA = parser(metadataRaw.userAgent);
        //     for (const key in parsedUA) {
        //         if (typeof parsedUA[key] === "object") {
        //             for (const block in parsedUA[key]) {
        //                 if (typeof parsedUA[key][block] !== "string") {
        //                     parsedUA[key][block] = String(parsedUA[key][block]);
        //                 }
        //             }
        //         } else if (
        //             typeof parsedUA[key] !== "string" ||
        //             typeof parsedUA[key] !== "object"
        //         ) {
        //             parsedUA[key] = String(parsedUA[key]);
        //         }
        //     }
        //     metadataRaw.userAgent = parsedUA;
        // }
        // var ipInfoRaw = {
        //     ip: "Error",
        //     asn: "Error",
        //     ipVersion: "Error",
        //     ipOwner: "Error",
        //     asnOwner: "Error",
        //     country: "Error",
        //     state: "Error",
        //     city: "Error"
        // };
        // request.get(
        //     `${IP_INFO_URL}${metadataRaw.clientIP}`,
        //     (err, httpResponse, body) => {
        //         console.info(`Raw IP Info: ${body}`);
        //         if (
        //             (body !== undefined || body !== null) &&
        //             body.success === true
        //         ) {
        //             ipInfoRaw = {
        //                 ip: body.ip || "Unknown",
        //                 asn: body.asn || "Unknown",
        //                 ipVersion: body.type || "Unknown",
        //                 ipOwner: body.org || "Unknown",
        //                 asnOwner: body.isp || "Unknown",
        //                 country: body.country || "Unknown",
        //                 state: body.region || "Unknown",
        //                 city: body.city || "Unknown"
        //             };
        //         }
        //     }
        // );
        // console.info(`Constructed IP Info: ${ipInfoRaw}`);
        const ipInfo = await getIPInfo(metadataRaw.clientIP);
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
        // POST the data
        // var content = "General Error",
        //     statusMsg = "failure",
        //     statusCode = CODES.SERVER_ERROR;
        // request.post(
        //     { url: API_CONTACT_FORM_URL, json: true, body: formData },
        //     (err, httpResponse, body) => {
        //         if (err) {
        //             // If HTTP errors are received, return an error
        //             content = String(err);
        //             statusCode = CODES.NOT_IMPLEMENTED;
        //             console.warn(content);
        //         } else {
        //             const response = body;
        //             // If data submission is successful, verify that the Salesforce "success" field is set to "true"
        //             if (response.success !== "true") {
        //                 // If success field is "false", return an error
        //                 console.warn(`[contactform.js] Creation Error`);
        //                 content = response.errors.join(", ");
        //                 statusCode = CODES.NOT_IMPLEMENTED;
        //             } else {
        //                 // if success field is "true", return a success message
        //                 content = "Success!";
        //                 statusMsg = "success";
        //                 statusCode = CODES.CREATED;
        //                 console.info(`[contactform.js] content: ${content}`);
        //             }
        //         }
        //         console.log(
        //             `[contactform.js]: Status Code: ${statusCode} Callback: ${{
        //                 status: statusMsg,
        //                 content: content
        //             }}`
        //         );
        //         callback(null, {
        //             statusCode: statusCode,
        //             body: JSON.stringify({
        //                 status: statusMsg,
        //                 content: content
        //             })
        //         });
        //     }
        // );
        submitFormData(formData, callback);
    } catch (submissionError) {
        // If errors occur while submitting the data to Salesforce, return an error
        const content = String(submissionError);
        console.error(`[contact.js]: Submission Error: ${content}`);
        callback(null, {
            statusCode: CODES.GATEWAY_TIMEOUT,
            body: JSON.stringify({ status: "failure", content: content })
        });
    }
}

// Handle the lambda invocation
exports.handler = handleFormSubmit;
