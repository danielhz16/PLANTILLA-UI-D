import { useState } from 'react';
import type { Config } from './utils/types';

export const useOptions = (config: Config) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showHistory, setShowHistory] = useState(false);
    const [loading, setLoading] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = async () => {
        handleClose();
        setLoading(true);
        try {
            if (config.onEdit) {
                await Promise.resolve(config.onEdit());
            }
        } finally {
            setLoading(false);
        }
    };

    const handleShowHistory = () => {
        handleClose();
        setShowHistory(true);
    };

    const showStatusOption = config.enabledEdit && config.statusConfig?.enabled;
    const showHistoryOption = config.enabledEdit && config.historyConfig?.enabled;

    return {
        open,
        anchorEl,
        handleClick,
        handleClose,
        handleEdit,
        loading,
        showHistory,
        setShowHistory,
        handleShowHistory,
        showStatusOption,
        showHistoryOption
    };
};
