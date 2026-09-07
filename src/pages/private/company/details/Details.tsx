import { Details } from "@/ui/crud/details/Details";
import { inputsCompany } from "./inputs";

const DetailsCompany = () => {
    return (
        <Details
          urlCreate="company/create"
          urlUpdate="company/update"
          inputs={inputsCompany}
          keyCache="companies"
          nameID="id"
          title="Empresa"
          ReadEndpoint="company/read"
        />
    )
};

export default DetailsCompany