import { Navigate } from "react-router";

interface DefaultRootRedirectProps {
    isAuthenticated: boolean;
    homePath: string;
    loginPath: string;
}

export const DefaultRootRedirect = ({ isAuthenticated, homePath, loginPath }: DefaultRootRedirectProps) => (
    <Navigate to={isAuthenticated ? homePath : loginPath} replace />
);

export const DefaultNotAuthorized = () => <Navigate to="/not-authorized" replace />;

export const DefaultNotFound = () => <div className="flex items-center justify-center h-screen text-2xl font-semibold text-muted-foreground">Página no encontrada</div>;
