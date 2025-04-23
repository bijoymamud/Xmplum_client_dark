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

    tagTypes: ['User', 'History', 'Chat'],


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
     }),

     //get bot

     botList: builder.query({
        query: ()=> "/chat_bot/bot/list/"
     }),

     sendMessage: builder.mutation({
        query: (formData)=>({
            url: "/chat_bot/create-message/",
            method: "POST",
            body: formData
        }),
        invalidatesTags: ['History'],
     }),

     getAllMessage: builder.mutation({
        query: (chatId)=>({
            url: `/chat_bot/get-messages/${chatId}/`,
            method: "GET",
            providesTags: ['Chat']
        })
     }),

     //perticular user chat

     perticularUserChatList: builder.query({
        query: ()=> "/chat_bot/get-chats/",
        providesTags: ['History'],
        pollingInterval: 30000,
     }),

     //getpackage
     getAllPackage: builder.query({
        query: ()=> "/payment/plans/",
     }),

     //payment
     paymentCheckout: builder.mutation({
        query: (planId) =>({
            url: "/payment/create-checkout-session/",
            method: "POST",
            body: {plan_id: planId}
        })
     }),

     //planDetails
     planDetails: builder.query({
        query: ()=>"/payment/user-subscription/"
     }),

     //delete single chat
    deletePerticularChat: builder.mutation({
        query: (chatId) =>({
            url: `/chat_bot/history/${chatId}/delete/`,
            method: "DELETE",
        }),
        invalidatesTags: ['History'],
    }),


     //delete all chat
     deleteAllChat: builder.mutation({
        query: () =>({
            url: "/chat_bot/history/delete/",
            method: "DELETE",
        }),
        invalidatesTags: ['History'],
     }),

     //dashboard
     dashboardInfo: builder.query({
        query: ()=>"/dashboard/info/",
     }),


     getAllUsersInfo: builder.query({
        query: ()=>"/dashboard/users_subscriptions_info/",
        providesTags: ['User'],
     }),

     //deleteuser
     deleteUser: builder.mutation({
        query: (id) =>({
            url: `users/${id}/delete/`,
            method: "DELETE"
        }),
        invalidatesTags: ['User'],
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

    //bot list
    useBotListQuery,

    // sendMessage
    useSendMessageMutation,

    //getAllChats
    useGetAllMessageMutation,

    //perticular user chat
    usePerticularUserChatListQuery,

    //pagkage
    useGetAllPackageQuery,

    //paymentCheckout
    usePaymentCheckoutMutation,
    usePlanDetailsQuery,

    //delete single chat
    useDeletePerticularChatMutation,

    // deleteAllChat
    useDeleteAllChatMutation,

    //dashboard
    useDashboardInfoQuery,
    useGetAllUsersInfoQuery,
    useDeleteUserMutation,


} = baseApi;

