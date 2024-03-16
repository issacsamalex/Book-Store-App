import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUsers, setUser } = usersSlice.actions;
