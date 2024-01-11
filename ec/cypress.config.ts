import { defineConfig } from "cypress"

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  defaultCommandTimeout: 10000,
})
