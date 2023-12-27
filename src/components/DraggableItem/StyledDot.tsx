import { Box } from '@mui/material';


export interface Props {
  color: string
  opacity?: number
  radius: number
}

export default function StyledDot({ color, opacity, radius }: Props) {
  return (
    <Box
      borderRadius="50%"
      border="0.5px solid grey"
      width={radius}
      height={radius}
      bgcolor={color}
      sx={{opacity}}
      margin="0.8px"
    >
    </Box>
  )
}
