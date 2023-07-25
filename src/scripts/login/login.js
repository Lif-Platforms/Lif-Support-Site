import Cookies from "js-cookie";

export function User_Login(navigate) {
  // Gets the login credentials form the form
  const UsernameInput = document.getElementById("username");
  const username = UsernameInput.value; 

  const PasswordInput = document.getElementById("password");
  const password = PasswordInput.value; 

  // Sets the login button to logging in
  const LoginButton = document.getElementById("login_button");
  LoginButton.textContent = "Logging In...";

  fetch(`http://localhost:8002/login/${username}/${password}`)
  .then(response => {
      if (response.ok) {
      return response.json(); // Convert response to JSON
      } else {
      throw new Error('Request failed with status code: ' + response.status);
      }
  })
  .then(data => {
      // Work with the data
      console.log(data);
      
      if (data.Status === "Successful") {
        LoginButton.innerHTML = "Done!";

        // Saves username and token in cookie for later access
        Cookies.set("LIF_USERNAME", username, {path: '/'});
        Cookies.set("LIF_TOKEN", data.Token, {path: '/'});

        navigate("/");
      } else {
        LoginButton.innerHTML = "Login";
        const login_status_element = document.getElementById("login_status");
        login_status_element.innerHTML = "Invalid Credentials";
      }
  })
  .catch(error => {
      // Handle any errors
      console.error(error);
      LoginButton.innerHTML = "Login";
      const login_status_element = document.getElementById("login_status");
      login_status_element.innerHTML = "Something Went Wrong!";
  });
}
  
export default User_Login;