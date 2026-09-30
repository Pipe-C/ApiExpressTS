import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "./src/config"),
      "@controllers": path.resolve(__dirname, "./src/controllers"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@repositories": path.resolve(__dirname, "./src/repositories"),
      "@models": path.resolve(__dirname, "./src/data/models"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@dto": path.resolve(__dirname, "./src/dto"),
      "@exceptions": path.resolve(__dirname, "./src/exceptions"),
      "@middlewares": path.resolve(__dirname, "./src/middlewares"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});