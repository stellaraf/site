import React from "react";
import IconNotFound from "components/svg/IconNotFound";

const imageMap = {
    IconNotFound: IconNotFound
};

function Image({ name }) {
    const ThisImage = imageMap[name];
    return <ThisImage />;
}

export { Image };
