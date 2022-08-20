module.exports = {
	content: [
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					primary: "#0DA99D",
					secondary: "#D926A9",
					accent: "#1FB2A6",
					neutral: "#ffffff",
					"base-100": "#ffffff",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
			{
				dark: {
					primary: "#0DA99D",
					secondary: "#D926A9",
					accent: "#1FB2A6",
					neutral: "#191D24",
					"base-100": "#2A303C",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
		],
	},
};
