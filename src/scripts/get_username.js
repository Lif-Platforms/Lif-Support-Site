async function getCookieValue() {
    const cookieName = "LIF_USERNAME";

    // Split the cookies string into individual cookies
    const cookies = document.cookie.split(';');

    // Iterate through the cookies to find the desired cookie
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie starts with the given name
        if (cookie.startsWith(cookieName + '=')) {
            // Extract and return the cookie value
            return cookie.substring(cookieName.length + 1);
        }
    }

    // Cookie not found
    return null;
}

export default getCookieValue;