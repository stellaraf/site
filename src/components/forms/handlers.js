import request from "request";

function SalesforceLead(formData) {
    const baseUrl = window.location.hostname;
    const apiParams = {
        url: `https://${baseUrl}/.netlify/functions/contactform`,
        json: formData
    };
    let status, content;
    try {
        request.post(apiParams, (err, httpResponse, body) => {
            if (err) {
                content = String(err);
                status = "failure";
                console.error(`[handlers.js] Error: ${content}`);
            } else {
                content = body.content;
                status = body.status;
            }
        });
    } catch (error) {
        content = String(error);
        status = "failure";
        console.error(`[handlers.js] Error: ${content}`);
    }
    return { status: status, content: content };
}

export { SalesforceLead };
