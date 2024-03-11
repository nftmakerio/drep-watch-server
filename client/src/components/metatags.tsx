import Head from "next/head";

const Metatags: React.FC = (): React.ReactNode => {
    return (
        <Head>
            {/* <!-- HTML Meta Tags --> */}
            <title>Drep</title>
            <meta
                name="description"
                content=""
            />

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Drep" />
            <meta
                property="og:description"
                content=""
            />
            <meta
                property="og:image"
                content="https://gmrguksafuopppgoodxy.supabase.co/storage/v1/object/public/nucast-assests/drep-opengraph.png"
            />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="trivolvetech.com" />
            <meta property="twitter:url" content="https://trivolvetech.com" />
            <meta name="twitter:title" content="Drep" />
            <meta
                name="twitter:description"
                content=""
            />
            <meta
                name="twitter:image"
                content="https://gmrguksafuopppgoodxy.supabase.co/storage/v1/object/public/nucast-assests/drep-opengraph.png"
            />

            {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --></meta> */}

            <meta name="theme-color" content="#ffffff" />

            <link rel="icon" href={`/favicon_io/favicon.ico`} />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href={`/favicon_io/apple-touch-icon.png`}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={`/favicon_io/favicon-32x32.png`}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={`/favicon_io/favicon-16x16.png`}
            />
            <link rel="manifest" href="/favicon_io/manifest.json" />
        </Head>
    );
};

export default Metatags;