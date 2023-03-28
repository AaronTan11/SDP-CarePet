import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

export default function Home() {
   return (
      <main className={styles.main}>
         <h1>This is a header</h1>
      </main>
   );
}
