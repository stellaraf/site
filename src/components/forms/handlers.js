import { siteConfig } from "config";
import request from "request";

class HandleError extends Error {
    constructor(xhrState = 0, message = "HTTP request is not open") {
        super(xhrState, message);
        this.name = this.constructor.name;
        this.state = this.constructor.xhrState;
        this.message = this.constructor.message;
    }
}

const sfAttr = {
    baseUrl: `https://${siteConfig.salesforceInstanceName}.salesforce.com`,
    leadUri: "/services/data/v39.0/sobjects/Lead"
};

function SalesforceLead(formData) {
    const baseUrl = window.location.hostname;
    const apiParams = {
        url: `https://${baseUrl}/.netlify/functions/contactform`,
        json: formData
    };
    let msg;
    request.post(apiParams, (err, httpResponse, body) => {
        if (err) {
            msg = `Error: ${err}`;
            console.error(err);
        } else {
            msg = body;
        }
    });
    return msg;
}

export { SalesforceLead };
