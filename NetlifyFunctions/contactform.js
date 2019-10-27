const axios = require("axios");

exports.handler = async (event, context) => {
    const data = JSON.parse(event.body);
    const names = data.contactName.split(" ");
    const formData = {
        Company: data.contactCompany,
        LastName: names[1] || "",
        FirstName: names[0] || "",
        Email: data.contactEmail,
        Phone: data.contactPhone,
        LeadSource: "stellar.tech Contact Form",
        Description: `Form Data:\nSubject:${data.contactSubject}\nMessage:\n${
            data.contactMessage
        }\n\nMetadata:\n${""}`
    };
    const apiConfig = {
        url: "https://webhook.site/d2d2dbd7-ba82-4ca9-8c19-85b90927156b",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(formData),
        timeout: 10000,
        responseType: "json",
        responseEncoding: "utf8"
    };
    console.log(JSON.stringify(formData));
    let response;
    try {
        response = await axios.request(apiConfig);
        console.log(JSON.stringify(response));
    } catch (error) {
        console.error(error);
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ data: JSON.stringify(response) })
    };
};
