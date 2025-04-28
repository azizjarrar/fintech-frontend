import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./features/notificationSlice";

const store = configureStore({
  reducer: {
    notification:notificationsSlice,
  },
});

export default store;
