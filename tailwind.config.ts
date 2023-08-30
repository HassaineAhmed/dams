import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "lora": ['var(--font-lora)'],
        "mr": ['var(--font-merriweather)'],
        "ds": ['var(--font-ds)'],
      },
      colors: {
        pr: '#3D7D7A',
        sd: '#244A48',
        td: '#9FC9C7',
        gold: '#D8B4A0',
        whitish: '#F2E9DA',
        black: '#000000',
        bordea: "hsl(var(--border))",
        formGrey: "#A9A395",
        formGreen: "#324443",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'bounce': {
          '0%': {
            transform: 'translateY(0)'
          },
          '20%': {
            transform: 'translateY(1px)'
          },
          '40%': {
            transform: 'translateY(0px)'
          },
          '60%': {
            transform: 'translateY(1px)'
          },
          '80%': {
            transform: 'translateY(0px)'
          },
          '100%': {
            transform: 'translateY(1px)'
          },
        },
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' },
        },
        "slideInFromRight": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scanelX(1)" },
        },
        "slideOutFromRight": {
          "0%": { transform: "scaleX(1)", },
          "100%": { transform: "scaleX(0)", },
        },
        "fadeIn": {
          "0%": { opacity: "0", display: "none" },
          "95%": { opacity: "1" },
          "100%": { opacity: "1", display: "flex", },
        },
        "fadeOut": {
          "0%": { opacity: "1" },
          "95%": { opacity: "0" },
          "100%": { opacity: "0", display: "none", },
        },
        "fadeInOut": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          }
        },
        "rotateChevron": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(180deg)"
          },
        },
        "dropdown": {
          "0%": {
            height: "0"
          },
          "100%": {
            height: "100%"
          },
        },
        "slideInFromLeft": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fadeInFromRight": {
          "0%": {
            opacity: "0",
            transform: "translateX(40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fadeInFromUp": {
          "0%": {
            opacity: "0",
            transform: "translateY(-40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "slowFadeIn": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "borderOut": {
          "0%": {
            border: "2px",
          },
          "100%": {
            opacity: "0",
          },
        },
        "borderIn": {
          "0%": {
            border: "0px",
          },
          "90%": {
            border: "2px",
          },
          "100%": {
            border: "2px",
          },
        },
        "pulse": {
          "0%, 100%": {
            opacity: "0.9"
          },
          "50%": {
            opacity: "0.8"
          }
        }
      },

      animation: {
        "pluse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        "slideIn": "slideInFromRight 500ms forwards ease-out",
        "slideOut": "slideOutFromRight 500ms forwards ease-out ",

        "fadeIn": "fadeIn 400ms ease-in-out forwards ",
        "fadeOut": "fadeOut 200ms ease-in-out  frowards",

        "fadeInOut": "fadeInOut 1s ease-in-out",
        "rotateChevron": "rotateChevron 0.4s ease-in-out forwards",
        "rotateChevronDown": "rotateChevron 0.4s ease-in-out reverse",
        "dropdown": "dropdown 400ms ease-in-out  forwards",

        "slideInFromLeft": "slideInFromLeft 900ms ease-out",
        "fadeInFromRight": "fadeInFromRight 500ms ease-out",
        "fadeInFromUp": "fadeInFromUp 500ms ease-in-out",
        "slowFadeIn": "slowFadeIn 2s ease-out",

        "borderIn": "borderIn 100ms ease-out forwards",
        "borderOut": "borderOut 100ms ease-out",

      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
