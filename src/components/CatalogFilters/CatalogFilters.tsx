'use client'
import React from 'react'
import { MenuItem, Select } from '@mui/material'

export const CatalogFilters: React.FC = () => {
  return (
      <div>
          <Select>
              <MenuItem value={10}>Genre</MenuItem>
              <MenuItem value={20} />
              <MenuItem value={30}>Thirty</MenuItem>
          </Select>
      </div>
  )
}
