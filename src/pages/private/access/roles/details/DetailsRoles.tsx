import { Details } from "@/components/crud/details/Details";
import { inputsRoles } from "./inputs";
import { usePermissionRoles } from "../hooks/usePermissionRoles";

const DetailsRoles = () => {
    const { canWrite } = usePermissionRoles();
    return (
        <Details
            inputs={inputsRoles}
            keyCache="roles"
            readEndpoint="/roles/read"
            title="Rol"
            urlCreate="/roles/create"
            urlUpdate="/roles/update"
            enabledEdit={canWrite}
        />
    );
};

export default DetailsRoles;
