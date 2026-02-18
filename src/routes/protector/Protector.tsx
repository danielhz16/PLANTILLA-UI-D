import { Box } from "@mui/material";

const NotAccess = () => {
    return (
        <Box>
            <h1>No tienes acceso</h1>
        </Box>
    )
}


interface ProtectorProps {
    component: React.ComponentType<any>;
}

const Protector = ({ component: Component }: ProtectorProps) => {
    const access = true;
    return (
        <>
            {access ? <Component /> : <NotAccess />}
        </>
    )
}

export default Protector