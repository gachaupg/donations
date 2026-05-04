/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Playfair Display"', 'Georgia', 'serif'],
				about: ['Lato', 'Inter', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

// module.exports = {
// 	theme: {
// 	  extend: {
// 		backgroundImage: {
// 		  'hero-pattern': "url('/src/assets/Home Page Image.jpeg')",
// 		},
// 	  },
// 	},
//   }
  