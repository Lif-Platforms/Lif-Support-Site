import Logo from "../assets/global/Lif-Logo.png";
import "../css/login.css";
import User_Login from "../scripts/login/login";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate(); 

    // Handles the login process
    async function handle_login() {
        // Gets the login credentials form the form
        const UsernameInput = document.getElementById("username");
        const username = UsernameInput.value; 

        const PasswordInput = document.getElementById("password");
        const password = PasswordInput.value; 

        // Sets the login button to logging in
        const LoginButton = document.getElementById("login_button");
        LoginButton.textContent = "Logging In...";

        // Logs in the user with the lif auth server
        const login_status = await User_Login(username, password);

        if (login_status === "GOOD!") {
            console.log("login Status: " + login_status);
            LoginButton.innerHTML = "Done!";
            navigate("/");
        } else {
            console.log("login Status: " + login_status);
            LoginButton.innerHTML = "Login";
            const login_status_element = document.getElementById("login_status")
            login_status_element.innerHTML = "Invalid Credentials"
        }   
    }

    return(
        <div className="login-container">
            <div className="login-form">
                <img src={Logo} alt="Lif Logo" />
                <h1>Login With Lif</h1>
                <form>
                    <input type="username" id="username" placeholder="Username" />
                    <br />
                    <input type="password" id="password" placeholder="Password" />
                    <br />
                    <button type="button" id="login_button" onClick={handle_login}>Login</button>
                </form>
                <br />
                <span id="login_status"></span>
            </div>
        </div>
    )
}

export default Login;