/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"**/*.{html, jsx, js}",
		"**/*.js",
		"**/*.html",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'pale-sky': '#DCEDFF',
				'surface-soft': '#F3F8FF',
				'surface-sunken': '#EAF2FC',
				'powder-blue': '#94B0DA',
				// Matches --accent-line in css/index.css. Without this,
				// tw-border-accent-line silently produced no border.
				'accent-line': 'rgba(148, 176, 218, 0.32)',
				'accent-strong': '#6F92C5',
				'slate-indigo': '#4E6088',
				'deep-navy': '#3A4C7E',
				'ink-navy': '#14213D',
				'ink-soft': '#3B4A6B',
				'ink-muted': '#526181',
				'macro-green': '#166534',
				'macro-amber': '#9A4508',
				danger: '#C0392B',
				success: '#2F855A',
			},
			fontFamily: {
				display: ['Inter', 'ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				sans: ['Inter', 'ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
