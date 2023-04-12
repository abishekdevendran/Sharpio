/** @type {import('tailwindcss').Config} */
module.exports = {
	jit: true,
	daisyui: {
		themes: ['pastel', 'dark', 'valentine', 'night'],
	},
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['var(--font-poppins)', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],
};