import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, ListGroup } from "react-bootstrap";
import styles from "components/navbar/styles.module.scss";

class NavSection extends Component {
    render(props) {
        return this.props.menu.sections.map((section, i) => {
            return (
                <Card className={styles.menuSection} key={i}>
                    <Card.Header className={styles.menuHeader}>
                        <p className={styles.menuTitle}>{section.title}</p>
                    </Card.Header>
                    <Card.Body className={styles.menuBody}>
                        <ListGroup variant="flush">
                            {section.items.map((item, i) => {
                                return (
                                    <LinkContainer to={item.link} key={i}>
                                        <ListGroup.Item
                                            action
                                            className={styles.menuList}>
                                            {item.name}
                                        </ListGroup.Item>
                                    </LinkContainer>
                                );
                            })}
                        </ListGroup>
                    </Card.Body>
                </Card>
            );
        });
    }
}
export default NavSection;
