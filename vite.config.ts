import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			"/api": {
				// Intercept requests starting with /api
				target: "https://zenquotes.io/api/random ", // Your backend server
				changeOrigin: true, // Ensure the request appears to come from the frontend server
				rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove /api prefix
			},
		},
	},
});
