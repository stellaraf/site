import React from "react";
import {
    ContactSection,
    TitleBlock,
    SupportSection,
    LocationSection
} from "components/pages/contact/Sections";

class Contact extends React.Component {
    render() {
        return (
            <>
                <TitleBlock />
                <SupportSection />
                <ContactSection />
                <LocationSection />
            </>
        );
    }
}
export default Contact;
