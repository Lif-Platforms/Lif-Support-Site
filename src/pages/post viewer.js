import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topnav from "../global-components/topnav";
import "../css/spinners.css";
import "../css/post view.css";
import getCookieValue from "../scripts/get_username";
import { get_token } from "../scripts/verify_token";
import { check_token } from "../scripts/verify_token";
import EditIcon from "../assets/post viewer/edit_icon.png";
import DeleteIcon from "../assets/post viewer/delete_icon.png";
import ThreeDotSpinner from "../global-components/spinners";

// Component for writing comments and answers
function Writer({ state, setState, postState }) {
    const postTitleRef = useRef();
    const postBodyRef = useRef();
    const postCommentRef = useRef();
    const postAnswerRef = useRef();
    const postSoftwareRef = useRef();
    const postButtonRef = useRef();
    const postFormRef = useRef();
    const postStatusRef = useRef();

    // Retrieve the post id parameter from the URL
    const { post_id } = useParams();

    // Update writer input values
    useEffect(() => {
        if (state === "edit") {
            postTitleRef.current.value = postState.Title;
            postBodyRef.current.value = postState.Content;
            postSoftwareRef.current.value = postState.Software;

        } else if (state !== "edit" && postCommentRef.current) {
            postCommentRef.current.value = "";
        }
    }, [state])

    function handle_close() {
        setState('closed');
    }

    async function handle_edit() {
        // Update button
        postButtonRef.current.innerHTML = "Updating...";

        // Gets auth information
        const username = await getCookieValue();
        const token = await get_token();

        // Create request body
        const requestBody = new FormData(postFormRef.current);

        fetch(`${process.env.REACT_APP_SUPPORT_SERVER_URL}/edit_post/${postState.Id}`, {
            method: "PUT",
            headers: {
                username: username,
                token: token
            },
            body: requestBody
        })
        .then((response) => {
            if (response.ok) {
                window.location.reload();

            } else {
                throw new Error("Request failed! Status code: " + response.status);
            }
        })
        .catch((error) => {
            console.error(error);
        })
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
        const comment = postCommentRef.current.value;

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
        const answer = postAnswerRef.current.value;
    
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
                <input placeholder="Comment" type="text" ref={postCommentRef} />
                <button className="writer-post-button" id="writer-post" onClick={handle_comment}>Post</button>
                <span className="writer-post-status" id="writer-post-status" />
                <button className="writer-close-btn" onClick={handle_close}>&#10006;</button>
            </div>
        )
    } else if (state === "answer") {
        return(
            <div className="post-writer">
                <h1>Post Your Answer</h1>
                <textarea placeholder="Answer..." ref={postAnswerRef} />
                <button className="writer-post-button" id="writer-post" onClick={handle_answer}>Post</button>
                <span className="writer-post-status" id="writer-post-status" />
                <button className="writer-close-btn" onClick={handle_close}>&#10006;</button>
            </div>
        )
    } else if (state === "edit") {
        return(
            <div className="post-writer">
                <h1>Edit Your Post</h1>
                <form ref={postFormRef}>
                    <input name="title" placeholder="Title" type="text" ref={postTitleRef} />
                    <textarea name="content" placeholder="Post here..." ref={postBodyRef} />
                    <select name="software" ref={postSoftwareRef}> 
                        <option value="Ringer">Ringer</option> 
                        <option value="Dayly">Dayly</option> 
                    </select>
                </form>
                <button className="writer-post-button" ref={postButtonRef} onClick={() => handle_edit()}>Update</button>
                <span className="writer-post-status" ref={postStatusRef} />
                <button className="writer-close-btn" onClick={handle_close}>&#10006;</button>
            </div>
        )
    }
}

function Controls({setWriterState, setDeletePostPopupShow, postState}) {
    const [showControls, setShowControls] = useState(false);
    const [showEditControls, setShowEditControls] = useState(false);

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

            // Get username
            const username = await getCookieValue();

            // Check post author
            if (postState !== "loading" && postState.Author === username) {
                setShowEditControls(true);
            }
        }
        handle_show_controls();
    })

    if (showControls) {
        return(
            <div className="controls">
                {showEditControls ? (
                    <div>
                        <button className="type2" onClick={() => setWriterState("edit")}><img src={EditIcon} alt=""/></button>
                        <button className="type2" onClick={() => setDeletePostPopupShow(true)}><img src={DeleteIcon} alt=""/></button>
                    </div>
                ): null}
                <button onClick={handle_comment_open} className="type1">Comment</button>
                <button onClick={handle_answer_open} className="type1">Answer</button>
            </div>
        );
    } else {
        return null;
    }
}

function Post({setDeletePostPopupShow}) {
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
                <span className={postState.Software === "Ringer" ? "ringer-software" : postState.Software === "Dayly" ? "dayly-software" : "software"}>{postState.Software}</span>
                <Controls setWriterState={setWriterState} setDeletePostPopupShow={setDeletePostPopupShow} postState={postState} />
                <Writer state={writerState} setState={setWriterState} postState={postState} />
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

function DeletePostPopup({deletePostPopupShow, setDeletePostPopupShow}) {
    const deleteButtonRef = useRef();
    const cancelButtonRef = useRef();
    const deleteStatusRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (deleteButtonRef.current && cancelButtonRef.current) {
            if (isLoading) {
                deleteButtonRef.current.disabled = true;
                cancelButtonRef.current.disabled = true;
            } else {
                deleteButtonRef.current.disabled = false;
                cancelButtonRef.current.disabled = false;
            }
        }
    }, [isLoading]);

    // Retrieve the post id parameter from the URL
    const { post_id } = useParams();

    async function handle_post_delete() {
        setIsLoading(true);

        // Gets auth information
        const username = await getCookieValue();
        const token = await get_token();

        fetch(`${process.env.REACT_APP_SUPPORT_SERVER_URL}/delete_post/${post_id}`, {
            headers: {
                username: username,
                token: token
            },
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                navigate("/");

            } else{
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .catch(() => {
            setIsLoading(false);
            deleteStatusRef.current.innerHTML = "Something Went Wrong!";
        })
    }

    if (deletePostPopupShow) {
        return(
            <div className="delete-post-popup-container">
                <div className="delete-post-popup">
                    <h1>Delete Post</h1>
                    <p>Are you sure you want to delete this post?</p>
                    <div className="popup-buttons">
                        <button className="cancel-button" ref={cancelButtonRef} onClick={() => setDeletePostPopupShow(false)}>Cancel</button>
                        <button className="delete-button" ref={deleteButtonRef} onClick={() => handle_post_delete()}>
                            {isLoading ? <ThreeDotSpinner /> : "Delete"}
                        </button>
                    </div>
                    <span className="delete-status" ref={deleteStatusRef} />
                </div>
            </div>
        );
    }
}

function ViewPost() {
    // Toggle delete post popup
    const [deletePostPopupShow, setDeletePostPopupShow] = useState(false);

    return(
        <div className="post-view-container">
            <Topnav />
            <DeletePostPopup deletePostPopupShow={deletePostPopupShow} setDeletePostPopupShow={setDeletePostPopupShow} />
            <Post setDeletePostPopupShow={setDeletePostPopupShow} />
            <Comments />
        </div>
    );
}
    
export default ViewPost;