import { Box } from "@mui/material"
import { EditCell } from "../edit-cell/EditCell"
import { UserCell } from "../users-cell/UsersCell"

export const OptionsSecondary = ({ id, select, toolTipUsers, to }: {id: number, select: Function, toolTipUsers: string, to: string}) => {
  return (
    <Box display='flex'>
      <EditCell to={to} />
      <UserCell tooltip={toolTipUsers} select={() => select(id)} />
    </Box>
  )
}
