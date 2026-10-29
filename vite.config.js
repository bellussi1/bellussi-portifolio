import { defineConfig } from "vite";
import { resolve } from "node:path";
import { normalizeVariantRequest } from "./src/experiment/state.js";
function experimentRoutes(server) {
  server.middlewares.use((request, response, next) => {
    request.url = normalizeVariantRequest(request.url);
    next();
  });
}
export default defineConfig({
  plugins: [
    {
      name: "experiment-directory-routes",
      configureServer: experimentRoutes,
      configurePreviewServer: experimentRoutes,
    },
  ],
  build: {
    rollupOptions: {
      input: {
        original: resolve(import.meta.dirname, "index.html"),
        typography: resolve(import.meta.dirname, "v2/index.html"),
        editorial: resolve(import.meta.dirname, "v3/index.html"),
      },
    },
  },
});
