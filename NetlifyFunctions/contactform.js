/*
Netlify function code for Salesforce Lead Submission
*/

const request = require("request");
const apiURL = "https://webhook.site/d2d2dbd7-ba82-4ca9-8c19-85b90927156b";

// Handle the lambda invocation
exports.handler = (event, context, callback) => {
    let data;
    console.info(event);
    // Serialize submitted form data
    try {
        data = JSON.parse(event.body);
        console.info(`[contactform.js] Data: ${JSON.stringify(data)}`);
    } catch (formError) {
        // If a serialization error occurs, return an error
        const content = String(formError);
        console.error(content);
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ status: "failure", content: content })
        });
    }
    if ((data === undefined) | null) {
        // If the data is serialized but is empty for some reason, return an error
        console.error("[contactform.js] Null/Undefined Data:");
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                status: "failure",
                content: "No Data Received"
            })
        });
    }
    // Submit the for data to Salesforce
    try {
        let content;
        // Simple string splitting to parse a last name which is required by Salesforce
        const names = data.contactName.split(" ");
        // Re-serialize the data in the format Salesforce is expecting
        const formData = {
            Company: data.contactCompany,
            LastName: names[1] || "",
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
            { url: apiURL, json: formData },
            (err, httpResponse, body) => {
                if (err) {
                    // If HTTP errors are received, return an error
                    content = String(err);
                    console.warn(content);
                    callback(null, {
                        statusCode: 501,
                        body: JSON.stringify({
                            status: "failure",
                            content: content
                        })
                    });
                } else {
                    const response = JSON.parse(body);
                    // If data submission is successful, verify that the Salesforce "success" field is set to "true"
                    if (response.success !== "true") {
                        // If success field is "false", return an error
                        console.warn(`[contactform.js] Creation Error`);
                        content = response.errors.join(", ");
                        callback(null, {
                            statusCode: 501,
                            body: JSON.stringify({
                                status: "failure",
                                content: content
                            })
                        });
                    } else {
                        // if success field is "true", return a success message
                        content = "Success!";
                        console.info(`[contactform.js] content: ${content}`);
                        callback(null, {
                            statusCode: 201,
                            body: JSON.stringify({
                                status: "success",
                                content: content
                            })
                        });
                    }
                }
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
