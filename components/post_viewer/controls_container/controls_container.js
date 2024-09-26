'use client'

import { useEffect, useState } from "react";
import Controls from "../controls/controls";
import Writer from "../writer/writer";
import DeletePostPopup from "../delete_post_popup/delete_post_popup";

export default function ControlsContainer({ 
    post_author,
    current_user,
    token,
    post_id,
    post_title,
    post_content,
    post_software,
}) {
    const [writerState, setWriterState] = useState(null);
    const [showDeletePostPopup, setShowDeletePostPopup] = useState(false);
    const [showControls, setShowControls] = useState(false);

    // Check if the user is logged in
    // If they are, the post controls will be shown
    useEffect(() => {
        // Create FormData for request
        const formData = new FormData();
        formData.append("username", current_user);
        formData.append("token", token);

        fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/verify_token`, {
            method: "POST",
            body: formData,
            cache: 'no-cache'
        })
        .then((response) => {
            if (response.ok) {
                setShowControls(true);
            } else {
                throw new Error("User is not logged in");
            }
        })
        .catch((err) => {
            console.error(err);
        })
    })
    if (showControls) {
        return (
            <div>
                <Controls 
                    current_user={current_user}
                    post_author={post_author}
                    writerState={writerState}
                    setWriterState={setWriterState}
                    setShowDeletePostPopup={setShowDeletePostPopup}
                />
                <Writer 
                    writerState={writerState}
                    setWriterState={setWriterState}
                    current_user={current_user}
                    token={token}
                    post_id={post_id}
                    post_title={post_title}
                    post_content={post_content}
                    post_software={post_software}
                />
                <DeletePostPopup
                    showDeletePostPopup={showDeletePostPopup}
                    setShowDeletePostPopup={setShowDeletePostPopup}
                    current_user={current_user}
                    token={token}
                    post_id={post_id}
                />
            </div>
        )
    }   
}