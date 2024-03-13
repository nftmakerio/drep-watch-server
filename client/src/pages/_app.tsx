import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { MeshProvider } from "@meshsdk/react";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <MeshProvider>
            <Component {...pageProps} />
        </MeshProvider>
    );
};

export default MyApp;
