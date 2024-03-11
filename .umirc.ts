import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "App" },
    { path: "/app2", component: "App2" },
  ],
  npmClient: "pnpm",
});
