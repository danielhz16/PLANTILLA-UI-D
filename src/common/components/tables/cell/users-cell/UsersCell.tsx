import { Button, Tooltip } from "@mui/material";
import { Users } from "lucide-react";

export interface PropsUserCell {
    select: () => void;
    tooltip: string
}

export const UserCell: React.FC<PropsUserCell> = ({ select, tooltip }) => {
    return (
        <Tooltip title={tooltip}>
            <Button
                onClick={() => select()}
                size="small"
                sx={{
                    minWidth: 36,
                    height: 36,
                    borderRadius: '8px',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    color: '#0b9ff5e0',
                    '&:hover': {
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    },
                }}
            >
                <Users size={16} />
            </Button>
        </Tooltip>
    );
};
