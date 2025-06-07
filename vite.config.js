import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        background_color: "#ffffff",
        categories: ["transporte", "trabajo"],
        description:
          "Esta es una PWA para Controlar los tiempos del transporte publico",
        dir: "ltr",
        display_override: ["standalone", "fullscreen"],
        display: "standalone",
        scope: "/scooper/",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        lang: "es-MX",
        name: "Checador tablet",
        orientation: "portrait",
        prefer_related_application: false,
        short_name: "Checador",
        start_url: "/scooper/",
        theme_color: "#317EFB",
      },
    }),
  ],
  base: "/scooper/",
  server: {
    host: true,
  },
});
