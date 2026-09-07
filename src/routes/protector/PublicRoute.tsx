import { Navigate } from "react-router";
import { useAuthStore } from "@/features/auth";

interface PublicRouteProps {
    children: React.ReactNode;
}


export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useAuthStore();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
