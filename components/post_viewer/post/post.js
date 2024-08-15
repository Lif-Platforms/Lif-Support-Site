import styles from "./post.module.css";
import ReactMarkdown from "react-markdown";
import ControlsContainer from "../controls_container/controls_container";

export default function Post({ 
    title, 
    content, 
    author, 
    date, 
    software, 
    auth_url, 
    current_user, 
    token, 
    post_id,
    support_url,
}) {
    // Create a list of allowed elements in markdown
    const allowed_elements = ["h1", "h2", "li", "ul", "ol", "p", "strong"]

    return (
        <div style={{width: '100%', boxSizing: 'border-box'}}>
            <div className={styles.content_container}>
                <div>
                    <img src={`${auth_url}/get_pfp/${author}.png`} alt="" className={styles.post_author_img} />
                    <span className={styles.post_author}>{author}</span>
                </div>
                <div style={{width: '100%', boxSizing: 'border-box'}}>
                    <h1 className={styles.post_title}>{title}</h1>
                    <ReactMarkdown className={styles.post_content} allowedElements={allowed_elements} style={{ whiteSpace: 'pre-line' }}>{content}</ReactMarkdown>
                    <span className="post-date">Posted: {date ? date : "Not Available"}</span>
                    <span className={software === "Ringer" ? styles.ringer_software : software === "Dayly" ? styles.dayly_software : styles.software}>{software}</span>
                </div>
            </div>
            <ControlsContainer
                current_user={current_user}
                post_author={author} token={token}
                post_id={post_id}
                support_url={support_url}
                post_title={title}
                post_content={content}
                post_software={software}
                auth_url={auth_url}
            />
        </div>
    )
}