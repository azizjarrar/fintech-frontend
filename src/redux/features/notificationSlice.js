import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    isVisible: false,
    bg:'bg-primary-dark'
  },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message || "";
      state.isVisible = action.payload.isVisible;
      state.bg = action.payload.bg;

    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
