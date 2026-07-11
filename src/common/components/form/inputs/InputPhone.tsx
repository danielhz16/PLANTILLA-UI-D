import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export const InputPhone = ({ value, handleChange, disabled }: any) => {
    return (
        <div className="custom-phone-input">
            <PhoneInput
                defaultCountry="gt"
                value={value || ''}
                onChange={(phone) => {
                    handleChange?.(phone);
                }}
                disabled={disabled}
                disableDialCodePrefill={true}
            />
        </div>
    );
};
