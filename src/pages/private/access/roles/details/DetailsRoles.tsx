import { ROLES } from "@/common";
import { Details } from "@/components/crud/details/Details";
import { inputsRoles } from "./inputs";

const DetailsRoles = () => {
    return (
        <Details
            inputs={inputsRoles}
            keyCache="roles"
            ReadEndpoint="/roles/Read"
            title="Rol"
            urlCreate="/roles/create"
            urlUpdate="/roles/update"
            permission={ROLES.MODULE}
        />
    );
};

export default DetailsRoles;
