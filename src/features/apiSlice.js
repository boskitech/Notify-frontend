import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://nottifyserver.herokuapp.com/api/users'}),
    tagTypes: ['User'],
    endpoints: builder => ({
        getUsers: builder.query({
            query:() => '/getusers',
            providesTags: ['User']
        }),
        addNewUser: builder.mutation({
            query: initialUser => ({
                url: '/register',
                method: 'POST',
                body: initialUser
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: initialUser => ({
                url: '/login',
                method: 'POST',
                body: initialUser
            }),
            invalidatesTags: ['User']
        }),
        getUser: builder.query({
            query: userID => `/getuser/${userID}`
        }),
    })
})

export const { useGetUsersQuery, useAddNewUserMutation, useLoginUserMutation, useGetUserQuery } = apiSlice