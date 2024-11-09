import { apiSlice } from "../services/api.slice";

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder: { query: (arg0: { query: () => { url: string; method: string; }; }) => any; mutation: (arg0: { query: (data: any) => { url: string; method: string; body: any; }; }) => any; }) => ({
    getEmployees: builder.query({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    createEmployee: builder.mutation({
      query: (data: any) => ({
        url: "/employees",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLazyGetEmployeesQuery, useCreateEmployeeMutation } = employeeApi;
