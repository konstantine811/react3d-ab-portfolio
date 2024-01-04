import { RootState } from "@store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// models
import { LangType } from "@models/lang.model";
// helpers
import { getBrowserLanguage } from "@helpers/lange";

export interface ChangeLanguageSlice {
  lang: LangType;
}

const initialState: ChangeLanguageSlice = {
  lang: getBrowserLanguage(),
};

export const changeLangSlice = createSlice({
  name: "languageSlice",
  initialState,
  reducers: {
    onChangeLanguage: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload;
    },
  },
});

export const { onChangeLanguage } = changeLangSlice.actions;

export const currentLanguage = (state: RootState) =>
  state.onChangeLanguage.lang;

export default changeLangSlice.reducer;
