import { CircularProgress, Modal } from "@mui/material";

interface Props {
    isPending: boolean;
}


const Loader: React.FC<Props> = ({ isPending }) => {
    return (
        <Modal
            open={isPending}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <CircularProgress />
        </Modal>
    )
}

export default Loader