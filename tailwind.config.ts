import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
  	extend: {
		screens: {
			'md': '882px',
			// => @media (min-width: 992px) { ... }
		  },
  		fontFamily: {
  			sans: ['var(--font-nunito)', 'system-ui', 'sans-serif']
  		},
  		colors: {
  			// Vereinsfarben: Gletscherblau (Akzent), Alb-Blau (Struktur), Tannengrün (Sommer)
  			brand: {
  				'50': '#EAF4FB',
  				'100': '#CDE6F6',
  				'500': '#1279BF',
  				'600': '#0D63A0',
  				'700': '#0A4D7D'
  			},
  			alb: {
  				'50': '#F3F7FB',
  				'100': '#E3EDF6',
  				'600': '#2F5B85',
  				'800': '#1D3A57',
  				'900': '#14283D'
  			},
  			tanne: {
  				'50': '#EEF6EF',
  				'500': '#3E8E52'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate'),nextui()],
};

export default config;
