import { useTitle } from "react-use";

/**
 * Dynamically set the <title> HTML attribute
 * @param {string} page Page name
 */
export default function({ page = "" }) {
    const constructedTitle = page.toString();
    useTitle(constructedTitle);
    return null;
}
