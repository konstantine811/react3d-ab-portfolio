import { configureStore } from "@reduxjs/toolkit";
//
import onChangeTheme from "@store/slices/changeThemeSlice";
import onChangeComponentSize from "@store/slices/changeComponentSize";
import onChangeSectionScroll from "@store/slices/changeSectionScroll";
import onChangeThreeScene from "@store/slices/changeThreeScene";
import onBlogArticle from "@store/slices/blogArticleSlice";

export const store = configureStore({
  reducer: {
    onChangeTheme,
    onChangeComponentSize,
    onChangeSectionScroll,
    onChangeThreeScene,
    onBlogArticle,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
