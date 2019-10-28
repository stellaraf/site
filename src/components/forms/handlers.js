import request from "request";

function SalesforceLead(formData) {
    const baseUrl = window.location.hostname;
    const apiParams = {
        url: `https://${baseUrl}/.netlify/functions/contactform`,
        json: formData
    };
    let msg, status;
    request.post(apiParams, (err, httpResponse, body) => {
        if (err) {
            msg = err;
            status = "failure";
            console.error(err);
        } else {
            const apiStatus = body.success;
            if (apiStatus === true) {
                msg = "Success!";
                status = "success";
            } else {
                msg = "Failure :(";
                status = "failure";
            }
            console.info(msg);
        }
    });
    return { status: status, content: msg };
}

export { SalesforceLead };
