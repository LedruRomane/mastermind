import { useState } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { ColorsState, PlayControls } from '@app/components/PlayControls.tsx';
import { Colors } from '@app/components/Colors.ts';
import { HistoryRow } from '@app/components/HistoryRow.tsx';

export interface Step {
  playerMove: PlayerMove
  responseMove: ResponseMove
}

export type PlayerMove = [
    string,
    string,
    string,
    string,
]

type ResponseMove = [
  boolean | null,
  boolean | null,
  boolean | null,
  boolean | null,
]

export default function Home() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const combinaisonToFind = [Colors.BLACK, Colors.RED, Colors.BLUE, Colors.GREEN]; //todo: randomize
  const [history, setHistory] = useState<Step[]>([]);


  function resetGame () {
    setHistory([]);
    setGameStarted(false);
  }

  function startGame () {
    setGameStarted(true);
  }

  function processPlayerMove (colors: ColorsState) {
    const responseMove: ResponseMove = [null, null, null, null];

    // color correct and well-placed : true
    // color correct but not well-placed : false
    // color incorrect : null
    colors.map((color, index) => {
      if (color === combinaisonToFind[index]) {
        responseMove[index] = true;
      } else if (color && combinaisonToFind.includes(color)) {
        responseMove[index] = false;
      }
    });

    setHistory(previous => {
        const historyTemp = [...previous];
        historyTemp.push({
            playerMove: colors as PlayerMove,
            responseMove: responseMove,
        });
        return historyTemp as Step[];
    });
  }

  return <>
    <Box>
      <Button
        onClick={startGame}
      >Start Game</Button>
      <Button
        onClick={resetGame}
      >Reset Game</Button>
    </Box>

  {gameStarted && <Box id="game">
    {history && history.map((step, index) => {
      return <HistoryRow key={index} step={step}/>
    })}
    <Divider/>
    <PlayControls processPlayerMove={processPlayerMove}/>
  </Box>}
  </>
}

