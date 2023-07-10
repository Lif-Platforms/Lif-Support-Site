import Topnav from "../global-components/topnav";
import "../css/search.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/spinners.css";

function SearchResults() {
    const [resultsState, setResultsState] = useState('loading');

    // Retrieve the query parameter from the URL
    const { query } = useParams();

    // Gets the search results
    useEffect(() => {
        async function get_results() {

        fetch('http://localhost:8003/search/' + query)
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
            });
        }
        get_results();
    // eslint-disable-next-line
    }, [])

    if (resultsState === "loading") {
        return(
            <div className="search-results">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    } else if (Array.isArray(resultsState) && resultsState.length > 0) {
        return(
            <div className="search-results">
                {resultsState.map(item => (
                    <a href="#placeholder">
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