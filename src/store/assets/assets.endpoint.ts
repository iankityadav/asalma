import { apiSlice } from "../services/api.slice";

export const assetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => ({
        url: "/assets",
        method: "GET",
      }),
    }),
    createAsset: builder.mutation({
      query: (data) => ({
        url: "/assets",
        method: "POST",
        body: data,
      }),
    }),
    assignAssetToEmployee: builder.mutation({
      query: ({ employeeId, assetId }) => ({
        url: `/assets/${assetId}/assign/${employeeId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLazyGetAssetsQuery } = assetApi;
