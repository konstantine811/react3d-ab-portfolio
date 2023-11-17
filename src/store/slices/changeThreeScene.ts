import { RootState } from "@store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Vector3 } from "three";

export interface ChangeThreeSceneSlice {
  cameraPosition: Vector3;
}

const initialState: ChangeThreeSceneSlice = {
  cameraPosition: new Vector3(0, 0, 0),
};

export const changeThreeSceneSlice = createSlice({
  name: "threeSceneSlice",
  initialState,
  reducers: {
    onChangeCameraPosition: (state, action: PayloadAction<Vector3>) => {
      state.cameraPosition = action.payload;
    },
  },
});

export const { onChangeCameraPosition } = changeThreeSceneSlice.actions;

export const cameraPosition = (state: RootState) =>
  state.onChangeThreeScene.cameraPosition;

export default changeThreeSceneSlice.reducer;
