import { apiSlice } from "../services/api.slice";

export const assetApi = apiSlice.injectEndpoints({
  endpoints: (builder: { query: (arg0: { query: () => { url: string; method: string; }; }) => any; mutation: (arg0: { query: ((data: any) => { url: string; method: string; body: any; }) 
  | (({ employeeId, assetId }: { employeeId: any; assetId: any; }) => { url: string; method: string; })}) => any; }) => ({
    getAssets: builder.query({
      query: () => ({
        url: "/assets",
        method: "GET",
      }),
    }),
    createAsset: builder.mutation({
      query: (data: any) => ({
        url: "/assets",
        method: "POST",
        body: data,
      }),
    }),


    assignAssetToEmployee: builder.mutation({
      query: ({ employeeId, assetId }) => ({
        url: `/assets/${assetId}/assign/${employeeId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useLazyGetAssetsQuery } = assetApi;
export const { useCreateAssetMutation } = assetApi;
export const { useAssignAssetToEmployeeMutation } = assetApi;
export const { useGetUnAssignedAssets } =assetApi;