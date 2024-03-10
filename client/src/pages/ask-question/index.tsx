import Head from "next/head";
import AskQuestion from "~/components/ask-question";

import Layout from "~/layout";
import { getStaticProps } from "~/utils";

export default function Index() {
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <AskQuestion />
            </Layout>
        </>
    );
}

export { getStaticProps };