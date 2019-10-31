import React from "react";

export default function Arizona() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="90"
            height="60"
            viewBox="0 0 900 600">
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
    );
}
