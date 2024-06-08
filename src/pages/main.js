import Topnav from "../global-components/topnav";
import Logo from "../assets/global/Lif-Logo.png";
import "../css/main.css";
import "../css/spinners.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom/dist";
import SpinnerIcon from "../global-components/loader";
import SearchIcon from "../assets/index/search-icon.svg";

function Title() {
    const searchInputRef = useRef();

    const navigate = useNavigate();

    // Navigate to search page whe user presses enter
    function handle_key_press(event) {
        if (event.key === "Enter") {
            // Get search query from input
            const query = searchInputRef.current.value;

            // Navigate to search page
            navigate(`/search/${query}`);
        }
    }

    return(
        <div className="header">
            <img className="lif-logo" src={Logo} alt="Lif Logo" />
            <h1>How Can We Help?</h1>
            <div className="search-box">
                <img src={SearchIcon} alt="" />
                <input ref={searchInputRef} onKeyDown={handle_key_press} placeholder="Search Support" type="search" />
            </div>
        </div>
    )
}

function RecentPosts() {
    const [recentPostState, setRecentPostState] = useState('loading');

    const navigate = useNavigate();

    function handle_navigate(post_id) {
        navigate(`/view_post/${post_id}`);
    }

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
                setRecentPostState("failed");
            });
        }
        get_posts();
    }, [])

    if (recentPostState === "loading") {
        return(
            <div className="recent-posts">
                <h1> Recent Posts:</h1>
                <div className="recent-posts-container">
                    <SpinnerIcon />
                </div>
            </div>
        )
    } else if (Array.isArray(recentPostState)) {
        return(
            <div className="recent-posts">
                <h1> Recent Posts:</h1>
                <div className="recent-posts-container">
                    {recentPostState.map(item => (
                        <a onClick={() => handle_navigate(item.Id)}>
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
    } else if (recentPostState === "failed") {
        return(
            <div className="recent-posts">
                <h1> Recent Posts:</h1>
                <div className="recent-posts-container">
                    <h1>Failed to load recent posts!</h1>
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