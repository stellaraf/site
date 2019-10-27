import { siteConfig } from "config";
import axios from "axios";

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
    const apiConfig = {
        // url: sfAttr.leadUri,
        // baseUrl: sfAttr.baseUrl,
        // baseUrl: "https://webhook.site/",
        url: "/",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: formData,
        timeout: 5000,
        responseType: "json",
        responseEncoding: "utf8"
    };
    axios(apiConfig).then(response => {
        console.log(`Raw Response: ${response}`);
        console.log(
            `Response:\nData: ${response.data}\nStatus: ${response.status}\nstatusText: ${response.statusText}\nHeaders: ${response.headers}`
        );
        return response;
    });
}

export { SalesforceLead };
