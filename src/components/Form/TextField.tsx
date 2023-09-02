import { styled } from '@mui/system'
import { TextField as MuiTextField } from '@mui/material'

export const TextField = styled(MuiTextField)(() => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    borderBottom: 'none',
    '&:before, &:after': {
      borderBottom: '0px solid transparent !important'
    }
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: 'var(--grimaceLight)',
    border: '2px solid',
    borderColor: 'var(--black-cat)',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    fontFamily: 'var(--primaryFont)',
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      border: '2px solid var(--black-cat)',
      boxShadow: '4px 4px var(--slime)'
    }
  }
}))
