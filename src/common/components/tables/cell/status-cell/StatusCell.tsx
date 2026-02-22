import { Box } from "@mui/material"


export const StatusCell = ({ status }: { status: number }) => {
    return (
       <Box sx={{
          backgroundColor: status == 1 ? 'var(--color-success)' : 'var(--color-error)',
          display: 'grid',
          placeItems: 'center',
          width: 60,
          color: '#fff',
            borderRadius: 1,
            padding: '2px 0',
            fontSize: 12,
            fontWeight: 'bold'
       }}>
        {
           status == 1 ? 'Activo' : 'Inactivo'
        }
       </Box>
    )
}