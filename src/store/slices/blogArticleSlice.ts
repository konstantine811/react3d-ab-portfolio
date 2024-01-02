import { RootState } from "@store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// models
import { IBlog } from "@models/blog.model";

export interface BlogArcticleSlice {
  blogMenuItems: IBlog.MenuItems[];
}

const initialState: BlogArcticleSlice = {
  blogMenuItems: [],
};

export const blogArticleSlice = createSlice({
  name: "blogArticle",
  initialState,
  reducers: {
    onChangeBlogMenuItems: (
      state,
      action: PayloadAction<IBlog.MenuItems[]>
    ) => {
      state.blogMenuItems = action.payload;
    },
  },
});

export const { onChangeBlogMenuItems } = blogArticleSlice.actions;

export const blogMenuItemsState = (state: RootState) =>
  state.onBlogArticle.blogMenuItems;

export default blogArticleSlice.reducer;
