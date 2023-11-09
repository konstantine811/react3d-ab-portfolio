import { RootState } from "@store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "@models/theme.model";

export interface CursorState {
  themeType: ThemeType;
}

const initialState: CursorState = {
  themeType: ThemeType.dark,
};

export const changeThemeSlice = createSlice({
  name: "themeChange",
  initialState,
  reducers: {
    onChangeTheme: (state, action: PayloadAction<ThemeType>) => {
      state.themeType = action.payload;
    },
  },
});

export const { onChangeTheme } = changeThemeSlice.actions;

export const themeTypeState = (state: RootState) =>
  state.onChangeTheme.themeType;

export default changeThemeSlice.reducer;
