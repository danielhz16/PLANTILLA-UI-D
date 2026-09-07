import { Navigate } from "react-router";
import { useAuthStore } from "@/features/auth";

interface PrivateRouteProps {
    children: React.ReactNode;
}


export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
};
