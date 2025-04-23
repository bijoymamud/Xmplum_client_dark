import { createSlice } from "@reduxjs/toolkit";

const sliceChatPage = createSlice({
  name: "sliceChatPage",
  initialState: {
    botId: 1,
    chatId: null,
    chatList: [],
    selectedChatId: null, // Track the currently selected chat
  },
  reducers: {
    setBotId: (state, action) => {
      state.botId = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatList = [...state.chatList, action.payload];
    },
    addChatMessageMany: (state, action) => {
      state.chatList = [...action.payload];
    },
    clearChatList: (state) => {
      state.chatList = [];
    },
    updateChatMessage: (state, action) => {
      const { id, updatedMessage } = action.payload;
      const index = state.chatList.findIndex((msg) => msg.id === id);
      if (index !== -1) {
        state.chatList[index] = updatedMessage;
      }
    },
  },
});

export const {
  setChatId,
  setBotId,
  setSelectedChatId,
  addChatMessage,
  addChatMessageMany,
  clearChatList,
  updateChatMessage,
} = sliceChatPage.actions;
export default sliceChatPage.reducer;

