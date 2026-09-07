import React from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl } from '@mui/material';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    itemsPerPageOptions?: number[];
    showItemsPerPage?: boolean;
    showInfo?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    itemsPerPageOptions = [10, 20, 50, 100],
    showItemsPerPage = true,
    showInfo = true,
}) => {
    const handleFirstPage = () => {
        if (currentPage > 1) {
            onPageChange(1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        if (currentPage < totalPages) {
            onPageChange(totalPages);
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
                p: 2,
                borderRadius: '16px',
                backgroundColor: 'var(--color-sidebar)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--color-border)',
            }}
        >
            {showInfo && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'var(--color-text)',
                            opacity: 0.8,
                            fontSize: '0.875rem',
                        }}
                    >
                        Mostrando {startItem} - {endItem} de {totalItems} resultados
                    </Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                    sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: '10px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-text)',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                            borderColor: 'var(--color-primary)',
                        },
                        '&:disabled': {
                            opacity: 0.5,
                        },
                    }}
                >
                    <ChevronsLeft size={18} />
                </Button>

                <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: '10px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-text)',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                            borderColor: 'var(--color-primary)',
                        },
                        '&:disabled': {
                            opacity: 0.5,
                        },
                    }}
                >
                    <ChevronLeft size={18} />
                </Button>

                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <Box
                                    key={`ellipsis-${index}`}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--color-text)',
                                        opacity: 0.5,
                                    }}
                                >
                                    <Typography variant="body2">...</Typography>
                                </Box>
                            );
                        }

                        const pageNum = page as number;
                        const isActive = pageNum === currentPage;

                        return (
                            <Button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                sx={{
                                    minWidth: 40,
                                    height: 40,
                                    borderRadius: '10px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: isActive
                                        ? 'var(--color-primary)'
                                        : 'var(--color-background)',
                                    color: isActive ? 'white' : 'var(--color-text)',
                                    fontWeight: isActive ? 700 : 500,
                                    '&:hover': {
                                        backgroundColor: isActive
                                            ? 'var(--color-primary)'
                                            : 'var(--color-hover)',
                                        borderColor: 'var(--color-primary)',
                                        transform: 'translateY(-1px)',
                                    },
                                }}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}
                </Box>

                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: '10px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-text)',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                            borderColor: 'var(--color-primary)',
                        },
                        '&:disabled': {
                            opacity: 0.5,
                        },
                    }}
                >
                    <ChevronRight size={18} />
                </Button>

                <Button
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                    sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: '10px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-text)',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                            borderColor: 'var(--color-primary)',
                        },
                        '&:disabled': {
                            opacity: 0.5,
                        },
                    }}
                >
                    <ChevronsRight size={18} />
                </Button>
            </Box>

            {showItemsPerPage && onItemsPerPageChange && (
                <FormControl
                    size="small"
                    sx={{
                        minWidth: 120,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: 'var(--color-background)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text)',
                            '&:hover': {
                                borderColor: 'var(--color-primary)',
                            },
                            '&.Mui-focused': {
                                borderColor: 'var(--color-primary)',
                            },
                        },
                    }}
                >
                    <Select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        sx={{
                            color: 'var(--color-text)',
                            '& .MuiSelect-icon': {
                                color: 'var(--color-text)',
                            },
                        }}
                    >
                        {itemsPerPageOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option} por página
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Box>
    );
};

export default Pagination;
