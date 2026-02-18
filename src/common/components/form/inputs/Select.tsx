import { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ClickAwayListener,
    IconButton,
    useTheme,
    Popper,
} from '@mui/material';

import { ChevronDown, ChevronUp, XCircle } from 'lucide-react';

interface Option {
    id: string | number;
    label: string;
}

interface MainSelectProps {
    label?: string;
    options?: Option[];
    value: string | number | null;
    handleChange?: (value: string | number | null) => void;
    placeholder?: string;
    error?: boolean;
    sx?: any;
    clearable?: boolean;
    toNumber?: boolean;
}

export const MainSelect = ({
    label,
    options = [],
    value,
    handleChange,
    placeholder,
    error = false,
    sx = {},
    clearable = false,
    toNumber = true,
}: MainSelectProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.id == value);
    const selectedLabel = selectedOption?.label || '';

    const [inputValue, setInputValue] = useState(selectedLabel);

    useEffect(() => {
        setInputValue(selectedLabel);
    }, [selectedLabel]);

    const filteredOptions = options.filter((opt) => {
        if (!inputValue) return true;
        const s = inputValue.toLowerCase();
        const match = opt.label.toLowerCase().includes(s);
        return match;
    });

    const handleSelect = (option: Option) => {
        const id = option.id;
        const newId = toNumber && !isNaN(Number(id)) ? Number(id) : id;

        handleChange?.(newId);
        setOpen(false);
        setInputValue(option.label);
    };

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        if (containerRef.current && containerRef.current.contains(event.target as Node)) {
            return;
        }

        setOpen(false);
        setInputValue(selectedLabel);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleChange?.(null);
        setInputValue('');
        setOpen(false);
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', ...sx }} ref={containerRef}>
            <TextField
                label={label}
                placeholder={placeholder}
                value={inputValue}
                onClick={() => {
                    setOpen(true);
                }}
                error={error}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setOpen(true);
                }}
                fullWidth
                variant="outlined"
                InputProps={{
                    sx: { cursor: 'pointer' },
                    endAdornment: (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {clearable && value && (
                                <IconButton onClick={handleClear} size="small" sx={{ color: theme.palette.error.main }}>
                                    <XCircle size={20} />
                                </IconButton>
                            )}
                            {open ? <ChevronUp /> : <ChevronDown />}
                        </Box>
                    ),
                }}
            />

            <Popper
                open={open}
                anchorEl={containerRef.current}
                placement="bottom-start"
                sx={{
                    zIndex: 99999999999,
                    width: containerRef.current?.clientWidth,
                }}
                popperOptions={{
                    strategy: 'fixed',
                }}
            >
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Paper
                        elevation={3}
                        sx={{
                            maxHeight: 400,
                            overflowY: 'auto',
                            width: '100%',
                            mt: 1,
                        }}
                    >
                        {filteredOptions.length > 0 ? (
                            <List dense>
                                {filteredOptions.map((opt) => (
                                    <ListItem
                                        key={opt.id}
                                        disablePadding
                                        onClick={() => handleSelect(opt)}
                                        sx={{
                                            bgcolor: selectedOption?.id === opt.id ? theme.palette.action.selected : 'inherit',
                                            '&:hover': {
                                                bgcolor: theme.palette.action.hover,
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={opt.label} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Box sx={{ p: 2, color: theme.palette.text.secondary, textAlign: 'center' }}>
                                Sin resultados
                            </Box>
                        )}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </Box>
    );
};

