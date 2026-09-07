import Card from "@mui/material/Card";

export const MainCard = ({children, sx}: {children: React.ReactNode, sx?: any}) => {
    return (
        <Card sx={{ p: 2, borderRadius: '10px', backgroundColor: 'var(--color-bgCard)', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px var(--color-shadowCard)', ...sx }}>
            {children}
        </Card>
    );
};
export default MainCard;
