import Topnav from "../global-components/topnav";
import "../css/post.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_token, check_token } from "../scripts/verify_token";
import getCookieValue from "../scripts/get_username"
import Cookies from "js-cookie";
import escapeHtml from "../scripts/sanitize_username";

function SignIn({showSignIn}) {
    // Handle button navigate
    function handle_click() {
        window.location.href = "https://my.lifplatforms.com/#/login?redirect=https://support.lifplatforms.com";
    }

    if (showSignIn === true) {
        return(
            <div className="sign-in-panel-show">
                <div className="panel-show">
                    <h1>Sign In</h1>
                    <p>You need to be singed in to do that.</p>
                    <button onClick={handle_click}>Sign in</button>
                </div>      
            </div>
        )
    }
    else {
        return(
            <div className="sign-in-panel-hide">
                <div className="panel-hide">
                    <h1>Sign In</h1>
                    <p>You need to be singed in to do that.</p>
                    <button>Sign in</button>
                </div>      
            </div>
        )
    }
}

function NewPost() {
    const [showSignIn, setShowSignIn] = useState(false);
    const navigate = useNavigate();

    // Checks if the use is singed in
    useEffect(() => {
        async function handle_check_token() {
            const token_exists = await check_token();

            // Checks if token exists
            if (token_exists === true) {
                setShowSignIn(false);
            } else {
                setShowSignIn(true);
            }
        }
        handle_check_token();
    }, [])

    async function create_post() {
        // Gets the post button and changes its status
        const post_button = document.getElementById("post-button");
        post_button.innerHTML = "Posting...";
        post_button.disabled = true;

        // Gets username and token
        const username = await getCookieValue();
        const token = await get_token();

        // Gets the post title and content
        const title_input = document.getElementById("title");
        const title = title_input.value;

        const body_input = document.getElementById('body');
        const body = body_input.value; 

        // Gets the selected software
        const software_input = document.getElementById('software');
        const software = software_input.value;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", body);
        formData.append("software", software);

        // Backend url
        const support_url = process.env.REACT_APP_SUPPORT_SERVER_URL;

        // Update post status
        document.getElementById('post-status').innerHTML = "";

        // Makes the request to the server
        fetch(`${support_url}/new_post`, {
            method: "POST",
            headers: {
                username: username,
                token: token
            },
            body: formData
        })
        .then(response => {
            if (response.status === 201) {
                return response.json(); // Convert response to JSON
            } else {
                throw new Error('Request failed with status code: ' + response.status);
            }
        })
        .then(data => {
            // Work with the data
            console.log(data);
            
            // Changes the status of the post button
            post_button.innerHTML = "Done!";

            // Navigates to the users post
            setTimeout(() => {
                navigate(`/view_post/${data.post_id}`);
            }, 2000); 
           
        })
        .catch(error => {
            // Handle any errors
            console.error(error);

            // Update post status
            document.getElementById('post-status').innerHTML = "Something Went Wrong!";
            post_button.innerHTML = "Post";
            post_button.disabled = false;
        });
        }

    // Get username from cookies
    const username = Cookies.get("LIF_USERNAME");

    // Format username
    const formatted_username = decodeURIComponent(username);

    // Sanitize username
    const sanitized_username = escapeHtml(formatted_username);

    return(
        <div>
            <Topnav />
            <SignIn showSignIn={showSignIn} />
            <div className="page-title">
                <h1>New Post</h1>
                <p>What do you need help with?</p>
            </div>
            <div className="post-container">
                <div className="avatar">
                    <img src={`${process.env.REACT_APP_AUTH_SERVER_URL}/profile/get_avatar/${sanitized_username}.png`} alt="" />
                </div>
                <div className="post-form">
                    <div className="post-header">
                    </div>
                    <div className="post-body">
                        <input type="text" id="title" placeholder="Title" />
                        <textarea placeholder="Description" id="body" />
                        <select name="Software" id="software"> 
                            <option value="Ringer">Ringer</option> 
                            <option value="Dayly">Dayly</option> 
                        </select>
                        <button id="post-button" onClick={() => create_post()}>Post</button>
                        <span className="post-status" id="post-status" />
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default NewPost;