import React from "react";
import { ContactSection, TitleBlock, SupportSection } from "components/pages/contact/Sections";

class Contact extends React.Component {
    render() {
        return (
            <>
                <TitleBlock />
                <SupportSection />
                <ContactSection />
            </>
        );
    }
}
export default Contact;
