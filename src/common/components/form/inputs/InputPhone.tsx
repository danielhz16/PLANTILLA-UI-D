import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { TextField } from '@mui/material';

export const InputPhone = ({ value, handleChange, ...rest }: any) => {
    const PhoneInputComponent = PhoneInput as any;
    return (
        <div className="custom-phone-input">
            <PhoneInputComponent
                defaultCountry="gt"
                value={value}
                onChange={handleChange}
                inputComponent={TextField}
                inputProps={{
                    ...rest,
                    fullWidth: true,
                }}
            />
        </div>
    );
};
