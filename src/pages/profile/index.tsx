import { Box } from "@mui/material";
import { Title } from "@/components/layout/Title/Title";
import { useAuthStore } from "@/features/auth";
import { ProfileHeader, ProfileInfo } from "./components";
import AuthConfig from "./components/AuthConfig";

const Profile = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Title title="Mi perfil" />
            <ProfileHeader user={user} />
            <ProfileInfo user={user} />
            <AuthConfig />
        </Box>
    );
};

export default Profile;
