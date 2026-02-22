import { Details } from "@/components/crud/details/Details";
import { inputsUser } from "./utils/inputs";

const DetailsUser = () => {
    return (
        <Details
            inputs={inputsUser()}
            urlCreate="/auth/create-user"
            urlUpdate="/auth/update-user"
            keyCache="user"
            nameID="id"
            title="Usuario"
            readEndpoint=""
        />
    )
}

export default DetailsUser;