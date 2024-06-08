import Logo from "../assets/global/Lif-Logo.png";
import MagnifyingGlass from "../assets/global/magnifying-glass.png";
import "../css/topnav.css";
import { useNavigate } from "react-router-dom";
import getCookieValue from '../scripts/get_username';
import { useEffect, useState } from "react";
import log_out from "../scripts/utils/log out";
import close_icon from '../assets/global/close-icon.png';
import PlusIcon from "../assets/global/plus-icon.svg";

function AccountPanel({ show }) {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const username = await getCookieValue();

            setUsername(username);
        }
        fetchData()
    }, [show]);

    // Auth server url
    const auth_url = process.env.REACT_APP_AUTH_SERVER_URL;

    // Url for user profile pic
    let url = `${auth_url}/get_pfp/${username}.png`;

    const handle_log_out = () => {
        log_out();
        window.location.reload();
    }

    function handle_sign_in() {
        navigate('/login');
    }

    if (show === true && username !== null) {
        return(
            <div className="account-panel">
                <div className="account-panel-header">
                    <img src={url} alt="" />
                    <h1>{username}</h1>
                </div>
                <hr />
                {/* eslint-disable-next-line */}
                <a href="#test">Manage Account</a>
                {/* eslint-disable-next-line */}
                <a onClick={handle_log_out}>Log Out</a>
            </div>
        )
    } else if (show === true && username === null) {
        return(
            <div className="account-panel">
                <div className="account-panel-header">
                    <img src={url} alt="" />
                    <h1>Guest</h1>
                </div>
                <hr />
                <button className="sign-in-button" onClick={handle_sign_in}>Sign In</button>
            </div>
        )   
    } 
    return null;
}

// Component to compact search box
function SearchBoxCompact({ searchBoxOpen, setSearchBoxOpen}) {
    const navigate = useNavigate();

    // Modify the styles of the post and avatar buttons to hide them
    // when the search bar is open
    useEffect(() => {
        const topnav_account = document.getElementById('topnav-account');
        const topnav_post = document.getElementById('topnav-post');

        if (searchBoxOpen === true) {
            topnav_post.style.display = 'none';
            topnav_account.style.display = 'none';
        } else {
            topnav_post.style.display = 'initial';
            topnav_account.style.display = 'initial';
        }
    }, [searchBoxOpen]);

    // function for redirecting to search page with search query
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            // Gets the query from the search box
            const search_box = document.getElementById('search-box');
            const query = search_box.value; 

            // Navigates to search page 
            navigate(`/search/${query}`);
        }
      }

    if (searchBoxOpen === true) {
        return(
            <div className="topnav-search-open">
                <img src={MagnifyingGlass} alt="Search Icon" />
                <input type="text" placeholder="Search" onKeyDown={handleKeyPress} id="search-box" />
                <img src={close_icon} alt="" onClick={() => setSearchBoxOpen(false)} className="topnav-close-button"/>
            </div>
        );
    } else {
        return(
            <div className="topnav-search" onClick={() => setSearchBoxOpen(true)}>
                <img src={MagnifyingGlass} alt="Search Icon" />
                <span>Search</span>
            </div>
        );
    }
}

function Topnav() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [panelShow, setPanelShow] = useState(false);

    // Store the current window width in use state variable
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Store the mode of the post button
    // Used for optimizing the button for smaller screens
    // Possible modes are "full" and "small"
    const [postButtonMode, setPostButtonMode] = useState('full');

    // Store the mode of the search bar
    // Available modes are "full" and "compact"
    const [searchBoxMode, setSearchBoxMode] = useState('full');

    // Store the open/close state of compact search box
    const [searchBoxOpen, setSearchBoxOpen] = useState(false);

    // Auth server url
    const auth_url = process.env.REACT_APP_AUTH_SERVER_URL;

    function handle_post_button() {
        navigate("/new_post");
    }

    useEffect(() => {
        async function fetchData() {
          const username = await getCookieValue();
          setUsername(username);
        }
        fetchData();
      }, []);

      // Url to profile pic
      let url = `${auth_url}/get_pfp/${username}.png`;

      // function for redirecting to search page with search query
      function handleKeyPress(event) {
        if (event.key === 'Enter') {
            // Gets the query from the search box
            const search_box = document.getElementById('search-box');
            const query = search_box.value; 

            // Navigates to search page 
            navigate(`/search/${query}`);
        }
      }

    const handle_account_panel = () => {
        setPanelShow(!panelShow);
    }

    // Event listener for window resize
    // Used for optimizing the top nav when the page is resized
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
      
        window.addEventListener('resize', handleResize);

        // Remove event listener when component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    // Optimize post button based on window width
    useEffect(() => {
        if (windowWidth <= 900) {
            setPostButtonMode('small');

        } else {
            setPostButtonMode('full')
        }
    }, [windowWidth])

    // Optimize search box based on window width
    useEffect(() => {
        if (windowWidth <= 550) {
            setSearchBoxMode('compact');
        } else {
            setSearchBoxMode('full');
        }

    }, [windowWidth])

    return(
        <nav>
            <div className="topnav-logo">
                <a href="/"><img src={Logo} alt="Lif Logo" /></a>
                <h1>Support</h1>
            </div>
            <div className="topnav-post">
                <button onClick={handle_post_button}>
                    <img src={PlusIcon} alt="" />
                </button>
            </div>
            <div className="topnav-account" id="topnav-account">
                {/* eslint-disable-next-line */}
                <a onClick={handle_account_panel}><img src={url} alt="" /></a>
                <AccountPanel show={panelShow} />
            </div>
        </nav>
    )
}
export default Topnav;