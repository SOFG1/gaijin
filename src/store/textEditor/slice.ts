import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITextEditorState } from "./types";

// Define the initial state using that type
const initialState: ITextEditorState = {
  value: "",
};

export const textEditor = createSlice({
  name: "textEditor",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = textEditor.actions;

export default textEditor.reducer;
