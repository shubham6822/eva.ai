import AgentPage from "@/apps/agents";
import AgentCreatePage from "@/apps/agents/(create)";
import HomePage from "@/apps/home";
import Playground from "@/apps/playground";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/agent",
        element: <AgentPage />,
    },
    {
        path: "/agent/create",
        element: <AgentCreatePage />,
    },
    {
        path:"/playground",
        element: <Playground />,
    }
]);