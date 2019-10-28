/*
Netlify function code for Salesforce Lead Submission
*/

const request = require("request");
const apiURL = "https://webhook.site/d2d2dbd7-ba82-4ca9-8c19-85b90927156b";

// Handle the lambda invocation
exports.handler = (event, context, callback) => {
    console.info(event);
    // Serialize submitted form data
    try {
        const data = JSON.parse(event.body);

        if (data === undefined || data === null || typeof data === "string") {
            // If the data is serialized but is empty for some reason, return an error
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    status: "failure",
                    content: "No Data Received"
                })
            });
        }
        // Submit the for data to Salesforce
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
            Description: `Form Data:\nSubject:${
                data.contactSubject
            }\nMessage:\n${data.contactMessage}\n\nMetadata:\n${""}`
        };
        // POST the data
        request.post(
            { url: apiURL, json: true, body: formData },
            (err, httpResponse, body) => {
                let content = "General Error",
                    statusMsg = "failure",
                    statusCode = 500;
                if (err) {
                    // If HTTP errors are received, return an error
                    content = String(err);
                    statusCode = 501;
                    console.warn(content);
                } else {
                    const response = body;
                    // If data submission is successful, verify that the Salesforce "success" field is set to "true"
                    if (response.success !== "true") {
                        // If success field is "false", return an error
                        console.warn(`[contactform.js] Creation Error`);
                        content = response.errors.join(", ");
                        statusCode = 501;
                    } else {
                        // if success field is "true", return a success message
                        content = "Success!";
                        statusMsg = "success";
                        statusCode = 201;
                        console.info(`[contactform.js] content: ${content}`);
                    }
                }
                callback(null, {
                    statusCode: statusCode,
                    body: JSON.stringify({
                        status: statusMsg,
                        content: content
                    })
                });
            }
        );
    } catch (submissionError) {
        // If errors occur while submitting the data to Salesforce, return an error
        const content = String(submissionError);
        console.error(`[contactform.js]: Submission Error: ${content}`);
        callback(null, {
            statusCode: 504,
            body: JSON.stringify({ status: "failure", content: content })
        });
    }
};
