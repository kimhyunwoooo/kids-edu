/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#FFB703',
                secondary: '#8ECAE6',
                accent: '#FB8500',
                success: '#90BE6D',
                background: '#FFF8E7'
            },
            fontFamily: {
                'noto-rounded': ['Noto Sans KR', 'sans-serif'],
                baloo: ['Baloo', 'cursive'],
                comic: ['Comic Neue', 'cursive']
            },
            animation: {
                'bounce-gentle': 'bounce 0.6s ease-in-out',
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'fade-out': 'fadeOut 0.3s ease-in-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeOut: {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-10px)' }
                }
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                kidsedu: {
                    primary: '#FFB703',
                    secondary: '#8ECAE6',
                    accent: '#FB8500',
                    neutral: '#3d4451',
                    'base-100': '#FFF8E7',
                    'base-200': '#F5F5DC',
                    'base-300': '#E6E6FA',
                    info: '#3abff8',
                    success: '#90BE6D',
                    warning: '#fbbd23',
                    error: '#f87272'
                }
            }
        ]
    }
};
