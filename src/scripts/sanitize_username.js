/**
 * Escapes special HTML characters in a given string.
 *
 * @param {string} text - The input string to escape.
 * @returns {string} - The escaped string.
 */
export default function escapeHtml(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    };

    return text.replace(/[&<>"']/g, (char) => map.char = char);
}