'use client'

import { useRef, useState } from "react";
import styles from "./post_body.module.css";
import { useRouter } from "next/navigation";

export default function PostBody({ support_url, username, token }) {
    const postTitleInput = useRef();
    const postStatus = useRef();
    const postSubmitButton = useRef();

    // Allow the enabling and disabling of form inputs and buttons
    const [isDisabled, setIsDisabled] = useState(false);

    const router = useRouter();

    function handle_post_create(event) {
        // Prevent form from refreshing the page
        event.preventDefault();

        // Disable all form entries and buttons
        setIsDisabled(true);

        // Update post button
        postSubmitButton.current.innerHTML = "Posting...";

        // Save post title for later
        const title = postTitleInput.current.value;

        // Create formData for request
        const formData = new FormData(event.target);

        fetch(`${support_url}/new_post`, {
            method: "POST",
            headers: {
                username: username,
                token: token
            },
            body: formData
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .then((data) => {
            // Navigate to new post
            router.push(`/post/${data.post_id}/${title}`);
        })
        .catch((err) => {
            console.error(err);
            postStatus.current.innerHTML = "Something Went Wrong!";
            postSubmitButton.current.innerHTML = "Post";
            setIsDisabled(false);
        })
    }

    return (
        <div className={styles.post_body}>
            <form onSubmit={(event) => handle_post_create(event)}>
                <input disabled={isDisabled} ref={postTitleInput} required={true} name="title" type="text" placeholder="Title" />
                <textarea disabled={isDisabled} required={true} name="content" placeholder="Description" />
                <select disabled={isDisabled} required={true} name="software"> 
                    <option value="Ringer">Ringer</option> 
                    <option value="Dayly">Dayly</option> 
                </select>
                <button ref={postSubmitButton} disabled={isDisabled} type="submit">Post</button>
                <span ref={postStatus} className={styles.post_status} />
            </form>
        </div>
    )
}