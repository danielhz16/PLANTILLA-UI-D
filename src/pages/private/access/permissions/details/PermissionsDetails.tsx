import { PERMISSIONS } from "@/common";
import { Details } from "@/components/crud/details/Details";
import { inputsPermission } from "./inputs";

const DetailsPermission = () => {
    return (
        <Details 
          inputs={inputsPermission}
          keyCache="permissions"
          ReadEndpoint="/permissions/Read"
          title="Permiso"
          urlCreate="/permissions/create"
          urlUpdate="/permissions/update"
          permission={PERMISSIONS.MODULE}
        />
    )
};

export default DetailsPermission;