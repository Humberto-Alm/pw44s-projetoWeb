import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";

export const RequireAuth = () => {
    const { authenticated } = useAuth(); 
    const location = useLocation();
    const hasToken = localStorage.getItem("token");

    if (!authenticated && hasToken) {
        return <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>Carregando...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};