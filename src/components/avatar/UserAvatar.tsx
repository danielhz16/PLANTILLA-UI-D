import { Avatar, type SxProps } from "@mui/material";

const getInitials = (name: string) =>
    name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

interface Props {
    name: string;
    size?: number;
    fontSize?: string;
    sx?: SxProps;
}

export const UserAvatar = ({ name, size = 40, fontSize = '0.9rem', sx }: Props) => (
    <Avatar
        sx={{
            width: size,
            height: size,
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            fontWeight: 700,
            fontSize,
            ...sx,
        }}
    >
        {getInitials(name)}
    </Avatar>
);
