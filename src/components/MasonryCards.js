import React from "react";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { query } from "utils/breakpoints";

const colMap = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3
};

const MasonryRow = styled(({ cols, ...props }) => <Row {...props} />)`
    justify-content: center;
    align-items: center;
`;

const MasonryCol = styled(Col)`
    align-items: center;
`;

const buildCols = (arr, n) => {
    let rest = arr.length % n,
        restUsed = rest,
        partLength = Math.floor(arr.length / n),
        result = [];

    for (let i = 0; i < arr.length; i += partLength) {
        let end = partLength + i,
            add = false;
        if (rest !== 0 && restUsed) {
            end++;
            restUsed--;
            add = true;
        }
        result.push(arr.slice(i, end));
        add && i++;
    }
    return result;
};

export default function(props) {
    const thisBreak = query.atMost("md")
        ? "sm"
        : query.atLeast("xl")
        ? "xl"
        : query.atLeast("lg")
        ? "lg"
        : query.atLeast("md")
        ? "md"
        : "lg";
    const numCols = colMap[thisBreak];
    const columnGroups = buildCols(React.Children.toArray(props.children), numCols);
    return (
        <MasonryRow cols={numCols}>
            {columnGroups.map((column, i) => (
                <MasonryCol key={i} sm={12} md={6} lg={4} xl={4}>
                    {column}
                </MasonryCol>
            ))}
        </MasonryRow>
    );
}

// export default class extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { breakpointSize: "lg", numCols: 0 };
//     }
//     buildCols(children) {
//         let index = 0;
//         let allColumns = [];
//         for (index = 0; index < children.length; index += this.state.numCols) {
//             const thisCol = children.slice(index, index + this.state.numCols);
//             allColumns.push(thisCol);
//         }
//         return allColumns;
//     }
//     render() {
//         const numCards = React.Children.count(this.props.children);
//         const thisBreak = query.atMost("sm")
//             ? "sm"
//             : query.atMost("md")
//             ? "md"
//             : query.atMost("lg")
//             ? "lg"
//             : query.atLeast("xl")
//             ? "xl"
//             : "lg";
//         this.setState({
//             numCols: Math.ceil(numCards / colMap[thisBreak]),
//             breakpointSize: thisBreak
//         });
//         const columnGroups = this.buildCols(React.Children.toArray(this.props.children));
//         console.log(this.state);
//         console.log("break", thisBreak);
//         console.log("numCards", numCards);
//         console.log("columnGroups", columnGroups);
//         return (
//             <MasonryRow>
//                 {columnGroups.map((column, i) => (
//                     <MasonryCol
//                         key={i}
//                         sm={breakMap[this.state.breakpointSize]}
//                         md={breakMap[this.state.breakpointSize]}
//                         lg={breakMap[this.state.breakpointSize]}
//                         xl={breakMap[this.state.breakpointSize]}>
//                         {column}
//                     </MasonryCol>
//                 ))}
//             </MasonryRow>
//         );
//     }
// }
