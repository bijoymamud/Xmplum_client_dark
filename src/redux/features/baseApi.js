import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.131:8000/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },


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
        }),

        //login
        loggedIn: builder.mutation({
            query: (userData) =>({
                url: '/users/login/',
                method: "POST",
                body: userData
            })
        }),

        // emailVerification
        emailVarification: builder.mutation({
            query: (email) =>({
                url: "/users/pass-reset-request/",
                method: "POST",
                body: {email}
            })
        }),

        // resendOTP
        resetOTP: builder.mutation({
            query: ({email,otp}) =>({
                url: "/users/reset-request-activate/",
                method: "POST",
                body: {email,otp}   
            })
        }), 

        // change Password
        changePassword: builder.mutation({
            query: (new_passwordd) =>({
                url: "/users/reset-password/",
                method: "POST",
                body: new_passwordd
            })
        }),

        //resend otp
        resendOTP: builder.mutation({
        query: (email) =>({
                url: "/users/resend-otp/",
                method: "POST",
                body: email
            })
        }),

     //loggedIn user profile
     loggeInUser: builder.query({
        query: () => "/users/profile/"
     })
})
});

export const { 
    //authentication
    useCreateUserMutation,
    useSignupOTPMutation,

    // loginData
    useLoggedInMutation,
    
    //mailverification
    useEmailVarificationMutation,
    useResetOTPMutation,
    useChangePasswordMutation,

    // resendOTP
    useResendOTPMutation,

    //loggedInUserInfo
    useLoggeInUserQuery,

} = baseApi;

