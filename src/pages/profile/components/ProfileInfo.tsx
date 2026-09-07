import { Box } from "@mui/material";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { InfoCard } from "@/components/cards/InfoCard";
import type { UserProfile } from "@/features/auth";

interface Props {
    user: UserProfile;
}

export const ProfileInfo = ({ user }: Props) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <InfoCard
                label="Correo electrónico"
                value={user.email}
                icon={Mail}
            />
        </Box>
        <Box sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <InfoCard
                label="Teléfono"
                value={user.phone || '—'}
                icon={Phone}
            />
        </Box>
    </Box>
);
