import { Box } from "@mui/material"
import { EditCell } from "../edit-cell/EditCell"
import { UserCell } from "../users-cell/UsersCell"
import DetailsCell from "../details-cell/DetailsCell"

export const OptionsSecondary = ({ id, select, toolTipUsers, to, data  }: {id: number, select: Function, toolTipUsers: string, to: string, data: Record<string, any>}) => {
  
  
  return (
    <Box display='flex'>
      <EditCell to={to} />
      <UserCell tooltip={toolTipUsers} select={() => select(id)} />
      <DetailsCell data={data} title="Detalles de la empresa" />
    </Box>
  )
}
