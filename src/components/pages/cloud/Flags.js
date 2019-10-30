import React from "react";
import styles from "components/pages/cloud/styles.module.scss";

function Arizona() {
    return (
        <div className={styles.locationFlagBox}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="90"
                height="60"
                viewBox="0 0 900 600"
                clipPath="circle()"
                className={styles.locationFlag}>
                <g>
                    <rect width="900" height="600" fill="#002868" />
                    <rect width="900" height="300" fill="#bf0a30" />
                    <g fill="#fed700" transform="translate(450,300)">
                        <g id="r3">
                            <path
                                id="r"
                                d="M0,0H-550V135.562825z"
                                transform="rotate(27.692308)"
                            />
                            <use xlinkHref="#r" transform="rotate(27.692308)" />
                            <use xlinkHref="#r" transform="rotate(55.384615)" />
                        </g>
                        <use xlinkHref="#r3" transform="scale(-1,1)" />
                    </g>
                    <path
                        d="M450,150 547.475909,450 292.280666,264.589803H607.719334L352.524091,450z"
                        fill="#ce5c17"
                    />
                </g>
            </svg>
        </div>
    );
}

function Hawaii() {
    return (
        <div className={styles.locationFlagBox}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="90"
                height="60"
                viewBox="-2 0 48 24"
                clipPath="circle()">
                <clipPath id="hi-cp">
                    <path d="M0,0V6H22V12H21zM21,0H10.5V13H0V12z" />
                </clipPath>
                <rect width="48" height="24" fill="#00247d" />
                <g>
                    <path
                        d="M0,0 21,12M21,0 0,12"
                        stroke="#fff"
                        strokeWidth="2.4"
                    />
                    <path
                        d="M0,0 21,12M21,0 0,12"
                        stroke="#cf142b"
                        strokeWidth="1.6"
                        clipPath="url(#hi-cp)"
                    />
                    <path
                        d="M10.5,0V15M0,6H24"
                        stroke="#fff"
                        stroke-width="4"
                    />
                    <path
                        d="M10.5,0V15M0,6H24"
                        stroke="#cf142b"
                        strokeWidth="2.4"
                    />
                </g>
                <path d="M21,12V9L24,6 21,3V0H48V24H0V18z" fill="#fff" />
                <path d="M21,6V9H48V3zM0,15V18H48V12z" fill="#00247d" />
                <path
                    d="M21,4.5H48M0,13.5H48M0,22.5H48"
                    stroke="#cf142b"
                    strokeWidth="3"
                />
            </svg>
        </div>
    );
}

function Flag({ name }) {
    const flagMap = {
        phx01: <Arizona />,
        hnl01: <Hawaii />
    };
    return flagMap[name];
}

export default Flag;
