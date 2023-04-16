import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { setShowSidebar } = sidebarSlice.actions;

export const selectShowSidebar = (state) => {
  return state.sidebar.showSidebar;
};

export default sidebarSlice.reducer;
