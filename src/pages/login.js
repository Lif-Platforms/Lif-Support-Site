import Logo from "../assets/global/Lif-Logo.png";
import "../css/login.css";
import User_Login from "../scripts/login/login";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate(); 
    
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
                    <button type="button" id="login_button" onClick={() => User_Login(navigate)}>Login</button>
                </form>
                <br />
                {/* eslint-disable-next-line */}
                <a href="#">Forgot Password</a>
                <br />
                <span id="login_status"></span>
            </div>
        </div>
    )
}

export default Login;