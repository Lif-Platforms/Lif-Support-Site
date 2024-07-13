import styles from "./page.module.css";
import NavBar from "@/components/global/navbar/navbar";
import { cookies } from 'next/headers';
import Title from "@/components/home/title/title";
import Post from "@/components/home/post/post";

export const metadata = {
  title: "Lif Support",
  description: "Get support from our helpful community for Lif Platforms products and services."
}

export default async function Home() {
  // Get username from cookies
  const cookieStore = cookies();
  const username = cookieStore.get('LIF_USERNAME');

  // Get recent posts
  const response = await fetch(`${process.env.REACT_APP_SUPPORT_URL}/load_recent_posts`);

  let posts;

  if (response.ok) {
    posts = await response.json(); 

  } else {
    posts = "ERROR";
  }

  return (
    <main>
      <NavBar auth_url={process.env.REACT_APP_AUTH_URL} username={username.value} />
      <Title />
      <div className={styles.recent_posts}>
        <h1>Recent Posts:</h1>
        <div className={styles.recent_posts_container}>
          {Array.isArray(posts) ? (
            posts.map((post) => (
              <Post key={post.Id} title={post.Title} content={post.Content} software={post.Software} id={post.Id} />
            ))
          ) : (
            <p>Something Went Wrong</p>
          )}
        </div>
      </div>
    </main>
  );
}
