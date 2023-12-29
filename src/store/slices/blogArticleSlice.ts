import { RootState } from "@store/store";
import { createSlice } from "@reduxjs/toolkit";
// models
import { IBlog } from "@models/blog.model";

export interface BlogArcticleSlice {
  blogMenuItems: IBlog.MenuItems[];
  isBlogMenuLoading: boolean;
  blogArtcleEntity: { [key: string]: IBlog.BlogArticle[] };
  isBlogArticleLoading: boolean;
}

const initialState: BlogArcticleSlice = {
  blogMenuItems: [],
  isBlogMenuLoading: false,
  blogArtcleEntity: {},
  isBlogArticleLoading: false,
};

export const blogArticleSlice = createSlice({
  name: "blogArticle",
  initialState,
  reducers: {},
});

export const {} = blogArticleSlice.actions;

export const blogArticleState = (state: RootState) => state.onBlogArticle;

export default blogArticleSlice.reducer;
