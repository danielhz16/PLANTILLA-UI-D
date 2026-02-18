import { Box, Typography } from "@mui/material";

export const Title: React.FC<{ title?: string, children?: React.ReactNode }> = ({ title, children }) => {
    return (
        <Box sx={{ width: "100%", display: "flex", color: "var(--color-text)"}}>
            {title && <Typography variant="h4" sx={{ fontWeight: "bold" }} marginRight="auto">{title}</Typography>}
            <Box sx={{ marginLeft: "auto" }}>
                {children}
            </Box>
        </Box>
    )
}