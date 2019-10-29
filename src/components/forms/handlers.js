import axios from "axios";

function SalesforceLead(formData, callback) {
    console.info("Submitted form data", formData);
    const baseUrl = window.location.hostname;
    const axiosConfig = {
        url: `https://${baseUrl}/.netlify/functions/contact`,
        method: "post",
        data: formData
    };
    axios(axiosConfig)
        .then(response => {
            const data = response.data;
            callback({ status: data.status, content: data.content });
        })
        .catch(error => {
            console.error(error);
            callback({ status: "failure", content: String(error) });
        });
}

export { SalesforceLead };
