import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { decrement, increment } from './counterReducer';
import { Button, ButtonGroup, Typography } from '@mui/material';

export default function ContactPage() {
  const { data } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant='h2'>Contact Page</Typography>
      <Typography variant='body2'>The data is: {data}</Typography>
      <ButtonGroup>
        <Button
          variant='outlined'
          color='error'
          onClick={() => dispatch(decrement(1))}
        >
          Decrement
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => dispatch(increment(1))}
        >
          Increment
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => dispatch(increment(5))}
        >
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
