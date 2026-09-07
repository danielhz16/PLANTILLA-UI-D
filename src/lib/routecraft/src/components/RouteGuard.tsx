import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface Props {
    isPublic?: boolean;
    auth?: [string, number];
    isAuthenticated: boolean;
    fnValidate?: (module: string, level: number) => boolean;
    children: ReactNode;
}

export const RouteGuard = ({ isPublic, auth, isAuthenticated, fnValidate, children }: Props) => {
    const nav = useNavigate();
    const access = isPublic || (isAuthenticated && (!auth || (fnValidate ? fnValidate(auth[0], auth[1]) : true)));

    useEffect(() => {
        if (isPublic || access) return;
        nav(!isAuthenticated ? "/auth/login" : "/unauthorized");
    }, [isPublic, access, isAuthenticated, nav]);

    if (isPublic) return <>{children}</>;
    return access ? <>{children}</> : null;
};
