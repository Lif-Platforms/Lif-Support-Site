import NavBar from "@/components/global/navbar/navbar";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Post from "@/components/post_viewer/post/post";
import styles from './page.module.css';
import Comments from "@/components/post_viewer/comments/comments";
import Image from "next/image";

export const metadata = {
    title: "Lif Support | Support Post",
    description: "Get support from our helpful community for Lif Platforms products and services."
}

export default async function ViewPostPage({ params }) {
    // Get username and token from cookies
    const cookieStore = cookies();
    const username_cookie = cookieStore.get('LIF_USERNAME');
    const token_cookie = cookieStore.get('LIF_TOKEN');

    let username;
    let token;

    // Check is username and token have any value
    if (username_cookie) {
        username = username_cookie.value;
    } else {
        username = null;
    }

    if (token_cookie) {
        token = token_cookie.value;
    } else {
        token = null;
    }

    // Fetch post from server
    const response = await fetch(`${process.env.REACT_APP_SUPPORT_URL}/load_post/${params.post_id}`, {
        cache: 'no-cache'
    });

    if (response.ok) {
        // Parse post response
        const post = await response.json();

        // Filter page title
        const client_title = params.post_title;
        const format_client_title = client_title.replaceAll("%20", " ");

        // Check if the title provided in URL matches the actual post title
        if (post.Title === format_client_title) {
            return (
                <div className={styles.post_view_container}>
                    <NavBar username={username} auth_url={process.env.REACT_APP_AUTH_URL} />
                    <Post 
                        title={post.Title}
                        content={post.Content}
                        author={post.Author}
                        software={post.Software}
                        date={post.Date}
                        auth_url={process.env.REACT_APP_AUTH_URL}
                        current_user={username}
                        token={token}
                        post_id={params.post_id}
                        support_url={process.env.REACT_APP_SUPPORT_URL}
                    />
                    <Comments
                        auth_url={process.env.REACT_APP_AUTH_URL}
                        support_url={process.env.REACT_APP_SUPPORT_URL}
                        post_id={params.post_id}
                    />
                </div>
            )
        } else {
            redirect(`/post/${params.post_id}/${post.Title}`);
        }
    } else if (response.status === 404) {
        return (
            <div className={styles.not_found}>
                <NavBar username={username.value} auth_url={process.env.REACT_APP_AUTH_URL} />
                <Image className={styles.img} src="/post_viewer/not_found.png" alt="" width={100} height={100} />
                <h1 className={styles.title}>Page Not Found!</h1>
                <p className={styles.message}>The page you requested could not be found.</p>
            </div>
        )
    }
}