import { Box, Typography, Divider } from '@mui/material';
import type { DetailField } from '@/common/types/details';

interface Props {
    fields: DetailField[];
    data: Record<string, unknown>;
}

export const DetailsView: React.FC<Props> = ({ fields, data }) => {
    return (
        <Box sx={{
            padding: 2,
        }}>
            {fields.map((field, index) => {
                const raw = data[field.name];
                const rendered = field.value ? field.value(raw) : raw;
                const displayValue = rendered !== null && rendered !== undefined && rendered !== ''
                    ? String(rendered)
                    : '—';
                const Icon = field.icon;

                return (
                    <Box key={field.name}>
                        {index > 0 && (
                            <Divider sx={{ borderColor: 'var(--color-border)', opacity: 0.4, my: 2 }} />
                        )}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2.5,
                        }}>
                            {Icon && (
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    bgcolor: 'var(--color-primarySoft)',
                                    color: 'var(--color-primary)',
                                }}>
                                    <Icon size={18} />
                                </Box>
                            )}
                            <Box sx={{ flex: 1, minWidth: 0, pt: Icon ? 0.5 : 0 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'var(--color-text-secondary)',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.65rem',
                                        display: 'block',
                                        mb: 0.3,
                                    }}
                                >
                                    {field.label}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'var(--color-text)',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.5,
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {displayValue}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default DetailsView;
