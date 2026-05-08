window.tailwind = window.tailwind || {};

window.tailwind.config = {
  safelist: [
    "bg-brand",
    "bg-brandDark",
    "bg-emerald-50",
    "text-emerald-700",
    "border-red-100",
    "border-amber-100",
    "border-blue-100"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#1e1b2e",
        muted: "#5a5672",
        lavender: "#f8f7fd",
        soft: "#f0eff8",
        surface: "#ffffff",
        brand: "#6c5ce7",
        brandDark: "#4834d4",
        brandLight: "#a29bfe",
        gold: "#b8860b",
        mist: "#f1f2f6"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(108, 92, 231, 0.08)",
        card: "0 4px 20px rgba(30, 27, 46, 0.06)",
        hover: "0 12px 40px rgba(108, 92, 231, 0.12)"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem"
      }
    }
  }
};
