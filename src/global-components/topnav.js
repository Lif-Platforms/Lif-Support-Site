import Logo from "../assets/global/Lif-Logo.png";
import MagnifyingGlass from "../assets/global/magnifying-glass.png";
import "../css/topnav.css";
import { useNavigate } from "react-router-dom";
import getCookieValue from '../scripts/get_username';
import { useEffect, useState } from "react";

function Topnav() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

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
      let url = `http://localhost:8002/get_pfp/${username}.png`;

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
    return(
        <nav>
            <div className="topnav-logo">
                <a href="/"><img src={Logo} alt="Lif Logo" /></a>
            </div>
            <div className="topnav-search">
                <img src={MagnifyingGlass} alt="Search Icon" />
                <input type="text" placeholder="Search" onKeyDown={handleKeyPress} id="search-box" /> 
            </div>  
            <div className="topnav-post">
                <button onClick={handle_post_button}>Post</button>
            </div>
            <div className="topnav-account">
                <a href="#test"><img src={url} alt="Profile Pic" /></a>
            </div>
        </nav>
    )
}
export default Topnav;