import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.131:8000/api/v1',
      

    }),

    tagTypes: ['User'],

    endpoints: (builder) => ({
       
        //authentication
        createUser: builder.mutation({
            query:(userData)=>({
                url: '/users/signup/',
                method: 'POST',
                body: userData,
                providesTags: ['User'],
            })
        }),

        //otp verification
        signupOTP: builder.mutation({
            query: ({email, otp}) =>({
                method: "POST",
                url: '/users/activate/',
                body: {email, otp},
            })
        })

})
});

export const { 
    //authentication
    useCreateUserMutation,
    useSignupOTPMutation,

} = baseApi;

