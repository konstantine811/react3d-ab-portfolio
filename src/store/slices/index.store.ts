import { configureStore } from "@reduxjs/toolkit";
//
import onChangeTheme from "@store/slices/changeThemeSlice";
import onChangeComponentSize from "@store/slices/changeComponentSize";
import onChangeSectionScroll from "@store/slices/changeSectionScroll";

export const store = configureStore({
  reducer: {
    onChangeTheme,
    onChangeComponentSize,
    onChangeSectionScroll,
  },
});
