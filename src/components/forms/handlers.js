import request from "request";

function SalesforceLead(formData) {
    const baseUrl = window.location.hostname;
    const apiParams = {
        url: `https://${baseUrl}/.netlify/functions/contact`,
        json: true,
        body: formData
    };
    let status, content;
    try {
        request.post(apiParams, (err, httpResponse, body) => {
            const response = body;
            if (err) {
                content = String(err);
                status = "failure";
                console.error(`[handlers.js] Error: ${content}`);
            } else {
                content = response.content;
                status = response.status;
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
