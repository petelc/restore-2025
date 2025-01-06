import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from './errorApi';
import { useState } from 'react';

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [triggerGet400Error] = useLazyGet400ErrorQuery();
  const [triggerGet401Error] = useLazyGet401ErrorQuery();
  const [triggerGet404Error] = useLazyGet404ErrorQuery();
  const [triggerGet500Error] = useLazyGet500ErrorQuery();
  const [triggerGetValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerGetValidationError().unwrap();
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
      ) {
        const errorArray = (error as { message: string }).message.split(', ');
        setValidationErrors(errorArray);
      }
    }
  };

  return (
    <Container maxWidth='lg'>
      <Typography gutterBottom variant='h3'>
        About Error Handling
      </Typography>
      <Typography variant='body2'>
        This application demonstrates how to handle various types of errors in a
        Redux Toolkit application.
      </Typography>
      <Typography variant='body2'>
        The following error types are demonstrated:
      </Typography>
      <List>
        <ListItem>400 Bad Request</ListItem>
        <ListItem>401 Unauthorized</ListItem>
        <ListItem>404 Not Found</ListItem>
        <ListItem>500 Server Error</ListItem>
        <ListItem>Validation Error</ListItem>
      </List>
      <ButtonGroup fullWidth>
        <Button
          variant='contained'
          onClick={() => triggerGet400Error().catch((err) => console.log(err))}
        >
          Get 400 Error
        </Button>
        <Button
          variant='contained'
          onClick={() => triggerGet401Error().catch((err) => console.log(err))}
        >
          Get 401 Error
        </Button>
        <Button
          variant='contained'
          onClick={() => triggerGet404Error().catch((err) => console.log(err))}
        >
          Get 404 Error
        </Button>
        <Button
          variant='contained'
          onClick={() => triggerGet500Error().catch((err) => console.log(err))}
        >
          Get 500 Error
        </Button>
        <Button variant='contained' onClick={getValidationError}>
          Get Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity='error' sx={{ my: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error, index) => (
              <ListItem key={index}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
