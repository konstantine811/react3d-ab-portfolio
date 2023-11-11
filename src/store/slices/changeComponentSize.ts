import { RootState } from "@store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ChangeComponentSize {
  headerHeight: number;
}

const initialState: ChangeComponentSize = {
  headerHeight: 0,
};

export const changeComponentSizeSlice = createSlice({
  name: "changeComponentSize",
  initialState,
  reducers: {
    onChangeHeaderHeight: (state, action: PayloadAction<number>) => {
      state.headerHeight = action.payload;
    },
  },
});

export const { onChangeHeaderHeight } = changeComponentSizeSlice.actions;

export const headerHeightState = (state: RootState) =>
  state.onChangeComponentSize.headerHeight;

export default changeComponentSizeSlice.reducer;
