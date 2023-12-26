import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Box } from '@mui/material';


export interface Props {
  index: string
  color: string
  opacity?: number
}

export default function StyledDot({ index, color, opacity }: Props) {
  return (
    <Box id={index}>
      <CircleRoundedIcon
        sx={{color: color}}
        width={5}
        height={5}
        opacity={opacity}
      />
    </Box>
  )
}
