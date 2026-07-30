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
                                backgroundColor: 'var(--color-warningSoft)',
                                color: 'var(--color-warning)',
                                '&:hover': {
                                    backgroundColor: 'var(--color-warningSoftHover)',
                                },
                            }}
                        >
                            <Edit size={16} />
                        </Button>
            </Link>
        </Tooltip>
    );
};
