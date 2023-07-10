// Verify token with auth server
// eslint-disable-next-line
async function verify_token(token) {
    // Create a new WebSocket object with an IP address
    const socket = new WebSocket('ws://localhost:9000');

    // Event handlers and data handling remain the same as in the previous example
    socket.onopen = function() {
    console.log('WebSocket connection established.');
    socket.send('VERIFY_TOKEN');
    };

    socket.onmessage = function(event) {
    console.log('Received message from server:', event.data);


    };

    socket.onclose = function(event) {
    console.log('WebSocket connection closed.');
    };

    socket.onerror = function(error) {
    console.error('WebSocket error:', error);
    };
}

// Check if the token cookie exists
export async function check_token() {
    // Split the cookies string into individual cookies
    const cookies = document.cookie.split(';');
  
    // Iterate over each cookie
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
    
        // Check if the cookie starts with the given name
        if (cookie.startsWith('LIF_TOKEN=')) {
            return true; // Cookie exists
        }
    }
  
    return false;
}

export async function get_token() {
    const cookieName = "LIF_TOKEN";

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