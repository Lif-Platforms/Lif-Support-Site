import Logo from "../assets/global/Lif-Logo.png";
import MagnifyingGlass from "../assets/global/magnifying-glass.png";
import Profile from "../assets/global/profile_placeholder.png";
import "../css/topnav.css";

function Topnav() {
    return(
        <nav>
            <div className="topnav-logo">
                <img src={Logo} alt="Lif Logo" />
            </div>
            <div className="topnav-search">
                <img src={MagnifyingGlass} alt="Search Icon" />
                <input type="text" placeholder="Search" /> 
            </div>  
            <div className="topnav-post">
                <button>Post</button>
            </div>
            <div className="topnav-account">
                <a href="#"><img src={Profile} alt="Profile Pic" /></a>
            </div>
        </nav>
    )
}
export default Topnav;