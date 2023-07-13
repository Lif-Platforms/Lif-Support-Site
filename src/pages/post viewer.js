import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topnav from "../global-components/topnav";
import "../css/spinners.css";
import "../css/post view.css";
import getCookieValue from "../scripts/get_username";
import { get_token } from "../scripts/verify_token";

// Component for writing comments and answers
function Writer({ state, setState }) {

    // Retrieve the post id parameter from the URL
    const { post_id } = useParams();

    function handle_close() {
        setState('closed');
    }

    async function handle_comment() {
        // Update post button status
        document.getElementById('writer-post').innerHTML = "Posting...";
        document.getElementById('writer-post').disabled = true;

        // Gets auth information
        const username = await getCookieValue();
        const token = await get_token();

        // Gets comment
        const comment = document.getElementById('comment').value; 

        const formData = new FormData();
        formData.append("comment", comment);
        formData.append("post_id", post_id);

        fetch(`http://localhost:8003/new_comment/${username}/${token}`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data);

            if (data.Status === "Ok") {
                setState('closed');
            }
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
    }

    if (state === "comment") {
        return(
            <div className="post-writer">
                <h1>Share Your Thoughts</h1>
                <input placeholder="Comment" type="text" id="comment"/>
                <button className="writer-post-button" id="writer-post" onClick={handle_comment}>Post</button>
                <button className="writer-close-btn" onClick={handle_close}>&#10006;</button>
            </div>
        )
    } else if (state === "answer") {
        return(
            <div className="post-writer">
                <h1>Post Your Answer</h1>
                <textarea placeholder="Answer..." id="answer" />
                <button className="writer-post-button" id="writer-post">Post</button>
                <button className="writer-close-btn" onClick={handle_close}>&#10006;</button>
            </div>
        )
    }
}

function Post() {
    const [postState, setPostState] = useState('loading');
    const [writerState, setWriterState] = useState('closed')

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

    // Handles opening comment writer
    function handle_comment_open() {
        setWriterState('comment');
    }

    // Handles opening the answer writer
    function handle_answer_open() {
        setWriterState('answer');
    }

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
                    <button onClick={handle_comment_open}>Comment</button>
                    <button onClick={handle_answer_open}>Answer</button>
                </div>
                <Writer state={writerState} setState={setWriterState} />
                <img src={`http://localhost:8002/get_pfp/${postState.Author}.png`} alt="" className="post-author-img" />
            </div>
        )
    } else if (postState === "404") {
        return(
            <div className="post-view-header post-loading">
                <h1>404</h1>
                <p>The post you tried to access was not found!</p>
            </div>
        )
    }
}

function Comments() {
    return(
        <div className="comments-viewer">
            <h1>Comments:</h1>
        </div>
    )
}

function ViewPost() {
    return(
        <div className="post-view-container">
            <Topnav />
            <Post />
            <Comments />
        </div>
    );
}
    
export default ViewPost;