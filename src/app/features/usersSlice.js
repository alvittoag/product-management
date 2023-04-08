import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logedinUser: "",
  allUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addRegister: (state, action) => {
      state.allUsers.push(action.payload);
    },
    addLogin: (state, action) => {
      state.logedinUser = action.payload;
    },
    addUsersApi: (state, action) => {
      if (state.allUsers.length === 0) {
        state.allUsers = action.payload;
      }
    },
  },
});

export const { addRegister, addLogin, addUsersApi } = usersSlice.actions;

export default usersSlice.reducer;
