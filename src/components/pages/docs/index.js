import React from "react";
import { Card, Container, ListGroup, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import { importMDX } from "mdx.macro";
import styled from "styled-components";
import { Display } from "components/styled/text";
import site from "config";
import theme from "styles/exports.module.scss";
// import "components/pages/docs/styles.module.scss";

const config = site.pages.docs;

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

// function SideNav() {
//     const NavTheme = `
//         background-color: ${theme.sideNavBackground} !important;
//         color: ${theme.stWhite} !important;
//         border-color: ${theme.navCardBorderColor} !important;
//         font-size: ${theme.fontSizeSm};
//     `;
//     const NavBox = styled(Card)`
//         border-color: ${theme.navCardBorderColor} !important;
//         ${NavTheme}
//     `;
//     const NavHeading = styled(Card.Header)`
//         border-bottom: ${theme.cardBorderWidth} solid
//             ${theme.navCardBorderColor} !important;
//     `;
//     const NavTitle = styled.p`
//         margin-bottom: unset !important;
//     `;
//     const NavItem = styled(ListGroup.Item)`
//         ${NavTheme}
//     `;
//     return (
//         <NavBox>
//             {config.sections.map((section, i) => {
//                 return (
//                     <>
//                         <NavHeading key={i}>
//                             <NavTitle>{section.name}</NavTitle>
//                         </NavHeading>
//                         <Card.Body>
//                             <ListGroup variant="flush">
//                                 {section.items.map((item, i) => {
//                                     return (
//                                         <LinkContainer to={item.link} key={i}>
//                                             <NavItem action>
//                                                 {item.name}
//                                             </NavItem>
//                                         </LinkContainer>
//                                     );
//                                 })}
//                             </ListGroup>
//                         </Card.Body>
//                     </>
//                 );
//             })}
//         </NavBox>
//     );
// }

// // function Sla() {
// //     const Content = React.lazy(() =>
// //         importMDX("../../../content/docs/sla.mdx")
// //     );
// //     return (
// //         <React.Suspense fallback={<div>Loading...</div>}>
// //             <Content />
// //         </React.Suspense>
// //     );
// // }

// function Docs() {
//     const PageContainer = styled(Container)`
//         display: flex;
//         flex-direction: column;
//     `;
//     const DocsIntro = styled(Container)`
//         text-align: left;
//         margin-bottom: 2rem;
//     `;
//     const HeaderRow = styled(Row)`
//         flex: 0 1 auto;
//     `;
//     const PageRow = styled(Row)`
//         flex-grow: 1;
//         align-content: start;
//     `;
//     return (
//         <PageContainer>
//             <HeaderRow>
//                 <DocsIntro>
//                     <Display.Title size={4}>{config.title}</Display.Title>
//                 </DocsIntro>
//             </HeaderRow>
//             <PageRow>
//                 <Col sm={3}>
//                     <SideNav />
//                 </Col>
//                 <Col sm={9}>{/* <DocContent /> */}</Col>
//             </PageRow>
//         </PageContainer>
//     );
// }
export default Docs;
