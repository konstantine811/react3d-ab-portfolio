import { configureStore } from "@reduxjs/toolkit";
//
import changeThemeSlice from "@store/slices/changeThemeSlice";
import changeComponentSize from "@store/slices/changeComponentSize";

export const store = configureStore({
  reducer: {
    onChangeTheme: changeThemeSlice,
    onChangeComponentSize: changeComponentSize,
  },
});
