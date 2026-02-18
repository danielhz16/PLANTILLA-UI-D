import { Box } from "@mui/material";

export const Espace = ({ space }: { space: number }) => {
    return (
        <Box sx={{ marginBlock: `${space / 2}rem` }}></Box>
    );
};