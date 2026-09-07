import { Box, Typography, type SxProps } from "@mui/material";

export const Title: React.FC<{ title?: string, children?: React.ReactNode, sx?: SxProps }> = ({ title, children, sx = {} }) => {
    return (
        <Box sx={{ width: "100%", display: "flex", color: "var(--color-text)", ...sx}}>
            {title && <Typography variant="h4" sx={{ fontWeight: "bold" }} marginRight="auto">{title}</Typography>}
            <Box sx={{ marginLeft: "auto", display: "flex", gap: 2, alignItems: "center" }}>
                {children}
            </Box>
        </Box>
    )
}
