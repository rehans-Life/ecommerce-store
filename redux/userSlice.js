import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      }
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state) => {
  return state.user.user;
};
export default userSlice.reducer;
