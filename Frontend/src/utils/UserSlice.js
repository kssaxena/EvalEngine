import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
