import { Box } from "@mui/material";
import { Inbox, SearchX } from "lucide-react";
import type React from "react";

interface Props {
  name?: string,
  isFetched?: boolean,
  emptyLabel?: string,
  filterLabel?: string,
}

export const NoData: React.FC<Props> = ({ 
  isFetched,
  name,
  emptyLabel,
  filterLabel
}) => {
  const message = isFetched 
    ? (emptyLabel || 'NO HAY DATOS') 
    : (filterLabel || `Usa los filtros para listar ${name || 'datos'}`)

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      height='100%'
      width='100%'
      sx={{ 
        userSelect: 'none',
        py: 6,
        opacity: 0.55,
      }}
      color='var(--color-text)'
    >
      {isFetched ? <Inbox size={60} strokeWidth={1.5} /> : <SearchX size={60} strokeWidth={1.5} />}
      <span style={{ fontSize: '1rem', fontWeight: 600 }}>{message}</span>
    </Box>
  );
};
