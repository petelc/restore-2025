import { Grid2, Typography } from '@mui/material';
import ProductList from './ProductList';
import { useFetchFiltersQuery, useFetchProductsQuery } from './catalogApi';
import Filters from './Filters';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import AppPagination from '../../app/store/shared/components/AppPagination';
import { setPageNumber } from './catalogSlice';

export default function Catalog() {
  const productParams = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filtersData, isLoading: filtersLoading } =
    useFetchFiltersQuery();

  if (isLoading || !data || filtersLoading || !filtersData) return <div></div>;

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filtersData={filtersData} />
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination
              metadata={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        ) : (
          <Typography variant='h5'>No products found</Typography>
        )}
      </Grid2>
    </Grid2>
  );
}
