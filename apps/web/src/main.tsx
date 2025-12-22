import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./provider/theme-provider.tsx";
import Layout from "./components/layout/sidebar/layout.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
    <Layout>
      <App />
    </Layout>
  </ThemeProvider>,
);
