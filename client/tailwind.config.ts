import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    plugins: [],
    theme: {
        extend: {
            fontFamily: {
                "inter": ["var(--font-inter)"],
                "ibm-mono": ["var(--font-ibm-mono)"],
                "neue-regrade": ["var(--font-neue-regrade)"],
            },
            colors: {
                primary: "#FF4700",
                "primary-light": "#FFDACC",
                secondary: "#3F3F3F",
                "secondary-dark": "#0D0D10",
                tertiary: "#A6A6A6",
                "tertiary-light": "#F0F0F0",
                "brd-clr": "#00000017"
            },
            boxShadow: {
                'sm': '0px 4px 5px 0px rgba(0, 0, 0, 0.25)',
                'color': '0px 0px 9px 0px #FFBFA7A6',
            },
        },
    },
} satisfies Config;
