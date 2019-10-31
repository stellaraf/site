import React from "react";

export default function Hawaii() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="120"
            height="80"
            viewBox="-5 0 48 24">
            <clipPath id="hi-cp">
                <path d="M0,0V6H22V12H21zM21,0H10.5V13H0V12z" />
            </clipPath>
            <g>
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
                    <path d="M10.5,0V15M0,6H24" stroke="#fff" strokeWidth="4" />
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
            </g>
        </svg>
    );
}
