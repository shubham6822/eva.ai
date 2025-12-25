import Agent from "@/apps/agents";
import Home from "@/apps/home";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/agent",
        element: <Agent />,
    }
]);