import ProductList from './ProductList';
import { useFetchProductsQuery } from './catalogApi';

export default function Catalog() {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div></div>;

  return (
    <>
      <ProductList products={data} />
    </>
  );
}
