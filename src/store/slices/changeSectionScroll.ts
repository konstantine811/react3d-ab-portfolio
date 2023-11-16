import { RootState } from "@store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SectionIds } from "@models/pageSection.model";

export interface ChangeSectionScroll {
  currentSection: SectionIds;
}

const initialState: ChangeSectionScroll = {
  currentSection: SectionIds.intro,
};

export const changeSectionScrollSlice = createSlice({
  name: "changeComponentSize",
  initialState,
  reducers: {
    onChangeSectionScroll: (state, action: PayloadAction<SectionIds>) => {
      state.currentSection = action.payload;
    },
  },
});

export const { onChangeSectionScroll } = changeSectionScrollSlice.actions;

export const currentSectionState = (state: RootState) =>
  state.onChangeSectionScroll.currentSection;

export default changeSectionScrollSlice.reducer;
