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
    const apiParams = {
        url: "/.netlify/functions/contactform",
        json: formData
    };
    request.post(apiParams, (err, httpResponse, body) => {
        let msg;
        if (err) {
            msg = `Error submitting form: ${err}`;
        } else {
            msg = `Submitted form to server: ${body}`;
        }
        return msg;
    });
}

export { SalesforceLead };
