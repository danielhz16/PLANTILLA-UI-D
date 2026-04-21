import { Menu, MenuItem, Button, CircularProgress, ListItemIcon, ListItemText } from '@mui/material';
import { Eye, Pencil, History as HistoryIcon, ChevronDown } from 'lucide-react';
import type { Config } from './utils/types';
import { UpdateStatus } from './status/UpdateStatus';
import History from './history/History';
import { useOptions } from './useOptions';

interface OptionsCellProps {
  config: Config;
  rowData?: Record<string, any>;
}

export default function OptionsCell({ config, rowData }: OptionsCellProps) {
  const {
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
  } = useOptions(config);

  return (
    <>
      <Button
        id="options-button"
        aria-controls={open ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        endIcon={<ChevronDown size={16} />}
        sx={{
          fontSize: '14px',
          textTransform: 'none',
          padding: '4px 8px',
          color: 'var(--color-text)',
          '&:hover': {
            backgroundColor: 'var(--color-hover)',
            color: 'var(--color-primary)'
          }
        }}
      >
        Opciones
      </Button>

      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 160,
            borderRadius: 2,
          }
        }}
      >
        {showHistoryOption && (
          <MenuItem onClick={handleShowHistory}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <HistoryIcon size={16} />
            </ListItemIcon>
            <ListItemText
              primary="Bitácora"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        )}

        {showStatusOption && (
          <UpdateStatus config={config} onCloseMenu={handleClose} />
        )}

        <MenuItem onClick={handleEdit} disabled={loading}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : config.enabledEdit ? (
              <Pencil size={16} />
            ) : (
              <Eye size={16} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={config.enabledEdit ? 'Editar' : 'Ver'}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        {config.additionalItems?.map((item, index) => (
          <MenuItem
            key={`additional-item-${index}`}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
            disabled={item.disabled}
          >
            {item.icon && (
              <ListItemIcon sx={{ minWidth: 32, color: item.color || 'inherit' }}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ variant: 'body2', sx: { color: item.color, fontWeight: 500 } }}
            />
          </MenuItem>
        ))}
      </Menu>

      {showHistory && (
        <History
          open={showHistory}
          onClose={() => setShowHistory(false)}
          config={config}
          rowData={rowData}
        />
      )}
    </>
  );
}
