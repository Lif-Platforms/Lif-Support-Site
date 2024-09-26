'use client'

import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./delete_post_popup.module.css";
import ThreeDotSpinner from "@/components/global/spinners/spinners";

export default function DeletePostPopup({ 
    showDeletePostPopup,
    setShowDeletePostPopup,
    current_user,
    token,
    post_id,
}) {
    const cancelButton = useRef();
    const deleteButton = useRef();
    const deleteStatus = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    function handle_delete() {
        setIsLoading(true);

        // Disable popup buttons during the delete process
        deleteButton.current.disabled = true;
        cancelButton.current.disabled = true;

        deleteStatus.current.innerHTML = "";

        fetch(`${process.env.NEXT_PUBLIC_SUPPORT_URL}/delete_post/${post_id}`, {
            method: "DELETE",
            headers: {
                username: current_user,
                token: token
            }
        })
        .then((response) => {
            if (response.ok) {
                router.push('/');
            } else {
                throw new Error("Request failed wih status code: " + response.status);
            }
        })
        .catch((err) => {
            console.error(err);
            deleteStatus.current.innerHTML = "Something Went Wrong!";
            setIsLoading(false);

            // Enable popup buttons for user interaction
            deleteButton.current.disabled = true;
            cancelButton.current.disabled = true;
        })
    }

    if (showDeletePostPopup) {
        return (
            <div className={styles.delete_post_popup_container}>
                <div className={styles.delete_post_popup}>
                    <h1>Delete Post</h1>
                    <p>Are you sure you want to delete this post?</p>
                    <div className={styles.popup_buttons}>
                        <button ref={cancelButton} className={styles.cancel_button} onClick={() => setShowDeletePostPopup(false)}>Cancel</button>
                        <button ref={deleteButton} className={styles.delete_button} onClick={() => handle_delete()}>
                            {isLoading ? <ThreeDotSpinner /> : "Delete"}
                        </button>
                    </div>
                    <span ref={deleteStatus} className={styles.delete_status} />
                </div>
            </div>
        )
    }
}