export function User_Login(username, password) {
    let sent_credentials = false;
  
    return new Promise((resolve, reject) => {
      const socket = new WebSocket('ws://localhost:9000');
  
      socket.onopen = function(event) {
        console.log('WebSocket connection established');
        socket.send("USER_LOGIN");
      };
  
      socket.onmessage = function(event) {
        const message = event.data;
        console.log('Received message:', message);
  
        if (message === "SEND_CREDENTIALS") {
          if (!sent_credentials) {
            const jsonData = { Username: username, Password: password };
            const string_credentials = JSON.stringify(jsonData);
            socket.send(string_credentials);
            sent_credentials = true;
          }
        }

        if (message === "INVALID_CREDENTIALS") {
            console.log('Invalid credentials received');
            resolve("Invalid credentials");
            socket.close();
        }

        if (message.startsWith('TOKEN:')) { 
            var token = message.slice(6);

            console.log("Token: " + token);

            document.cookie = "LIF_TOKEN=" + token;
            document.cookie = "LIF_USERNAME=" + username;
            socket.close();
            resolve("GOOD!");
        }
        
      };
  
      socket.onerror = function(error) {
        reject(new Error("WebSocket error: " + error));
        socket.close();
      };
  
      socket.onclose = function(event) {
        console.log('WebSocket connection closed');
      };
    });
  }
  
export default User_Login;