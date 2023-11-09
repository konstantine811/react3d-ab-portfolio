import { configureStore } from "@reduxjs/toolkit";
//
import changeThemeSlice from "@store/slices/changeThemeSlice";

export const store = configureStore({
  reducer: {
    onChangeTheme: changeThemeSlice,
  },
});
