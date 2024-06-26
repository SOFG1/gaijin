import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditorValueType, ITextEditorState } from "./types";

// Define the initial state using that type
const initialState: ITextEditorState = {
  values: [],
};

export const textEditor = createSlice({
  name: "textEditor",
  initialState,
  reducers: {
    addValue: (state, action: PayloadAction<EditorValueType>) => {
      state.values.push(action.payload)
    },
  },
});

export const { addValue } = textEditor.actions;

export default textEditor.reducer;
