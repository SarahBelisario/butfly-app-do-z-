import { useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

export default function TableComponent() {
  const { palette } = useTheme()
  const rows = []
  for (let i = 1; i < 50; i++) {
    rows.push({
      id: i,
      name: 'Jose',
      calories: '1',
      fat: '1',
      carbs: '1',
      protein: '1'
    })
  }

  return (
    <TableContainer sx={{ height: '100%' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ background: palette.background.paper }}>Nome</TableCell>
            <TableCell sx={{ background: palette.background.paper }} align="right">Calories</TableCell>
            <TableCell sx={{ background: palette.background.paper }} align="right">Fat&nbsp;(g)</TableCell>
            <TableCell sx={{ background: palette.background.paper }} align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell sx={{ background: palette.background.paper }} align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
