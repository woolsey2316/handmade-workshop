import { MenuItem } from "@mui/material"
interface Props {
  menuName: string
  currOption: string
  thisOption: string
  imageProps?: React.ReactNode
  handleClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}
/* *
 * OptionalMenuItem will not display menu item if it is currently selected
 * */
export const OptionalMenuItem = ({ menuName, currOption, thisOption, imageProps, handleClick }: Props) => {
  return (currOption !== thisOption &&
    <MenuItem
      onClick={
        (event) => { handleClick(event) }
      }>
      <div className="inline-flex items-center gap-2.5 hover:text-ink text-sm">
        {imageProps ? imageProps : null}
        {menuName}
      </div>
    </MenuItem>
  )
}
