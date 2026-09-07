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
                    backgroundColor: 'var(--color-warningSoft)',
                    color: 'var(--color-primary)',
                    '&:hover': {
                        backgroundColor: 'var(--color-warningSoftHover)',
                    },
                }}
            >
                <Users size={16} />
            </Button>
        </Tooltip>
    );
};
