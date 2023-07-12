import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topnav from "../global-components/topnav";
import "../css/spinners.css";
import "../css/post view.css";

function Post() {
    const [postState, setPostState] = useState('loading');

    // Retrieve the post id parameter from the URL
    const { post_id } = useParams();

    useEffect(() => {
        async function load_post() {
            fetch('http://localhost:8003/load_post/' + post_id)
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

                if (data === false) {
                    setPostState('404');
                } else {
                    setPostState(data);
                }
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        }
        load_post();
    }, [post_id])

    if (postState === "loading") {
        return(
            <div className="post-view-header post-loading">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        );
    } else if (typeof postState === "object" && postState !== null) {
        return(
            <div className="post-view-header post-loaded">
                <h1>{postState.Title}</h1>
                <p>{postState.Content}</p>
                <span className={postState.Software === "Ringer" ? "ringer-software" : postState.Software === "Dayly" ? "dayly-software" : "software"}>{postState.Software}</span>
                <div className="controls">
                    <button>Comment</button>
                    <button>Answer</button>
                </div>
                <img src={`http://localhost:8002/get_pfp/${postState.Author}.png`} alt="" className="post-author-img" />
            </div>
        )
    } else if (postState === "404") {
        return(
            <div className="post-view-header">
                <h1>404</h1>
                <p>The post you tried to access was not found!</p>
            </div>
        )
    }
}

function ViewPost() {
    return(
        <div className="post-view-container">
            <Topnav />
            <Post />
        </div>
    );
}
    
export default ViewPost;