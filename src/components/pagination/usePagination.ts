import { useState, useMemo } from 'react';

interface UsePaginationProps {
    totalItems: number;
    initialPage?: number;
    initialItemsPerPage?: number;
}

export const usePagination = ({
    totalItems,
    initialPage = 1,
    initialItemsPerPage = 10,
}: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / itemsPerPage);
    }, [totalItems, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const paginatedData = <T,>(data: T[]): T[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleItemsPerPageChange,
        paginatedData,
    };
};
