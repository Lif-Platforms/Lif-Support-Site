import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topnav from "../global-components/topnav";
import "../css/spinners.css";
import "../css/post view.css";
import getCookieValue from "../scripts/get_username";
import { get_token } from "../scripts/verify_token";
import { check_token } from "../scripts/verify_token";

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
        document.getElementById('writer-post-status').innerHTML = '';

        // Gets auth information
        const username = await getCookieValue();
        const token = await get_token();

        // Gets comment
        const comment = document.getElementById('comment').value; 

        const formData = new FormData();
        formData.append("comment", comment);
        formData.append("post_id", post_id);

        // Backend url
        const support_url = process.env.REACT_APP_SUPPORT_SERVER_URL;

        fetch(`${support_url}/new_comment`, {
            method: "POST",
            headers: {
                username: username,
                token: token
            },
            body: formData
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Request failed with status code: ' + response.status);
            }
        })
        .then(data => {
            // Handle the response data
            console.log(data);

            window.location.reload();
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
            document.getElementById('writer-post-status').innerHTML = 'Something Went Wrong';
            document.getElementById('writer-post').innerHTML = "Post";
            document.getElementById('writer-post').disabled = false;
        });
    }

    async function handle_answer() {
        // Update post button status
        document.getElementById('writer-post').innerHTML = "Posting...";
        document.getElementById('writer-post').disabled = true;
        document.getElementById('writer-post-status').innerHTML = '';

        // Gets auth information
        const username = await getCookieValue();
        const token = await get_token();

        // Gets answer
        const answer = document.getElementById('answer').value; 
    
        const formData = new FormData();
        formData.append("answer", answer);
        formData.append("post_id", post_id);

        // Backend url
        const support_url = process.env.REACT_APP_SUPPORT_SERVER_URL;

        fetch(`${support_url}/new_answer`, {
            method: "POST",
            headers: {
                username: username,
                token: token
            },
            body: formData
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Request failed with status code:' + response.status);
            }
        })
        .then(data => {
            // Handle the response data
            console.log(data);

            window.location.reload();
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
            document.getElementById('writer-post-status').innerHTML = 'Something Went Wrong!';
            document.getElementById('writer-post').innerHTML = "Post";
            document.getElementById('writer-post').disabled = false;
        });
    }

    if (state === "comment") {
        return(
            <div className="post-writer">
                <h1>Share Your Thoughts</h1>
                <input placeholder="Comment" type="text" id="comment"/>
                <button className="writer-post-button" id="writer-post" onClick={handle_comment}>Post</button>
                <span className="writer-post-status" id="writer-post-status" />
                <button className="writer-close-btn" onClick={handle_close}>&#10006;</button>
            </div>
        )
    } else if (state === "answer") {
        return(
            <div className="post-writer">
                <h1>Post Your Answer</h1>
                <textarea placeholder="Answer..." id="answer" />
                <button className="writer-post-button" id="writer-post" onClick={handle_answer}>Post</button>
                <span className="writer-post-status" id="writer-post-status" />
                <button className="writer-close-btn" onClick={handle_close}>&#10006;</button>
            </div>
        )
    }
}

function Controls({setWriterState}) {
    const [showControls, setShowControls] = useState(false);

    // Handles opening comment writer
    function handle_comment_open() {
        setWriterState('comment');
    }

    // Handles opening the answer writer
    function handle_answer_open() {
        setWriterState('answer');
    }

    useEffect(() => {
        async function handle_show_controls() {
            // Checks if Lif token exists
            const token_status = await check_token()

            if (token_status) {
                setShowControls(true);
            }
        }
        handle_show_controls();
    })

    if (showControls) {
        return(
            <div className="controls">
                <button onClick={handle_comment_open}>Comment</button>
                <button onClick={handle_answer_open}>Answer</button>
            </div>
        );
    } else {
        return null;
    }
}

function Post() {
    const [postState, setPostState] = useState('loading');
    const [writerState, setWriterState] = useState('closed')

    // Retrieve the post id parameter from the URL
    const { post_id } = useParams();

    useEffect(() => {
        async function load_post() {
            // Backend url
            const support_url = process.env.REACT_APP_SUPPORT_SERVER_URL;

            fetch(`${support_url}/load_post/${post_id}`)
            .then(response => {
                if (response.ok) {
                    return response.json(); // Convert response to JSON
                } else {
                    const error = new Error('Request Failed: ' + response.status);
                    error.status = response.status; // Add status property to the error object
                    throw error;
                }
            })
            .then(data => {
                // Work with the data
                console.log(data);

                setPostState(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);

                if (error.status === 404) {
                    setPostState('404');
                }
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
                <p style={{ whiteSpace: 'pre-line' }}>{postState.Content}</p>
                <span className="post-date">Posted: {postState.Date ? postState.Date : "Not Available"}</span>
                <span className={postState.Software === "Ringer" ? "ringer-software" : postState.Software === "Dayly" ? "dayly-software" : "software"}>{postState.Software}</span>
                <Controls setWriterState={setWriterState}/>
                <Writer state={writerState} setState={setWriterState} />
                <img src={`${process.env.REACT_APP_AUTH_SERVER_URL}/get_pfp/${postState.Author}.png`} alt="" className="post-author-img" />
                <span className="post-author">{postState.Author}</span>
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
    const [commentsState, setCommentsState] = useState('loading');
    
    // Retrieve the post id parameter from the URL
    const { post_id } = useParams();

    // Backend url
    const support_url = process.env.REACT_APP_SUPPORT_SERVER_URL;

    useEffect(() => {
        fetch(`${support_url}/load_comments/${post_id}`)
        .then(response => {
            if (response.ok) {
                return response.json(); // Convert response to JSON
            } else {
                const error = new Error('Request Failed: ' + response.status);
                error.status = response.status; // Add status property to the error object
                throw error;
            }
        })
        .then(data => {
            // Work with the data
            console.log(data);

            if (data === false) {
                setCommentsState('404');
            } else {
                setCommentsState(data);
            }
        })
        .catch(error => {
            // Handle any errors
            console.error(error);

            setCommentsState('404');
        });

    // eslint-disable-next-line
    }, [])

    if (commentsState === "loading") {
        return(
            <div className="comments-viewer comment-center">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    } else if (Array.isArray(commentsState) && commentsState.length > 0) {
        return(
            <div className="comments-viewer comment-left">
                <h1>Comments:</h1>
                {commentsState.map(item => (
                    (item.Type === "Comment" ? 
                        <div className="comment">
                            <img src={`${process.env.REACT_APP_AUTH_SERVER_URL}/get_pfp/${item.Author}.png`} alt="" />
                            <div>
                                <h1>{item.Author}</h1>
                                <p>{item.Content}</p>
                            </div> 
                        </div>
                    : 
                        <div className="answer">
                            <h1>Answer</h1>
                            <p style={{ whiteSpace: 'pre-line' }}>{item.Content}</p>
                            <span>Posted By: {item.Author}</span>
                            <img src={`${process.env.REACT_APP_AUTH_SERVER_URL}/get_pfp/${item.Author}.png`} alt="" />
                        </div>
                    )
                ))}
            </div>
        )
    }  else if (commentsState === "404") {
        return null;

    } else if (Array.isArray(commentsState) && commentsState.length === 0) {
        return(
            <div className="comments-viewer comment-center">
                <p>WOW! Nobody commented yet!</p>
            </div>
        ) 
    }
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