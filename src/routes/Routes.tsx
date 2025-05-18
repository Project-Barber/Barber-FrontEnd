    import Cadastro from "@/pages/cadastro";
    import Landing from "@/pages/landing";
    import { createBrowserRouter } from "react-router-dom";
    import Login from "@/pages/login";
    import Dashboard from "@/pages/admin";
    import AdminDashboard from "@/pages/admin";

    export const defaultRoutes = createBrowserRouter([
        {
            path: "/",
            element: <div style={{ padding: 20 }}>Testando rota principal</div>
        },
        {
            path: "/register",
            element: <Cadastro />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/admin",
            element: <AdminDashboard/>
        },
        {
            path: "/Barber",
            element: <Dashboard />
        },
        
    ])