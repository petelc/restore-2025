import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

import {
  Divider,
  Typography,
  TableContainer,
  Table,
  TextField,
  Button,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useFetchProductDetailsQuery } from './catalogApi';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useFetchProductDetailsQuery(Number(id));

  if (isLoading || !product) return <div>Loading...</div>;

  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Quantity in stock', value: product.quantityInStock },
  ];

  return (
    <Grid container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
      <Grid size={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              '& td': { fontSize: '1rem' },
            }}
          >
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <Grid size={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in basket'
              fullWidth
              defaultValue={1}
            />
          </Grid>
          <Grid size={6}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              fullWidth
              sx={{ height: '55px' }}
            >
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
