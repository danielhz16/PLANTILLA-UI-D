import { Box, Typography } from "@mui/material";
import { MainCard } from "@/components/cards/MainCard";
import { UserAvatar } from "@/components/avatar/UserAvatar";
import type { UserProfile } from "@/features/auth";

interface Props {
    user: UserProfile;
}

export const ProfileHeader = ({ user }: Props) => (
    <MainCard sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <UserAvatar name={user.fullName} size={72} fontSize="1.5rem" />
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text)' }}>
                    {user.fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text)', opacity: 0.7 }}>
                    {user.email}
                </Typography>
            </Box>
        </Box>
    </MainCard>
);
