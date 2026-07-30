import { Button, type ButtonProps, styled } from '@mui/material';

const CrystalButton = styled(Button)(() => ({
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px var(--color-shadowCard)',
   
    padding: '10px 24px',
    textTransform: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    gap: '8px',
    minWidth: 'auto',

    '&.Mui-disabled': {
        background: 'var(--color-hover)',
        opacity: 0.4,
        color: 'var(--color-text) !important',
        border: '1px solid var(--color-border)',
        filter: 'grayscale(0.5)',
    },
}));


export const MainButton = (props: ButtonProps) => {
    return (
        <CrystalButton {...props} color={props.color || 'primary'}>
            {props.children}
        </CrystalButton>
    );
};

export default MainButton;
