import { memo, useCallback, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import StyledDot from '@app/components/DraggableItem/StyledDot.tsx';
import { Colors } from '@app/components/Colors.ts';
import { Box } from '@mui/material';

interface Item {
  type: string
}

export interface TargetBoxProps {
  onDrop: (item: any) => void
  lastDroppedColor?: string
}

const TargetBox = memo(
  function TargetBox({
    onDrop,
    lastDroppedColor,
  }: TargetBoxProps) {
    const [{ isOver }, drop] = useDrop(
      () => ({
        accept: [
          Colors.YELLOW,
          Colors.BLUE,
          Colors.GREEN,
          Colors.RED,
          Colors.BLACK,
          Colors.WHITE,
        ],
        drop(_item: Item, monitor) {
          onDrop(monitor.getItemType())
          return undefined
        },
        collect: (monitor: DropTargetMonitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          draggingColor: monitor.getItemType() as string,
        }),
      }),
      [onDrop],
    )

    return (
      <Box ref={drop}>
        <StyledDot color={lastDroppedColor ?? '#fff'} index={lastDroppedColor ?? ''} opacity={
          isOver ? 0.7 : 1
        }/>
      </Box>
    )
  });

export function DroppableZone() {
  const [lastDroppedColor, setLastDroppedColor] = useState<string | null>(null)
  const handleDrop = useCallback(
    (color: string) => setLastDroppedColor(color),
    [],
  )

  console.log(lastDroppedColor)

  return (
    <TargetBox
      lastDroppedColor={lastDroppedColor as string}
      onDrop={handleDrop}
    />
  )
}