import "../styles/global.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6119998481340838"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
}


