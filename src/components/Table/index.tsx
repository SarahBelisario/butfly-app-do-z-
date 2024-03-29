import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { currencyFormat, dateFormat, dateTimeFormat } from './functions'
import { Row, Column } from './types'

export function TableComponent({
  rows,
  columns,
  fetchMore,
  onClickRow,
  style
}: {
  rows: Row[]
  columns: Column[]
  fetchMore?: () => Promise<void>
  actions?: {
    [field: string]: {
      icon: React.FC<any>
      label: string
      function: (rowData: string) => void
    }
  }
  style?: React.CSSProperties
  onClickRow: (rowData: { [field: string]: string | number }) => void
}) {
  const { palette } = useTheme()
  const [fetchInProgress, setFetchInProgress] = useState(false)
  const ref: any = useRef()

  const onScroll = useDebouncedCallback(event => {
    const target = event.target as HTMLTextAreaElement
    const maxScroll = target.scrollHeight - target.offsetHeight
    const currentScroll = target.scrollTop
    if (!fetchInProgress && fetchMore && maxScroll - currentScroll < 1200) {
      setFetchInProgress(true)
      fetchMore()
        .then(() => setFetchInProgress(false))
        .catch(() => setFetchInProgress(false))
    }
  }, 50)

  const getValue = ({ value, type }: { value?: number | string; type: 'currency' | 'date' | 'datetime' | 'string' }) => {
    const map = {
      currency: (value?: string | number) => currencyFormat(value),
      date: (value?: string | number) => dateFormat(value),
      datetime: (value?: string | number) => dateTimeFormat(value),
      string: (value?: string | number) => value
    }
    if (!map[type]) return value
    return map[type](value)
  }

  return (
    <TableContainer onScroll={onScroll} ref={ref} style={{ ...style, height: '100%' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              if (column.hidden) return
              return (
                <TableCell key={index} sx={{ background: palette.background.paper }}>
                  {column.label}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} onClick={() => onClickRow(row)}>
              {columns.map((column, index) => {
                if (column.hidden) return
                return (
                  <TableCell key={index} sx={{ color: palette.text.primary }}>
                    {column.type ? getValue({ value: row[column.field], type: column.type }) : row[column.field]}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
          {!rows.length && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography fontSize={20}>Whoops</Typography>
                Não há dados para serem exibidos.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
