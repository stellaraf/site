/* 

NOTE

This is unsed code, but it's also pretty cool code, so I'm not deleting it. react-reveal is a dependency.

*/

// import * as ReactReveal from "react-reveal";

// // Get names of all react-reveal action types as array
// const revealComponents = Object.keys(ReactReveal);

// // Create empty set for deduplication
// const allRevealProps = new Set();

// // For each react-reveal action type, get the proptypes and add each to the allRevealProps set.
// revealComponents.forEach(comp => {
//     // eslint-disable-next-line
//     const compProps = Object.keys(ReactReveal[comp].propTypes);
//     compProps.forEach(p => allRevealProps.add(p));
// });

// /**
//  * Filter input props into new object of react-reveal props and non-react reveal props
//  * @param {object} props "Rest" props object
//  */
// function getRevealProps(props) {
//     // Build array of only the keys in props argument
//     const propKeys = Object.keys(props);

//     // Empty object, objects not supported by react-reveal will be added here
//     let notReveal = {};

//     // Empty object, objects supported by react-reveal will be added here
//     let isReveal = {};

//     /* Iterate prop keys passed for assigning two new objects - one of
//     confirmed react-reveal props, one of any other props */
//     propKeys.forEach((key, i) => {
//         if (!allRevealProps.has(key)) {
//             // If the prop is not supported by react-reveal, add it to the notReveal object
//             notReveal[key] = props[key];
//         } else {
//             // Otherwise, add it to the isReveal object
//             isReveal[key] = props[key];
//         }
//     });
//     return { revealProps: isReveal, standardProps: notReveal };
// }

// export { getRevealProps };
