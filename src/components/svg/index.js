import React from "react";
import IconNotFound from "components/svg/IconNotFound";
import Diagonal from "components/svg/Diagonal";

const imageMap = {
    IconNotFound: IconNotFound
};

function Image({ name }) {
    const ThisImage = imageMap[name];
    return <ThisImage />;
}

export { Image, Diagonal };
