import NavBar from "@/components/global/navbar/navbar";
import { cookies } from 'next/headers';
import styles from "./page.module.css";
import Post from "@/components/search/post/post";
import Filters from "@/components/search/filters/filters";

export const metadata = {
    title: "Lif Support | Search Results",
    description: "Get support from our helpful community for Lif Platforms products and services."
  }

export default async function SearchPage({ params }) {
    // Get username from cookies
    const cookieStore = cookies();
    const username = cookieStore.get('LIF_USERNAME');

    // Get and format search query
    const query = params.query;
    const format_query = query.replaceAll("%20", " ");


    let search_url = `${process.env.REACT_APP_SUPPORT_URL}/search/${format_query}`;

    // Send search query to backend
    const response = await fetch(search_url);

    let results;

    if (response.ok) {
        results = await response.json();
    } else {
        results = "ERROR";
    }

    return (
        <div className={styles.search_page}>
            <NavBar auth_url={process.env.REACT_APP_AUTH_URL} username={username.value} />
            <h1 className={styles.search_query}>Search Results For: "{format_query}"</h1>
            <Filters search={format_query} />
            <div className={styles.results}>
                {Array.isArray(results) && results.length > 0 ? (
                    results.map((post) => (
                        <Post key={post.Id} id={post.Id} title={post.Title} content={post.Content} software={post.Software} />
                    ))
                ) : Array.isArray(results) && results.length === 0 ? (
                    <h1>We Couldn't Find Anything.</h1>
                ) : (
                    <h1>We Couldn't Load Search Results.</h1>
                )}
            </div>
        </div>
    )
}