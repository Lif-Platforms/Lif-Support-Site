import Topnav from "../global-components/topnav";
import "../css/search.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
    const { filters } = useParams();

    // Gets the search results
    useEffect(() => {
        async function get_results() {

        // Backend url
        let url = `${process.env.REACT_APP_SUPPORT_SERVER_URL}/search/${query}`;

        // Check if filters were supplied
        if (filters) {
            url += `?filters=${filters}`;
        }

        fetch(url)
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

function SearchFilters() {
    const ringerCheckBoxRef = useRef();
    const daylyCheckBoxRef = useRef();

    const { filters } = useParams();
    const { query } = useParams();

    // Fill in selected search filters
    useEffect(() => {
        // Check if filters were provided
        if (filters) {
            // Parse filers
            const search_filters = filters.split(",");

            // Reset filters
            ringerCheckBoxRef.current.checked = false;
            daylyCheckBoxRef.current.checked = false;

            // Select filters
            search_filters.forEach((filter) => {
                if (filter === "Ringer") {
                    ringerCheckBoxRef.current.checked = true;

                } else if (filter === "Dayly") {
                    daylyCheckBoxRef.current.checked = true;
                }
            })

        } else {
            // Select all if no filters provided
            ringerCheckBoxRef.current.checked = true;
            daylyCheckBoxRef.current.checked = true;
        }
    }, [filters]);

    const navigate = useNavigate();

    function handle_apply() {
        let filters = "";

        const ringer_filter = ringerCheckBoxRef.current;
        const dayly_filter = daylyCheckBoxRef.current;

        console.log(ringer_filter.checked)
        console.log(dayly_filter.checked)

        if (ringer_filter.checked) {
            filters += "Ringer,";
        }

        if (dayly_filter.checked) {
            filters += "Dayly,";
        }

        console.log(filters)

        // Apply filters
        navigate(`/search/${query}/${filters}`);
        window.location.reload();
    }

    return(
        <div className="search-filters">
            <span>Software:</span>
            <input ref={ringerCheckBoxRef} type="checkbox" id="Ringer" name="Ringer" value="Ringer" />
            <label for="Ringer">Ringer</label>
            <input ref={daylyCheckBoxRef} type="checkbox" name="Dayly" value="Dayly" id="Dayly" />
            <label for="Dayly">Dayly</label>
            <a onClick={() => handle_apply()}>Apply Filters</a>
        </div>
    );

    
}

function Search() {
    // Retrieve the query parameter from the URL
    const { query } = useParams();

    return(
        <div>
            <Topnav />
            <div className="search-page">
                <h1 className="search-query">Search Results For: "{query}"</h1>
                <SearchFilters />
                <SearchResults />
            </div>
        </div>
    )
}

export default Search;