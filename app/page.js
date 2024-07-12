import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/components/global/navbar/navbar";
import { cookies } from 'next/headers';

export const metadata = {
  title: "Lif Support",
  description: "Get support from our helpful community for Lif Platforms products and services."
}

export const metadata = {
  title: "Lif Support",
  description: "Get support from our helpful community for Lif Platforms products and services."
}

export default function Home() {
  // Get username from cookies
  const cookieStore = cookies();
  const username = cookieStore.get('LIF_USERNAME');

  return (
    <main>
      <NavBar auth_url={process.env.REACT_APP_AUTH_URL} username={username.value} />
      <h1>Main Page</h1>
    </main>
  );
}
