import { USERS } from "@/features/users";
import { Details } from "@/components/crud/details/Details";
import { useDetailsUser } from "./hooks/useDetailsUser";

const DetailsUser = () => {
    const { inputs, isLoadingRoles } = useDetailsUser();
    return (
        <Details
            inputs={inputs}
            urlCreate="/users/create"
            urlUpdate="/users/update"
            keyCache="user"
            nameID="id"
            title="Usuario"
            ReadEndpoint="/users/read"
            permission={USERS.MODULE}
            isLoading={isLoadingRoles}
        />
    )
}

export default DetailsUser;