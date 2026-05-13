/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Playfair Display"', 'Georgia', 'serif'],
				about: ['Lato', 'Inter', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				'modal-fade': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'modal-pop': {
					'0%': { opacity: '0', transform: 'translateY(12px) scale(0.96)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
				},
			},
			animation: {
				'modal-fade': 'modal-fade 180ms ease-out both',
				'modal-pop': 'modal-pop 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
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
  