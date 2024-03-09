import { Inter, IBM_Plex_Mono } from "next/font/google";

const inter_font = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-inter",
});
const mono_font = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-ibm-mono",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            className={`relative min-h-screen w-full bg-[#f5f5f5] ${inter_font.variable} ${mono_font.variable} grid-lines`}
        >
            {/* mx-auto flex h-full w-[90%] flex-col items-center justify-center md:w-[87.5%] */}
            {children}
        </main>
    );
};

export default Layout;
