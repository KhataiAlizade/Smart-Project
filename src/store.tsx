import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userReducer";
const store = configureStore({
  reducer: {
    users: UserSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;