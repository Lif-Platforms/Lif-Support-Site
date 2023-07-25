import LifLogo from "../assets/global/Lif-Logo.png";
import Topnav from "../global-components/topnav";
import { useNavigate } from "react-router-dom";
import "../css/404.css";

function NotFound() {
    const navigate = useNavigate();

    function handle_button() {
        navigate('/');
    }

    return(
        <div>
            <Topnav />
            <div className="not-found-container">
                <img src={LifLogo} alt="Lif Logo" />
                <h1>Uh Oh...</h1>
                <p>Looks like the page you were trying to access does not exist! Don't worry, lets get you back on track!</p>
                <button onClick={handle_button}>Back To Site</button>
            </div>
        </div>

    );
}

export default NotFound;