import { MainButton } from "../buttons/MainButton";
import { useUrl } from "@/hooks/api/useUrl";
import { filterStatus } from "./inputs/filter-status";
import { useEffect, useMemo } from "react";
import { STATUS } from "@/const/status";

interface Props {
  get: () => void;
  isPending?: boolean;
}

const ButtonStatus = ({ get, isPending = false }: Props) => {
  const { getValue, setValue } = useUrl();
  const statusOptions = useMemo(() => filterStatus()[0]?.options ?? [], []);

  const currentStatus = getValue("status") ?? getValue("status_id") ?? String(statusOptions[0]?.id ?? "");
  const activeOption = statusOptions.find((option) => String(option.id) === currentStatus) ?? statusOptions[0];
  const nextOption = statusOptions.find((option) => String(option.id) !== String(activeOption?.id)) ?? activeOption;

  const buttonLabel = activeOption?.id === STATUS.ACTIVE ? "Inactivos" : "Activos";

  const handleToggleStatus = () => {
    const value = String(nextOption?.id ?? "");
    setValue("status", value);
    setValue("status_id", value);
    get();
  };
  useEffect(() => {
   setValue("status_id", String(STATUS.ACTIVE));
  }, [])

  return (

      <MainButton
        variant="contained"
        color={activeOption?.id === STATUS.INACTIVE ? "success" : "error"}
        onClick={handleToggleStatus}
        disabled={isPending}
      >
        {buttonLabel}
      </MainButton>
    
  );
};

export default ButtonStatus;
