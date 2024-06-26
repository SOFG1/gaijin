import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITextEditorState } from "./types";

// Define the initial state using that type
const initialState: ITextEditorState = {
  values: [],
};

export const textEditor = createSlice({
  name: "textEditor",
  initialState,
  reducers: {
    setValues: (state, action: PayloadAction<string>) => {
      state.values.push(action.payload)
    },
  },
});

export const { setValues } = textEditor.actions;

export default textEditor.reducer;
