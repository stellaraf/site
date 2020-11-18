import React from "react";
import IconNotFound from "components/svg/IconNotFound";
import DiagonalSection from "components/svg/DiagonalSection";

const imageMap = {
    IconNotFound: IconNotFound
};

function Image({ name }) {
    const ThisImage = imageMap[name];
    return <ThisImage />;
}

export { Image, DiagonalSection };
