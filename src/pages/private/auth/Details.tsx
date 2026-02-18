import { Details } from "@/components/crud/details/Details";
import { inputsUser } from "./inputs";

const DetailsUser = () => {
    return (
        <Details
            inputs={inputsUser()}
            urlCreate="/auth/create-user"
            urlUpdate="/auth/update-user"
            keyCache="user"
            nameID="id"
        />
    )
}

export default DetailsUser;