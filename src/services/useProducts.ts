import useSWR from 'swr';
import {ProductType} from '../App.types'
import { getProducts, addProduct } from '../api/clientAPI';

const useFetchedProducts = () => {
  const { data, error, mutate } = useSWR('getProducts', getProducts);

  const products = data || []
  const isLoading = !error && !data
  const setProducts = mutate

  return { products, setProducts, error, isLoading };
};

export const useProducts = () => {
  const { products, error, isLoading, setProducts } = useFetchedProducts();

  const updateProducts = (product: ProductType) => {
    const productsCopy = products.slice();
    productsCopy.concat(product);
    setProducts(productsCopy);
  };
  const addItem = (product: ProductType) => {
    addProduct(product)
      .then(updateProducts)
      .catch(error =>
        alert(
          `There was a problem updating this product.\n` +
          `Please try again later.\n\n` +
          `(${error.toString()})`
        )
      );
  };

  return { products, error, isLoading, addItem };
};