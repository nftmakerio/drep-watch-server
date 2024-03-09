import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    plugins: [],
    theme: {
        extend: {
            fontFamily: {
                "inter": ["var(--font-inter)"],
                "ibm-mono": ["var(--font-ibm-mono)"],
            },
            colors: {
                primary: "#FF4700",
                secondary: "#3F3F3F",
                tertiary: "#A6A6A6",
            },
        },
    },
} satisfies Config;
