let request = require("request");

// Handle the lambda invocation
exports.handler = function(event, context, callback) {
    console.info(event);
    try {
        const data = JSON.parse(event.body);
        console.info(JSON.stringify(data));
        const names = data.contactName.split(" ");
        const apiURL =
            "https://webhook.site/d2d2dbd7-ba82-4ca9-8c19-85b90927156b";
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
        request.post({ url: apiURL, json: formData }, function(
            err,
            httpResponse,
            body
        ) {
            let msg;
            if (err) {
                msg = `Error submitting form: ${err}`;
            } else {
                msg = `Submitted form: ${JSON.stringify(body)}`;
            }
            callback(null, {
                statusCode: 200,
                body: msg
            });
            console.log(`Message: ${msg}`);
        });
    } catch (error) {
        console.error(error);
        callback(null, {
            statusCode: 500,
            body: error
        });
    }
};
