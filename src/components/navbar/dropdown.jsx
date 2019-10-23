import React from "react";
import {
  Card,
  CardGroup,
  Col,
  Dropdown,
  ListGroup,
  NavItem,
  Nav,
  Row
} from "react-bootstrap";
import classNames from "classnames";
import styles from "components/navbar/styles.module.scss";

function MenuGroup(props) {
  return (
    <Card style={props.style} className={styles.menuSection}>
      <Card.Header className={styles.menuTitle}>{props.title}</Card.Header>
      <Card.Body className={styles.menuBody}>
        <ul className={styles.menuList}>
          {props.items.map((item, i) => {
            return (
              <li key={i} className={styles.menuLink}>
                <a href={item.link} className={styles.menuLinkItem}>
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </Card.Body>
    </Card>
  );
}

function MenuGroupNew(props) {
  return (
    <Card style={props.style} className={styles.menuSection}>
      <Card.Header className={styles.menuTitle}>{props.title}</Card.Header>
      <Card.Body className={styles.menuBody}>
        <ListGroup variant="flush">
          {props.items.map((item, i) => {
            return (
              <ListGroup.Item
                action
                key={i}
                href={item.link}
                className={styles.menuList}
              >
                {item.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

function Menu({ sections }) {
  return (
    <CardGroup>
      {sections.map((section, i) => {
        // return <MenuGroup key={i} {...section} />;
        return <MenuGroupNew key={i} {...section} />;
      })}
    </CardGroup>
  );
}

/**
 * Renders a single dropdown menu item from an input array.
 * Expected schema:
 * [
 *   {
 *     title: "Nav Title",
 *     id: "id tag",
 *     style: {},
 *     sections: [
 *       {
 *         title: "Section Title",
 *         style: {},
 *         items: [
 *           {
 *             name: "Link Name",
 *             link: "Link URL/Route"
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 * @param {Array} menus
 */
function DropdownMenu({ menu }) {
  const itemStyle = classNames("dropdown-item-text", styles.menuTwoColumn);
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle className={styles.navLink} as={Nav.Link}>
        {menu.title}
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={styles.menuTwoColumn}
        style={{ minWidth: `${menu.sections.length * 320}px` }}
      >
        <Row>
          <Col>
            <span className={itemStyle}>
              <Menu sections={menu.sections} style={menu.style} />
            </span>
          </Col>
        </Row>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
