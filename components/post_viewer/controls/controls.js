'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from './controls.module.css';

export default function Controls({ post_author, current_user, writerState, setWriterState, setShowDeletePostPopup }) {
    const [showEditControls, setShowEditControls] = useState(false);

    // Check if current user is the author of this post
    // If so, the edit controls will be sown
    useEffect(() => {
        if (post_author === current_user) {
            setShowEditControls(true);
        }
    }, []);

    function handle_writer(type) {
        // Check if the user is trying to close the post writer
        if (writerState === type) {
            setWriterState(null);
        } else {
            setWriterState(type);
        }
    }

    return (
        <div className={styles.controls}>
            <button onClick={() => handle_writer("comment")} className={styles.button_type_1}>Comment</button>
            <button onClick={() => handle_writer("answer")} className={styles.button_type_1}>Answer</button>
            <div className={styles.separator} />
            {showEditControls ? (
                <div>
                    <button className={styles.button_type_2} onClick={() => handle_writer("edit")}>
                        <Image src='/post_viewer/edit_icon.png' width={30} height={30} alt=""/>
                    </button>
                </div>
            ): null}
            {showEditControls ? (
                <div>
                    <button className={styles.button_type_2} onClick={() => setShowDeletePostPopup(true)}>
                        <img src='/post_viewer/delete_icon.png'width={30} height={30} alt=""/>
                    </button>
                </div>
            ): null}
        </div>
    );
}