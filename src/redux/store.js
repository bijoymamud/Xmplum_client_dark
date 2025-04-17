import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './features/baseApi'
import sliceChatPage from './state/sliceChatPage'


export const store = configureStore({
  reducer: {
    
    [baseApi.reducerPath]: baseApi.reducer,
    chatpage:sliceChatPage
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})


