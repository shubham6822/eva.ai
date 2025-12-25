import { RouterProvider } from "react-router";
import { routes } from "./config/routes";

export default function App() {
  return <RouterProvider router={routes} />;
}
