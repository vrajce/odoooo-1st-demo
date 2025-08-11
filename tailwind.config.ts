import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // QuickCourt Brand Colors
        atlantis: {
          DEFAULT: "#a5c639",
          50: "#f5f8eb",
          100: "#e8f0d1",
          200: "#d2e2a9",
          300: "#b7ce77",
          400: "#a5c639",
          500: "#8ba82e",
          600: "#6c8424",
          700: "#526420",
          800: "#43511f",
          900: "#3a451e",
        },
        apple: {
          DEFAULT: "#5d8b37",
          50: "#f2f7ed",
          100: "#e1eed6",
          200: "#c5deb1",
          300: "#9fc682",
          400: "#7ba858",
          500: "#5d8b37",
          600: "#487029",
          700: "#3a5824",
          800: "#314721",
          900: "#2b3d1f",
        },
        feijoa: {
          DEFAULT: "#a3d78e",
          50: "#f4f9f1",
          100: "#e6f3df",
          200: "#cfe7c1",
          300: "#a3d78e",
          400: "#7bc262",
          500: "#5ba642",
          600: "#468632",
          700: "#39692a",
          800: "#315426",
          900: "#2b4623",
        },
        sahara: {
          DEFAULT: "#f2e18c",
          50: "#fdfcf3",
          100: "#faf7e1",
          200: "#f5edbe",
          300: "#f2e18c",
          400: "#edd063",
          500: "#e6be43",
          600: "#d19f34",
          700: "#ad7f2f",
          800: "#8d652d",
          900: "#74522a",
        },
        energy: {
          DEFAULT: "#f7d850",
          50: "#fefce8",
          100: "#fdf9c2",
          200: "#fbf188",
          300: "#f7d850",
          400: "#f3c71f",
          500: "#e3b00f",
          600: "#c3890a",
          700: "#9b630d",
          800: "#804f13",
          900: "#6d4117",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "16px",
        "2xl": "20px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-atlantis": "linear-gradient(135deg, #a5c639 0%, #5d8b37 100%)",
        "gradient-feijoa": "linear-gradient(135deg, #a3d78e 0%, #5d8b37 100%)",
        "gradient-sahara": "linear-gradient(135deg, #f2e18c 0%, #f7d850 100%)",
      },
      boxShadow: {
        "atlantis-glow": "0 0 20px rgba(165, 198, 57, 0.3)",
        "feijoa-glow": "0 0 20px rgba(163, 215, 142, 0.3)",
        "energy-glow": "0 0 20px rgba(247, 216, 80, 0.3)",
        "lift": "0 10px 25px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
