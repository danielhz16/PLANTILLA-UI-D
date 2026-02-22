import { List } from "@/components/crud/list/List";
import { getColumnsPermissions } from "./columns";

const ListePermissions = () => {
    return (
        <List 
      columns={getColumnsPermissions()}
      endpoint="/permissions/list"
      title="Permisos"
      queryKey="permissions"
      toCreate="/permissions/create"
    />
    )
};

export default ListePermissions;