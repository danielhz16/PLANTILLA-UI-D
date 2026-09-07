import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';


export const PasswordInput = ({ value, handleChange, ...rest }: any) => {
    const [visible, setVisible] = useState(false);

    const toggle = () => setVisible(v => !v);

    return (
        <TextField
            {...rest}
            type={visible ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={toggle} edge="end" size="small">
                            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            fullWidth
            variant="outlined"
        />
    );
};
