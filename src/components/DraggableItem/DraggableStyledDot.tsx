import StyledDot from '@app/components/DraggableItem/StyledDot.tsx';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { Box } from '@mui/material';
import { memo, useMemo } from 'react';
import { Colors } from '@app/components/Colors.ts';

interface Props {
  color: string
}

export const DraggableStyledDot = memo(

  function DraggableStyledDot({color}: Props) {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: color,
        collect: (monitor: DragSourceMonitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [color],
    );

    const colorDot = useMemo(() => {
      switch (color) {
        case Colors.BLUE:
          return 'lightblue';
        case Colors.YELLOW:
          return 'lightgoldenrodyellow';
        case Colors.WHITE:
          return 'white';
        case Colors.BLACK:
          return 'black';
        case Colors.GREEN:
          return 'green';
        case Colors.RED:
          return 'red';
      }
    }, [color]);

    const DotStyle = useMemo(
      () => ({
        colorDot,
        opacity: isDragging ? 0.4 : 1,
      }),
      [isDragging],
    )

    return <Box ref={drag} role="SourceBox" data-color={color}>
      {DotStyle.colorDot &&
        <StyledDot index={DotStyle.colorDot} color={DotStyle.colorDot} opacity={DotStyle.opacity}/>
      }
    </Box>


  }
)
