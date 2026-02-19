import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    env: {
      DB_NAME: "state_registration_deadlines",
      DB_HOST: "localhost",
      DB_PORT: "5432",
      DB_USER: "postgres",
      DB_PASSWORD: "test",
      API_URL: "http://localhost:3000",
    }
  },
});