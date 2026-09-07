import { CircularProgress, Modal, Box } from "@mui/material";

interface Props {
  isPending: boolean;
}

const Loader: React.FC<Props> = ({ isPending }) => {
  return (
    <Modal
      open={isPending}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
      closeAfterTransition
      BackdropProps={{
        sx: {
          backgroundColor: "var(--color-loaderBackdrop)",
          backdropFilter: "blur(2px)",
        },
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "none",
      }}
    >
      <Box
        sx={{
          outline: "none",
          border: "none",
          bgcolor: "transparent",
          display: "flex",
        }}
      >
        <CircularProgress
          size={45}
          thickness={4}
          sx={{
            color: "var(--color-primary)",
          }}
        />
      </Box>
    </Modal>
  );
};

export default Loader;
