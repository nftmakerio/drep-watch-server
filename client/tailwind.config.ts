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
                "primary-light": "#FFDACC",
                secondary: "#3F3F3F",
                tertiary: "#A6A6A6",
            },
            boxShadow: {
                'sm': '0px 4px 5px 0px rgba(0, 0, 0, 0.25)',
            },
        },
    },
} satisfies Config;
