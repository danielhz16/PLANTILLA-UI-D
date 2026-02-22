import { Box } from "@mui/material";
import { Inbox } from "lucide-react";

export const NoData = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      height='100%'
      width='100%'
      sx={{ userSelect: 'none' }}
      color='var(--color-text)'
    >
      <Inbox size={60} strokeWidth={1.5} />
      <span>NO HAY DATOS</span>
    </Box>
  );
};
