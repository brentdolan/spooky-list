import React from 'react'
import { Table as MUITable, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import styles from './Table.module.scss'

interface TableProps {
  headers: Array<{ field: string, headerName: string }>
  rows: Array<Record<string, any>>
}

export const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
      <TableContainer className={styles.tableContainer}>
          <MUITable>
              <TableHead>
                  <TableRow>
                      {headers.map(header => (
                          <TableCell key={header.field}>{header.headerName}</TableCell>
                      ))}
                  </TableRow>
              </TableHead>
              <TableBody>
                  {rows.map(row => (
                      <TableRow key={row.id}>
                          {headers.map(header => (
                              <TableCell key={String(row.id) + header.field}>
                                  {row[header.field]}
                              </TableCell>
                          ))}
                      </TableRow>
                  ))}
              </TableBody>
          </MUITable>
      </TableContainer>
  )
}
