import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useState } from "react";
import type { Config } from "../utils/types";

export const useStatus = ({ id, statusConfig, table }: Config) => {
    const [modalConfirmation, setOpenModalConfirmation] = useState(false);

    const updateStatus = useMutationQuery({
        url: `/options/update-status`,
        method: 'PATCH',
        deleteCell: true,
        id: id,
        nameID: statusConfig?.nameID,
        keyCache: statusConfig?.cacheKey,
        subProp: statusConfig?.subProp,
    });

    const handleChangeStatus = async (confirmation = false) => {
        if (!confirmation) return setOpenModalConfirmation(true);

        await updateStatus.mutateAsync({
            name: table, id
        });
        setOpenModalConfirmation(false);
    }

    return {
        handleChangeStatus,
        isPending: updateStatus.isPending,
        modalConfirmation,
        setOpenModalConfirmation
    }
}