import { Details } from "@/components/crud/details/Details";
import { inputsPermission } from "./inputs";

const DetailsPermission = () => {
    return (
        <Details 
          inputs={inputsPermission}
          keyCache="permissions"
          readEndpoint="/permissions/read"
          title="Permiso"
          urlCreate="/permissions/create"
          urlUpdate="/permissions/update"
        />
    )
};

export default DetailsPermission;