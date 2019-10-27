const axios = require("axios");
// import fetch from "node-fetch";
// const { API_KEY } = process.env;

// const API_ENDPOINT = "https://hooks.zapier.com/hooks/catch/5955199/ougxh9k/";

// exports.handler = async (event, context) => {
//     return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
//         .then(response => response.json())
//         .then(data => ({
//             statusCode: 200,
//             body: data
//         }))
//         .catch(error => ({ statusCode: 422, body: String(error) }));
// };

exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body);
    console.log(event);
    console.log(data);
    const names = data.contactName.split(" ");
    const formData = {
        Company: data.contactCompany,
        LastName: names[1],
        FirstName: names[0],
        Email: data.contactEmail,
        Phone: data.contactPhone,
        LeadSource: "stellar.tech Contact Form"
    };
    const apiConfig = {
        url: "https://webhook.site/d2d2dbd7-ba82-4ca9-8c19-85b90927156b",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: formData,
        timeout: 5000,
        responseType: "json",
        responseEncoding: "utf8"
    };
    axios(apiConfig).then(response => {
        console.log(`Raw Response: ${response}`);
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(response.data)
        });
    });
};
