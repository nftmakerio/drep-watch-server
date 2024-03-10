import Head from "next/head";
import MyProfile from "~/components/my-profile";

import Layout from "~/layout";

export default function Index() {
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <MyProfile />
            </Layout>
        </>
    );
}
