import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#10063e',
        yellow: '#ffe733',
        red: '#ed2938',
        green: '#006b3e',
        'gray-dark': '#1F2937',
        gray: '#6A7280',
        'gray-light': '#F3F4F6',
        'gray-lighter': '#FAFAFA',
      },
    },
  },
  plugins: [],
};
export default config;
