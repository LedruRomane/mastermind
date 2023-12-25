import { useState } from 'react';
import { Box, Button } from '@mui/material';

interface Step {
  playerMove: Array<Colors>
  responseMove: Array<string>
}

enum Colors {
  Red = 'Rouge',
  Black = 'Noir',
  Yellow = 'Jaune',
  Blue = 'Bleu',
  Green = 'Vert',
  White = 'Blanc',
}

export default function Home() {
  const [history, setHistory] = useState<Step[]>([]);
  const [playerMove, setPlayerMove] = useState<Array<Colors>>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const combinaisonToFind = [Colors.Black, Colors.Red, Colors.Blue, Colors.Green];


  function resetGame () {
    setHistory([]);
    setPlayerMove([]);
    setGameStarted(false);
  }

  function startGame () {
    setGameStarted(true);
  }

  function toggleColorToPlayerMove (color: Colors) {
    if (playerMove.includes(color)) {
        setPlayerMove(playerMove.filter((c) => c !== color));
        return;
    }
    if (playerMove.length < 4) {
      setPlayerMove([...playerMove, color]);
    }
    return;
  }

  function resetPlayerMove () {
    setPlayerMove([]);
  }

  function processPlayerMove () {
    let responseMoveTemp = [];

    for (let i = 0; i < playerMove.length; i++) {
        if (playerMove[i] === combinaisonToFind[i]) {
          responseMoveTemp.push('Couleur correcte et bien placée');
        } else if (combinaisonToFind.includes(playerMove[i])) {
          responseMoveTemp.push('Couleur correcte mais mal placée');
        }
        else {
          responseMoveTemp.push('Couleur incorrecte');
        }
    }
    return {
      playerMove: playerMove,
      responseMove: responseMoveTemp,
    }
  }

  return <>
  {gameStarted && <Box id="game">

    {history && <Box>
        <Box>
            <Box>Historique</Box>
            <Box>
            {history.map((step, index) => {
                return <Box key={index}>
                    <Box>Combinaison du joueur</Box>
                  {step.playerMove.map((color, index) => {
                    return <Box key={index}>{color}</Box>
                  })}
                    <Box>Combinaison de la réponse</Box>
                  {step.responseMove?.map((response, index) => {
                    return <Box key={index}>{response}</Box>
                  })}
                </Box>
            })}
            </Box>
        </Box>
    </Box>
    }
      <Box>
        <Box>
          <Box>Combinaison à trouver</Box>
          <Box>
            <Box>{playerMove[0]}</Box>
            <Box>{playerMove[1]}</Box>
            <Box>{playerMove[2]}</Box>
            <Box>{playerMove[3]}</Box>
          </Box>
        </Box>
      </Box>

      <Box id="interaction">
        <Button id="red" onClick={
          () => toggleColorToPlayerMove(Colors.Red)
        }>Rouge</Button>
        <Button id="black" onClick={
          () => toggleColorToPlayerMove(Colors.Black)
        }>Noir</Button>
        <Button id="yellow" onClick={
          () => toggleColorToPlayerMove(Colors.Yellow)
        }>Jaune</Button>
        <Button id="blue" onClick={
          () => toggleColorToPlayerMove(Colors.Blue)
        }>Bleu</Button>
        <Button id="green" onClick={
          () => toggleColorToPlayerMove(Colors.Green)
        }>Vert</Button>
        <Button id="white" onClick={
          () => toggleColorToPlayerMove(Colors.White)
        }>Blanc</Button>
        <Button onClick={resetPlayerMove}>Reset ma combinaison.</Button>
        <Button onClick={() => {
          setHistory([...history, processPlayerMove()]);
          resetPlayerMove();
          console.log({ history });
          }}>Valider ma combinaison.</Button>
      </Box>
    </Box>}

    <Box>
      <Button
        onClick={startGame}
      >Start Game</Button>
      <Button
        onClick={resetGame}
      >Reset Game</Button>
    </Box>

  </>
}

