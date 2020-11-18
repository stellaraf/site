import styled from "styled-components";
import theme from "styles/exports.module.scss";

const Display = {
    Title: styled.h1({
        fontWeight: `${theme.displayWeight}`,
        lineHeight: `1.2`,
        fontSize: props => {
            if (props.size > 4) {
                props.size = 4;
            }
            const selector = `display${props.size}Size`;
            return `${theme[selector]}`;
        }
    }),
    Subtitle: styled.h3({
        fontWeight: `${theme.displayWeight}`,
        lineHeight: `1.2`,
        fontSize: props => {
            if (props.size > 4) {
                props.size = 4;
            }
            const selector = `subDisplay${props.size}Size`;
            return `${theme[selector]}`;
        }
    })
};
Display.Title.defaultProps = {
    size: 1
};

Display.Subtitle.defaultProps = {
    size: 1
};

export { Display };
