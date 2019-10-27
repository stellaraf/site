import fetch from "node-fetch";
// const { API_KEY } = process.env;

const API_ENDPOINT = "https://hooks.zapier.com/hooks/catch/5955199/ougxh9k/";

exports.handler = async (event, context) => {
    return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
        .then(response => response.json())
        .then(data => ({
            statusCode: 200,
            body: data
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }));
};
