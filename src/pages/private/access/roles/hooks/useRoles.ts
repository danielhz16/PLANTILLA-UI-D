import { useNavigate } from "react-router";

export const useRoles = () => {
    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/gestion-usuarios/roles/details/${id}`);
    };

    return {
        handleEdit
    };
};
