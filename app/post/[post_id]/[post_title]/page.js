export default function ViewPostPage({ params }) {
    return (
        <div>
            <h1>View Post Page</h1>
            <p>{params.post_id}</p>
            <p>{params.post_title}</p>
        </div>
    )
}