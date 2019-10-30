import React from "react";
import { Card } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import Flag from "components/pages/cloud/Flags";
import styles from "components/pages/cloud/styles.module.scss";

const cardRevealProps = {
    left: false,
    right: true,
    top: false,
    bottom: false,
    duration: 128,
    delay: 0,
    cascade: true
};

function LocationCard({ location, title, text, flag, ...props }) {
    return (
        <Slide {...cardRevealProps}>
            <div>
                <Card className={styles.locationCard}>
                    <div className={styles.locationCardTop}>
                        <h5 className={styles.locationCardTitle}>{title}</h5>
                        <Flag name={location} />
                    </div>
                    <div className={styles.locationCardBottom}>
                        {props.children || (
                            <p className={styles.locationCardText}>{text}</p>
                        )}
                    </div>
                </Card>
            </div>
        </Slide>
    );
}

export { LocationCard };
