import { createSlice } from "@reduxjs/toolkit";

const sliceChatPage = createSlice({
    name: 'sliceChatPage',
    //TODO:dynamiclly botid set korte hobe
    initialState: {botId:1, chatId: null, chatList: []},
    reducers: {
        setBotId: (state, action)=>{
            state.botId = action.payload
        },
        setChatId: (state, action)=>{
            state.chatId = action.payload;
        },
        addChatMessage: (state, action) =>{
            state.chatList = [...state.chatList,action.payload]
        },
        addChatMessageMany: (state, action) =>{
            state.chatList = [...action.payload]
        },
        clearChatList: (state) =>{
            state.chatList = []
        },
        
    }
})
export const  {setChatId, setBotId, addChatMessage, addChatMessageMany, clearChatList} = sliceChatPage.actions
export default sliceChatPage.reducer;


