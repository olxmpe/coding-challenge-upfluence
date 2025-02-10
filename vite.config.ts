import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: "/coding-challenge-upfluence/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
