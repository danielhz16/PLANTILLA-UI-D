import Card from "@mui/material/Card";

export const MainCard = ({children, sx}: {children: React.ReactNode, sx?: any}) => {
    return (
        <Card sx={{ p: 2, borderRadius: '10px', backgroundColor: 'var(--color-background)', ...sx }}>
            {children}
        </Card>
    );
};
export default MainCard;
