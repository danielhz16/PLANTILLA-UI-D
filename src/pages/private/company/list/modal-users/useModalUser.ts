import { useState } from "react";
import { useGetQuery } from "@/hooks/api/useGetQuery";
import type { Options } from "@/common";
import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useClient } from "@/hooks/api/useClient";


export interface PropsFetchModalUsers {
    assigned: Options[],
    notAssigned: Options[]
};

const cleanId = (label: string) => {
    return label.replace(/[^0-9]/g, '');
}

export const useModalUsers = () => {
    const { pushItem, deleteItem } = useClient();
    const [select, setSelect] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const url = `/company/users/${select}`;
    const { data, isLoading, refetch } = useGetQuery<PropsFetchModalUsers>(url, url, !!select)
    const assignUser = useMutationQuery({
        url: '/company/assign-user',
        method: 'POST'
    });

    const handleSelect = (company: number) => {
        setSelect(company)
        setIsOpen(true)
        if (select) {
            refetch();
        }
    };

    const handleClose = () => {
        setIsOpen(false)
        setSelect(null)
    };
        
    const getNewAssigned = (user: number) => {
        const newAssign = data?.notAssigned.find(u => u.id == user);
        return {
            id: Number(cleanId(newAssign?.label ?? '')),
            label: newAssign?.label ?? ''
        }
    }

    const handleAddUser = async (user: number, closeForm: () => void) => {
        if(!select) {
            throw new Error('No se ha seleccionado una empresa');
        };
          await assignUser.mutateAsync({
            user,
            idCompany: select
        });

        const newAssigned = getNewAssigned(user);
        
        pushItem({
            key: url,
            subProp: 'assigned',
            newData: newAssigned
        });
            deleteItem({
            key: url,
            id: String(user),
            nameID: 'id',
            subProp: 'notAssigned'
        });

        closeForm();
    };

    return {
        handleSelect,
        handleClose,
        isOpen,
        data,
        isLoading,
        handleAddUser,
        isPending: assignUser.isPending
    }
}