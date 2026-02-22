import { Modal } from "@/components/modal/Modal";
import { MainTable } from "@/components/tables/mainTable/MainTable";
import { createColumnHelper } from "@tanstack/react-table";
import { MainButton } from "@/components/buttons/MainButton";
import { Title } from "@/components/layout/Title/Title";
import { Users } from "lucide-react";
import { ModalForm } from "@/components/modal/ModalForm";
import { useState } from "react";
import type { Input } from "@/components/ts/form";
import type { Options } from "@/common/types";
import type { PropsFetchModalUsers } from "./useModalUser";

const { accessor } = createColumnHelper<Options>();

const columns = [
    accessor('id', {
        header: 'ID',
    }),
    accessor('label', {
        header: 'Nombre',
    }),
];

const inputsAddUser = (options: Options[]): Input[] => {
    return [
        {
            name: 'user',
            label: 'Usuario',
            type: 'select',
            options: options
        }
    ];
};

interface Props {
    open: boolean;
    onClose: () => void;
    data: PropsFetchModalUsers;
    isLoading: boolean;
    handleAddUser: (user: number, closeForm: () => void) => void;
    isPending?: boolean;
}

export const ModalUsers = ({ open, onClose, data, isLoading, handleAddUser, isPending }: Props) => {
    const [openForm, setOpenForm] = useState(false);


    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title="Usuarios"
                fullWidth
                sx={{
                    minHeight: 300
                }}
            >
                <Title>
                    <MainButton variant="outlined" sx={{ margin: 1 }} onClick={() => setOpenForm(true)}>
                        Agregar Usuario <Users />
                    </MainButton>
                </Title>
                <MainTable<Options>
                    columns={columns}
                    data={data?.assigned ?? []}
                    isLoading={isLoading}
                />
            </Modal>

            <ModalForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                title="Agregar Usuario"
                inputs={inputsAddUser(data?.notAssigned ?? [])}
                onSubmit={({ user }) => handleAddUser(user, () => setOpenForm(false))}
                maxWidth="xs"
                isPending={isPending}
            />
        </>
    );
};

