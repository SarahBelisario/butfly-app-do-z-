import { Button, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import { useState } from 'react'
import { IoChevronDown, IoFilter } from 'react-icons/io5'
import { FilterPopper } from './FilterPopper'

export function FilterButton() {
  const { palette } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)

  function onOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button sx={{ background: '#fff', flexGrow: 0.5, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)', height: 46, px: 1.5 }} onClick={onOpen}>
        <IoFilter color={palette.text.primary} />
        <Typography color={palette.text.primary} fontSize={14} mx={1}>
          Filtrar
        </Typography>
        <IoChevronDown style={{ marginLeft: 4 }} color={palette.text.primary} />
      </Button>
      <FilterPopper isOpen={isOpen} setIsOpen={setIsOpen} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  )
}
