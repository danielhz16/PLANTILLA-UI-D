import { useAuth, type TypeAuth, useAuthStore } from "@/features/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";


interface Props {
    name: string,
    level: TypeAuth,
    children: React.ReactNode
}

export const Protector = ({ name, level, children }: Props) => {
    const nav = useNavigate();
    const { user } = useAuthStore();
    const { validarPermiso } = useAuth();
    const access = validarPermiso(name, level);

    useEffect(() => {
        if (!access) {
            if (!user) {
                nav('/auth/login')
            } else {
                nav('/unauthorized')
            }
        }
    }, [access, user, nav]);

    return access ? children : null
}