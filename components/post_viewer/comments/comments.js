import Image from "next/image";
import styles from "./comments.module.css";

export default async function Comments({ post_id, support_url, auth_url }) {
    // Load comments from server
    const response = await fetch(`${support_url}/load_comments/${post_id}`);

    if (response.ok) {
        const comments = await response.json();

        // Check is len of comments is greater than zero
        if (comments.length > 0) {
            return (
                <div className={styles.comments_viewer}>
                    {comments.map(item => (
                        (item.Type === "Comment" ? 
                            <div key={item.Id} className={styles.comment}>
                                <img src={`${auth_url}/get_pfp/${item.Author}.png`} alt="" />
                                <div>
                                    <h1>{item.Author}</h1>
                                    <p>{item.Content}</p>
                                </div> 
                            </div>
                        : 
                            <div key={item.Id} className={styles.answer}>
                                <div className={styles.answer_header}>
                                    <Image width={30} height={30} src="/post_viewer/check_icon.svg" alt="" />
                                    <h1>Answer</h1>
                                </div>
                                <p style={{ whiteSpace: 'pre-line' }}>{item.Content}</p>
                                <span>Posted By: {item.Author}</span>
                            </div>
                        )
                    ))}
                </div>
            )
        } else {
            return (
                <div className={styles.comments_viewer}>
                    <p style={{textAlign: 'center'}}>WOW! Nobody commented yet.</p>
                </div>
            )
        }    
    } else {
        <div>
            <h1>Failed to load comments</h1>
        </div>
    }
}