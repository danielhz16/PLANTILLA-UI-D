
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { type Config } from '../utils/types';
import { useGetQuery } from '@/common/hooks/api/useGetQuery';

interface HistoryRecord {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

interface HistoryProps {
  open: boolean;
  onClose: () => void;
  config: Config;
  rowData?: Record<string, any>;
}

export default function History({
  open,
  onClose,
  config,
  rowData,
}: HistoryProps) {
  const historyConfig = config.historyConfig;
  const itemId = config.id || rowData?.id;
  const url = `/history/${config.table}/${itemId}`;

  const { data, isLoading } = useGetQuery<HistoryRecord[]>(
    url,
    `history-${config.table}-${itemId}`,
    open && !!historyConfig && !!itemId
  );

  const historyData = data || [];

  if (!historyConfig) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Bitácora de Cambios</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : historyData.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Fecha y Hora</TableCell>
                  <TableCell>Acción</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Detalles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {dayjs(record.timestamp).format('DD/MM/YYYY HH:mm:ss')}
                    </TableCell>
                    <TableCell>{record.action}</TableCell>
                    <TableCell>{record.user}</TableCell>
                    <TableCell>{record.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box py={4} textAlign="center">
            <Typography color="textSecondary">
              No hay registros en la bitácora
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
