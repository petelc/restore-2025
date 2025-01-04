import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { uiSlice } from '../layout/uiSlice';

const customeBaseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5001/api',
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(uiSlice.actions.startLoading());
  await sleep();
  const result = await customeBaseQuery(args, api, extraOptions);
  api.dispatch(uiSlice.actions.stopLoading());

  if (result.error) {
    // ? show error
    const { status, data } = result.error;
    console.log(status, data);
  }

  return result;
};
