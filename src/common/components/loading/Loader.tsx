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
          backgroundColor: "rgba(255,255,255,0.55)",
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
            color: "#2563eb",
          }}
        />
      </Box>
    </Modal>
  );
};

export default Loader;