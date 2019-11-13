import React from "react";
import PageTitle from "hooks/PageTitle";
import { ContactSection, TitleBlock, SupportSection } from "components/pages/contact/Sections";

class Contact extends React.Component {
    render() {
        return (
            <>
                <PageTitle page="Contact Stellar" />
                <TitleBlock />
                <SupportSection />
                <ContactSection />
            </>
        );
    }
}
export default Contact;
