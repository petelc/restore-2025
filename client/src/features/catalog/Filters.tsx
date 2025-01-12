import { Box, Button, Paper } from '@mui/material';
import Search from './Search';
import RadioButtonGroup from '../../app/store/shared/components/RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { resetParams, setBrands, setOrderBy, setTypes } from './catalogSlice';
import CheckboxButtons from '../../app/store/shared/components/CheckboxButtons';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price: High to Low' },
  { value: 'price', label: 'Price: Low to high' },
];

type Props = {
  filtersData: { brands: string[]; types: string[] };
};

export default function Filters({ filtersData }: Props) {
  const { orderBy, brands, types } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  // if (!data?.brands || !data.types) return <Typography>Loading...</Typography>;

  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Paper>
        <Search />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          items={filtersData.brands}
          checked={brands}
          onChange={(items: string[]) => {
            dispatch(setBrands(items));
          }}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          items={filtersData.types}
          checked={types}
          onChange={(items: string[]) => {
            dispatch(setTypes(items));
          }}
        />
      </Paper>
      <Button onClick={() => dispatch(resetParams())}>Reset Filters</Button>
    </Box>
  );
}
