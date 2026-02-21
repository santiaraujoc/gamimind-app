export const colors = {
    primary: "#C8B4DE", // Lavender (Brand)
    secondary: "#A0D6FF", // Sky Blue
    accent: "#B8F2E6", // Mint Green
    background: "#F9F9F9", // Off-white
    text: "#2D3E50", // Dark grey for body
    subtext: "#6B7A8F", // Medium grey for subtitles
    white: "#FFFFFF",
    black: "#000000",
    error: "#FF6B6B", // Soft red
    warning: "#FFD93D", // Warning yellow
    success: "#B8F2E6", // Mint accent
};

export const shapes = {
    borderRadiusLarge: 20, // Cards, Modals
    borderRadiusPill: 30, // Buttons
};

export const shadows = {
    light: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
};

export const typography = {
    fontFamily: undefined, // Let the system use default (SF Pro/Roboto) unless specified
    sizes: {
        title: 28,
        body: 16,
        small: 14,
    },
    weights: {
        regular: "400",
        medium: "500",
        bold: "700",
    },
};

export const theme = {
    colors,
    shapes,
    shadows,
    typography,
};

export default theme;
