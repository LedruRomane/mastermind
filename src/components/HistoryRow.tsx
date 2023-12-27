import { Box, Grid } from '@mui/material';
import { Step } from '@app/pages/Home.tsx';
import StyledDot from '@app/components/DraggableItem/StyledDot.tsx';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface Props {
  step: Step
}
export function HistoryRow({ step }: Props) {
  const responseMoveShuffled = shuffle(step.responseMove);
  return (
    <Grid id="step" container direction="row" justifyContent="center" alignItems="center" padding={3}>
      <Box id="playerMove" display="flex" flexDirection="row" justifyContent="center">
        {step.playerMove.map((color, index) => {
          return <StyledDot
            key={index}
            color={color}
            radius={30}
          />
        })}
      </Box>
      <Box>
        {responseMoveShuffled.map((reponse, index) => {
          return <StyledDot
            key={index}
            color={reponse === true ? 'black' : reponse === false ? 'white' : 'grey'}
            radius={10}
          />
        })}
      </Box>
      {!isSuccessful(step.responseMove) && <NoEncryptionGmailerrorredIcon color="error" />}
      {isSuccessful(step.responseMove) && <LockOpenIcon color="success" />}
    </Grid>
  )
}
function isSuccessful(responseMove: Step['responseMove']) {
    return responseMove.every(response => response === true);
}

function shuffle(array: [
    boolean | null,
    boolean | null,
    boolean | null,
    boolean | null
]) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
