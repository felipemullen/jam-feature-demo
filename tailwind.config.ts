import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            cursor: {
                highlight: 'url(/icon/highlightable.svg) 0 13, pointer',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in-out',
            }
        }
    },
    plugins: [],
};
export default config;
