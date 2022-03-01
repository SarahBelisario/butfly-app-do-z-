import {
  ClickAwayListener,
  Fade,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  PopperProps
} from '@mui/material';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

interface ActionsPopperProps extends Omit<PopperProps, 'open'> {
  popperIsOpen: boolean
  setPopperIsOpen: (value: boolean) => void
  anchorEl: any
}

export function ActionsPopper({ popperIsOpen, setPopperIsOpen, anchorEl, ...props }: ActionsPopperProps) {

  return (
    <Popper open={popperIsOpen} anchorEl={anchorEl} transition placement="bottom-start" {...props}>
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={() => setPopperIsOpen(false)}>
          <Fade {...TransitionProps}>
            <Paper >
              <MenuList autoFocus>
                <MenuItem><MdEdit style={{ marginRight: 12 }} />Editar</MenuItem>
                <MenuItem sx={{ color: 'red' }} ><AiFillDelete style={{ marginRight: 12 }} />Deletar</MenuItem>
              </MenuList>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}</Popper>
  )
}
