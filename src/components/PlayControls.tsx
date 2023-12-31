import { Box, Button } from '@mui/material';
import { DroppableZone } from '@app/components/DroppableZone/DroppableZone.tsx';
import { DraggableStyledDot } from '@app/components/DraggableItem/DraggableStyledDot.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useState } from 'react';

export type ColorsState = [
  string | null,
  string | null,
  string | null,
  string | null
]

interface Props {
  processPlayerMove: (colors: ColorsState) => void
}

export function PlayControls({ processPlayerMove }: Props) {
  const [colors, setColors] = useState<ColorsState>([null, null, null, null]);

  function resetColors() {
    setColors([null, null, null, null]);
  }

  return <Box margin={3}>
    <DndProvider backend={HTML5Backend}>
      <Box id="droppable-zone" display="flex" flexDirection="row" justifyContent="center">
        {colors.map(((color, index) => <DroppableZone key={index} color={color} onChangedColor={
            color => {
              setColors(previousColors => {
                const colorsTemp = [...previousColors];
                colorsTemp[index] = color;
                return colorsTemp as ColorsState;
              });
            }
        }/>))}
      </Box>
      <Box id="draggable-items" display="flex" flexDirection="row" justifyContent="center">
        <DraggableStyledDot color="red" />
        <DraggableStyledDot color="blue" />
        <DraggableStyledDot color="green" />
        <DraggableStyledDot color="yellow" />
        <DraggableStyledDot color="black" />
        <DraggableStyledDot color="white" />
        <Box id="interact">
          <Button onClick={() => {
            processPlayerMove(colors);
            resetColors();
          }}>
            Valider
          </Button>
          <Button onClick={resetColors}>
            Reset
          </Button>
        </Box>
      </Box>

    </DndProvider>
  </Box>
}
