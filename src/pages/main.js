import Topnav from "../global-components/topnav";
import Logo from "../assets/global/Lif-Logo.png";
import "../css/main.css";
import "../css/spinners.css";
import { useEffect, useState } from "react";

function Title() {
    return(
        <div className="header">
            <img src={Logo} alt="Lif Logo" />
            <h1>How Can We Help?</h1>
        </div>
    )
}

function RecentPosts() {
    const [recentPostState, setRecentPostState] = useState('loading');

    useEffect(() => {
        async function get_posts() {
            // Backend url
            const support_url = process.env.REACT_APP_SUPPORT_SERVER_URL;

            fetch(`${support_url}/load_recent_posts`)
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
                
                setRecentPostState(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        }
        get_posts();
    }, [])

    if (recentPostState === "loading") {
        return(
            <div className="recent-posts">
                <h1> Recent Posts:</h1>
                <div className="recent-posts-container">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    } else if (Array.isArray(recentPostState)) {
        return(
            <div className="recent-posts">
                <h1> Recent Posts:</h1>
                <div className="recent-posts-container">
                    {recentPostState.map(item => (
                        <a href={`view_post/${item.Id}`}>
                            <div className="post">
                                <h1>{item.Title}</h1>
                                <p>{item.Content}</p>
                                <span className={item.Software === "Ringer" ? "ringer-software" : item.Software === "Dayly" ? "dayly-software" : "software"}>{item.Software}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )
    }
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