import Cadastro from "@/pages/cadastro";
import Landing from "@/pages/landing";
import { createBrowserRouter } from "react-router-dom";

export const defaultRoutes = createBrowserRouter([
    {
        path: "/",
        element: <div style={{ padding: 20 }}>Testando rota principal</div>
      },
    {
        path: "/register",
        element: <Cadastro />
    },
])