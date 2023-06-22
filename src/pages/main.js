import Topnav from "../global-components/topnav";
import Logo from "../assets/global/Lif-Logo.png";
import "../css/main.css";

function Title() {
    return(
        <div className="header">
            <img src={Logo} alt="Lif Logo" />
            <h1>How Can We Help?</h1>
        </div>
    )
}

function RecentPosts() {
    return(
        <div className="recent-posts">
            <h1> Recent Posts:</h1>
        </div>
    )   
}

function Main() {
    return(
        <div>
            <Topnav />
            <Title />
            <RecentPosts />
        </div>
    )
}

export default Main;