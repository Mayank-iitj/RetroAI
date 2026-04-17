import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          bg: "#080b13",
          magenta: "#ff3d81",
          cyan: "#30f5d2",
          amber: "#f5b349"
        }
      },
      fontFamily: {
        display: ["'Press Start 2P'", "monospace"],
        body: ["'IBM Plex Sans'", "sans-serif"]
      },
      animation: {
        boot: "boot 1.2s steps(10, end)",
        flicker: "flicker 0.15s infinite"
      },
      keyframes: {
        boot: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.96" }
        }
      }
    }
  },
  plugins: []
};

export default config;
