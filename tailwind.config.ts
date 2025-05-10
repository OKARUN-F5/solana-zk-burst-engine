
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'faktum': ['Faktum', 'sans-serif'],
				'faktum-semibold': ['Faktum', 'sans-serif'],
				'sohne': ['Söhne', 'system-ui', 'sans-serif'],
				'dm-sans': ['DM Sans', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our cToken app
				solana: {
					DEFAULT: '#9945FF',
					dark: '#7B35DB',
					light: '#B980FF'
				},
				ctoken: {
					DEFAULT: '#14F195',
					dark: '#0BD07E',
					light: '#66FFD1'
				},
				// Event Creator Experience colors
				'creator-primary': 'hsl(var(--creator-primary))',
				'creator-primary-light': 'hsl(var(--creator-primary-light))',
				'creator-success': 'hsl(var(--creator-success))',
				'creator-warning': 'hsl(var(--creator-warning))',
				// New color scheme
				'deep-purple': '#3A1D8A',
				'electric-blue': '#4361EE',
				'mint-green': '#4CC9A2',
				'coral': '#FF6B6B',
				// Analytics Dashboard Colors
				'navy': '#19216C',
				'navy-dark': '#0F1343',
				'purple': '#5438DC',
				'mint': '#10DABE',
				'amber': '#FFC947',
				// Gallery theme colors
				'gallery-bg-from': '#0D0221',
				'gallery-bg-to': '#261447',
				'gallery-accent-pink': '#FF3864',
				'gallery-accent-teal': '#1CDEC9',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(153, 69, 255, 0.5)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(153, 69, 255, 0.8), 0 0 30px rgba(20, 241, 149, 0.4)',
						transform: 'scale(1.03)'
					}
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'card-hover': {
					'0%': { transform: 'translateY(0) rotate(0)' },
					'50%': { transform: 'translateY(-5px) rotate(1deg)' },
					'100%': { transform: 'translateY(0) rotate(0)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'tilt': {
					'0%, 50%, 100%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(2deg)' },
					'75%': { transform: 'rotate(-2deg)' },
				},
				'float-3d': {
					'0%, 100%': { 
						transform: 'translateY(0) translateX(0) rotate3d(0, 1, 0, 0deg)',
					},
					'25%': { 
						transform: 'translateY(-5px) translateX(3px) rotate3d(0.1, 1, 0.2, 5deg)',
					},
					'50%': { 
						transform: 'translateY(-7px) translateX(0) rotate3d(0.1, 1, 0.2, 0deg)',
					},
					'75%': { 
						transform: 'translateY(-5px) translateX(-3px) rotate3d(0.1, 1, 0.2, -5deg)',
					}
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 10px rgba(255, 56, 100, 0.4), 0 0 20px rgba(28, 222, 201, 0.2)',
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(255, 56, 100, 0.6), 0 0 40px rgba(28, 222, 201, 0.4)',
					}
				},
				'masonry-appear': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'card-hover': 'card-hover 0.5s ease-in-out',
				'shimmer': 'shimmer 2s infinite linear',
				'tilt': 'tilt 10s ease-in-out infinite',
				'float-3d': 'float-3d 8s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
				'masonry-appear': 'masonry-appear 0.6s ease-out forwards',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'ctoken-gradient': 'linear-gradient(to right bottom, #9945FF, #14F195)',
				'deep-gradient': 'linear-gradient(to right, #3A1D8A, #4361EE)',
				'glow-gradient': 'linear-gradient(to right bottom, rgba(58, 29, 138, 0.5), rgba(67, 97, 238, 0.5))',
				'creator-gradient': 'linear-gradient(to right, #2D0C76, #5438DC)',
				'gradient-blue-purple': 'linear-gradient(to right, #19216C, #5438DC)',
				'gradient-navy': 'linear-gradient(to bottom right, #19216C, #0F1343)',
				'gallery-gradient': 'linear-gradient(135deg, #0D0221, #261447)',
				'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glow-sm': '0 0 5px rgba(67, 97, 238, 0.3)',
				'glow-md': '0 0 15px rgba(67, 97, 238, 0.4)',
				'glow-lg': '0 0 30px rgba(67, 97, 238, 0.5)',
				'creator': '0 8px 30px rgba(45, 12, 118, 0.15), 0 2px 5px rgba(45, 12, 118, 0.05)',
				'creator-hover': '0 12px 40px rgba(45, 12, 118, 0.25), 0 4px 8px rgba(45, 12, 118, 0.1)',
				'token-card': '0 8px 20px rgba(13, 2, 33, 0.5), 0 0 0 1px rgba(255, 56, 100, 0.1)',
				'token-glow': '0 0 20px rgba(28, 222, 201, 0.4), 0 0 60px rgba(255, 56, 100, 0.2)',
			},
			letterSpacing: {
				tight: '-0.025em',
				tighter: '-0.05em',
				tightest: '-0.1em',
				'super-tight': '-1.5px',
			},
			lineHeight: {
				'analytics': '1.6',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
