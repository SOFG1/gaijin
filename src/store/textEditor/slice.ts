import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditorValueType, ITextEditorState } from "./types";


const initialValue: EditorValueType = {
  text: "",
  bold: false,
  italic: false,
}

// Define the initial state using that type
const initialState: ITextEditorState = {
  values: [initialValue],
  actualIndex: 0,
};

export const textEditor = createSlice({
  name: "textEditor",
  initialState,
  reducers: {
    addValue: (state, action: PayloadAction<EditorValueType>) => {
      const lastValue = state.values[state.values.length - 1];
      const valuesDifferent =
        JSON.stringify(action.payload) !== JSON.stringify(lastValue);
      if (valuesDifferent) {
        state.actualIndex++
        state.values = state.values.slice(0, state.actualIndex)
        state.values.push(action.payload);
      }
    },
    setActualIndex: (state, action: PayloadAction<number>) => {
      state.actualIndex = action.payload;
    },
  },
});

export const { addValue, setActualIndex } = textEditor.actions;

export default textEditor.reducer;
