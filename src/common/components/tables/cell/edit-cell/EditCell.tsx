import { Link } from "react-router";
import { Button, Tooltip } from "@mui/material";
import { Edit } from "lucide-react";


export const EditCell = ({ to }: {to: string}) => {
   
    return (
        <Tooltip title='Editar'>
            <Link to={to}>
             <Button
                            size="small"
                            sx={{
                                minWidth: 36,
                                height: 36,
                                borderRadius: '8px',
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                color: '#f59e0b',
                                '&:hover': {
                                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                                },
                            }}
                        >
                            <Edit size={16} />
                        </Button>
            </Link>
        </Tooltip>
    );
};

