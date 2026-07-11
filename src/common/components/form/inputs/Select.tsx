import { useState, useRef, useEffect, useMemo } from 'react';
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
    Popper,
} from '@mui/material';

import { ChevronDown, XCircle, Search } from 'lucide-react';

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
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = useMemo(
        () => options.find((opt) => opt.id == value),
        [options, value]
    );
    const selectedLabel = selectedOption?.label || '';

    const [inputValue, setInputValue] = useState(selectedLabel);

    useEffect(() => {
        setInputValue(selectedLabel);
    }, [selectedLabel]);

    const filteredOptions = useMemo(
        () =>
            options.filter((opt) => {
                if (!inputValue) return true;
                const s = inputValue.toLowerCase();
                return opt.label.toLowerCase().includes(s);
            }),
        [options, inputValue]
    );

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

    const isSelected = (opt: Option) => selectedOption?.id === opt.id;

    return (
        <Box sx={{ position: 'relative', width: '100%', ...sx }} ref={containerRef}>
            <TextField
                placeholder={placeholder}
                value={inputValue}
                onClick={() => setOpen(true)}
                error={error}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setOpen(true);
                }}
                fullWidth
                variant="outlined"
                InputProps={{
                    sx: {
                        cursor: 'pointer',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-sidebar)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                        },
                        '& fieldset': {
                            border: '1px solid var(--color-border)',
                            transition: 'border-color 0.2s ease',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--color-primary)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--color-primary)',
                            borderWidth: '1px',
                        },
                        '& .MuiInputBase-input': {
                            padding: '10px 12px',
                            fontSize: '0.9rem',
                        },
                    },
                    endAdornment: (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 0.5 }}>
                            {clearable && value && (
                                <IconButton
                                    onClick={handleClear}
                                    size="small"
                                    sx={{
                                        color: 'var(--color-text)',
                                        opacity: 0.35,
                                        padding: '2px',
                                        '&:hover': { opacity: 1, color: 'var(--color-error)' },
                                    }}
                                >
                                    <XCircle size={16} />
                                </IconButton>
                            )}
                            <Box
                                sx={{
                                    color: 'var(--color-text)',
                                    opacity: 0.35,
                                    display: 'flex',
                                    transition: 'transform 0.2s ease',
                                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                }}
                            >
                                <ChevronDown size={18} />
                            </Box>
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
                popperOptions={{ strategy: 'fixed' }}
            >
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Paper
                        elevation={2}
                        sx={{
                            maxHeight: 280,
                            overflowY: 'auto',
                            width: '100%',
                            mt: 0.5,
                            borderRadius: '8px',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-sidebar)',
                            '&::-webkit-scrollbar': { width: '5px' },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'var(--color-border)',
                                borderRadius: '4px',
                            },
                        }}
                    >
                        {filteredOptions.length > 0 ? (
                            <List dense disablePadding>
                                {filteredOptions.map((opt) => (
                                    <ListItem
                                        key={opt.id}
                                        disablePadding
                                        onClick={() => handleSelect(opt)}
                                        sx={{
                                            bgcolor: isSelected(opt) ? 'var(--color-primary-soft, rgba(59, 130, 246, 0.06))' : 'transparent',
                                            '&:hover': {
                                                bgcolor: 'var(--color-hover)',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <ListItemButton sx={{ py: 1, px: 1.5 }}>
                                            <ListItemText
                                                primary={opt.label}
                                                primaryTypographyProps={{
                                                    fontSize: '0.88rem',
                                                    fontWeight: isSelected(opt) ? 600 : 400,
                                                    color: 'var(--color-text)',
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Box
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1,
                                    color: 'var(--color-text)',
                                    opacity: 0.4,
                                }}
                            >
                                <Search size={16} />
                                <span style={{ fontSize: '0.85rem' }}>Sin resultados</span>
                            </Box>
                        )}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </Box>
    );
};
