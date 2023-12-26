import { Box } from '@mui/material';


export interface Props {
  index: string
  color: string
  opacity?: number
}

export default function StyledDot({ index, color, opacity }: Props) {
  return (
    <Box id={index}
      borderRadius="50%"
      border={1}
      width={30}
      height={30}
      bgcolor={color}
      sx={{opacity}}
    >
    </Box>
  )
}
