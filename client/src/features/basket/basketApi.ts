import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';
import { Basket, Item } from '../../app/models/basket';
import { Product } from '../../app/models/product';

// ? Type guard to check if the product is an Item
function isBasketItem(product: Product | Item): product is Item {
  return (product as Item).quantity !== undefined;
}

export const basketApi = createApi({
  reducerPath: 'basketApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Basket'],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => 'basket',
      providesTags: ['Basket'],
    }),
    // ? The addBasketItem mutation takes a product and a quantity as arguments
    addBasketItem: builder.mutation<
      Basket,
      { product: Product | Item; quantity: number }
    >({
      query: ({ product, quantity }) => {
        const productId = isBasketItem(product)
          ? product.productId
          : product.id;
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: 'POST',
        };
      },
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        let isNewBasket = false;
        const patchResult = dispatch(
          basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
            const productId = isBasketItem(product)
              ? product.productId
              : product.id;

            if (!draft?.basketId) isNewBasket = true;

            if (!isNewBasket) {
              const existingItem = draft?.items.find(
                (item) => item.productId === productId
              );
              if (existingItem) existingItem.quantity += quantity;
              else
                draft?.items.push(
                  isBasketItem(product)
                    ? product
                    : { ...product, productId: product.id, quantity }
                );
            }
          })
        );

        try {
          await queryFulfilled;
          if (isNewBasket) {
            dispatch(basketApi.util.invalidateTags(['Basket']));
          }
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    //? The removeBasketItem mutation takes a productId and a quantity as arguments
    removeBasketItem: builder.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
            const itemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              if (draft.items[itemIndex].quantity <= 0) {
                draft.items.splice(itemIndex, 1);
              }
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;
