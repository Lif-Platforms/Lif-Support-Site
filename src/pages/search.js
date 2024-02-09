import Topnav from "../global-components/topnav";
import "../css/search.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SpinnerIcon from "../global-components/loader";

function SearchResults() {
    const [resultsState, setResultsState] = useState('loading');

    // Create navigation instance
    const navigate = useNavigate();

    function handle_navigate(post_id) {
        navigate(`/view_post/${post_id}`);
    }

    // Retrieve the query parameter from the URL
    const { query } = useParams();

    // Gets the search results
    useEffect(() => {
        async function get_results() {

        // Backend url
        const support_url = process.env.REACT_APP_SUPPORT_SERVER_URL;

        fetch(`${support_url}/search/${query}`)
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
                
                setResultsState(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
                setResultsState("failed");
            });
        }
        get_results();
    // eslint-disable-next-line
    }, [query])

    if (resultsState === "loading") {
        return(
            <div className="search-results">
                <SpinnerIcon />
            </div>
        )
    } else if (Array.isArray(resultsState) && resultsState.length > 0) {
        return(
            <div className="search-results">
                {resultsState.map(item => (
                    <a onClick={() => handle_navigate(item.Id)}>
                        <div className="search-item">
                            <h1>{item.Title}</h1>
                            <p>{item.Content}</p>
                            <span className={item.Software === "Ringer" ? "ringer-software" : item.Software === "Dayly" ? "dayly-software" : "software"}>{item.Software}</span>
                        </div>
                    </a>
                ))}
            </div>
        )
    } else if (Array.isArray(resultsState) && resultsState.length === 0) {
        return(
            <div className="search-results">
                <h1>We could not find anything!</h1>
            </div>
        )
    } else if (resultsState === "failed") {
        return(
            <div className="search-results">
                <h1>We couldn't load search results!</h1>
            </div>
        )
        
    }
}

function Search() {
    // Retrieve the query parameter from the URL
    const { query } = useParams();

    return(
        <div>
            <Topnav />
            <div className="search-page">
                <h1 className="search-query">Search Results For: "{query}"</h1>
                <SearchResults/>
            </div>
        </div>
    )
}

export default Search;