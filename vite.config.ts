import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";
import { cwd } from "process";

// https://vitejs.dev/config/
export default defineConfig({
  root: join(cwd(), "frontend"),
  build: {
    outDir: join(cwd(), "build/frontend"),
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    proxy: {
      "/hello": "http://localhost:3000",
    },
  },
});
