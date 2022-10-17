import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phoneBookAPI = createApi({
  reducerPath: 'phoneBookAPI',
  tagTypes: ['contacts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62d55684d4406e523558921b.mockapi.io/',
  }),
  endpoints: build => ({
    getContacts: build.query({
      query: () => 'contacts',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'contacts', id })),
              { type: 'contacts', id: 'LIST' },
            ]
          : [{ type: 'contacts', id: 'LIST' }],
    }),
    addContact: build.mutation({
      query: body => ({
        url: 'contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'contacts', id: 'LIST' }],
    }),
    deleteContact: build.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'contacts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = phoneBookAPI;
