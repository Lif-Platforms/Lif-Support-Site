'use client'

import { useEffect, useRef } from "react";
import styles from "./writer.module.css";

export default function Writer({ 
    writerState, 
    setWriterState, 
    current_user, 
    token, 
    post_id,
    support_url,
    post_title,
    post_content,
    post_software
}) {
    const writerPostButton = useRef();
    const replyForm = useRef();
    const writerPostStatus = useRef();
    const editPostForm = useRef();
    const editPostTitleInput = useRef();
    const editPostContentInput = useRef();
    const editPostSoftwareInput = useRef();

    function handle_reply(event, type) {
        // Prevent form from reloading page
        event.preventDefault();

        // Update post writer button
        writerPostButton.current.innerHTML = "Posting...";
        writerPostButton.current.disabled = true;

        // Create FormData for request
        const formData = new FormData(replyForm.current);

        // Make request to server
        fetch(`${support_url}/create_reply/${type}/${post_id}`, {
            method: "POST",
            headers: {
                username: current_user,
                token: token
            },
            body: formData
        })
        .then((response) => {
            if (response.status === 201) {
                window.location.reload();
            } else {
                return response.json().then((data) => {
                    throw new Error(data.message || "An error occurred");
                });
            }
        })
        .catch((err) => {
            console.error(err.message);
            writerPostButton.current.innerHTML = "Post";
            writerPostButton.current.disabled = false;
        });
    }

    function handle_edit_post(event) {
        // Prevent form from refreshing the page
        event.preventDefault();

        // Update post button
        writerPostButton.current.innerHTML = "Updating...";

        // Create FormData for request
        const formData = new FormData(editPostForm.current);

        // Make edit request to server
        fetch(`${support_url}/edit_post/${post_id}`, {
            method: "PUT",
            headers: {
                username: current_user,
                token: token
            },
            body: formData
        })
        .then((response) => {
            if (response.ok) {
                window.location.reload();
            } else {
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .catch((err) => {
            console.error(err);
            writerPostButton.current.innerHTML = "Update";
        })
    }

    // Fill in post data to edit writer
    useEffect(() => {
        if (writerState === "edit") {
            editPostTitleInput.current.value = post_title;
            editPostContentInput.current.value = post_content;
            editPostSoftwareInput.current.value = post_software;
        }
    }, [writerState])

    if (writerState === "comment") {
        return (
            <div className={styles.post_writer}>
                <h1>Share Your Thoughts</h1>
                <form ref={replyForm} onSubmit={(event) => handle_reply(event, "Comment")}>
                    <input required="true" name="content" placeholder="Comment" type="text" />
                    <button type="submit" className={styles.writer_post_button} ref={writerPostButton}>Post</button>
                </form>             
                <span className="writer-post-status" ref={writerPostStatus} />
                <button onClick={() => setWriterState(null)} className={styles.writer_close_btn}>&#10006;</button>
            </div>
        )
    } else if (writerState === "answer") {
        return (
            <div className={styles.post_writer}>
                <h1>Post Your Answer</h1>
                <form ref={replyForm} onSubmit={(event) => handle_reply(event, "Answer")}>
                    <textarea required="true" name="content" placeholder="Answer..." />
                    <button type="submit" className={styles.writer_post_button} ref={writerPostButton}>Post</button>
                </form>
                <span className="writer-post-status" ref={writerPostStatus} />
                <button onClick={() => setWriterState(null)} className={styles.writer_close_btn}>&#10006;</button>
            </div>
        )
    } else if (writerState === "edit") {
        return (
            <div className={styles.post_writer}>
                <h1>Edit Your Post</h1>
                <form ref={editPostForm} onSubmit={(event) => handle_edit_post(event)}>
                    <input required={true} name="title" placeholder="Title" type="text" ref={editPostTitleInput} />
                    <textarea required={true} name="content" placeholder="Post here..." ref={editPostContentInput} />
                    <select required={true} name="software" ref={editPostSoftwareInput}> 
                        <option value="Ringer">Ringer</option> 
                        <option value="Dayly">Dayly</option> 
                    </select>
                    <button className={styles.writer_post_button} type="submit" ref={writerPostButton}>Update</button>
                </form>
                <span className="writer-post-status" />
                <button className={styles.writer_close_btn} onClick={() => setWriterState(null)}>&#10006;</button>
            </div>
        )
    }
}