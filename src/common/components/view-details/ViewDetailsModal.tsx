import { useGetQuery } from "@/hooks/api/useGetQuery";
import { Modal } from "@/components/modal/Modal";
import { Box, Typography } from "@mui/material";
import type { DetailField } from '@common/types/details';
import { DetailsView } from './DetailsView';
import Loader from "@/components/loading/Loader";

interface Props {
    open: boolean;
    onClose: () => void;
    readEndpoint: string;
    id: string | number;
    title?: string;
    fields: DetailField[];
}

export const ViewDetailsModal: React.FC<Props> = ({
    open, onClose, readEndpoint, id, title, fields
}) => {
    const url = `${readEndpoint}/${id}?details=true`;
    const { data, isLoading } = useGetQuery(url, url, open);

    return (
        <Modal open={open} onClose={onClose} title={title ?? 'Detalles'} maxWidth="sm">
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <Loader isPending />
                </Box>
            ) : data ? (
                <DetailsView fields={fields} data={data as Record<string, unknown>} />
            ) : (
                <Typography
                    variant="body2"
                    sx={{ color: 'var(--color-text-secondary)', textAlign: 'center', py: 6 }}
                >
                    No se encontraron datos
                </Typography>
            )}
        </Modal>
    );
};

export default ViewDetailsModal;
