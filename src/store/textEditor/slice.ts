import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditorValueType, ITextEditorState } from "./types";
import { initialValue } from "./constants";
import { compareEditorValues } from "../../utils/compareEditorValues";

const cacheSize = 20; //Maximum cached values

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
      const newValue = action.payload;
      const lastValue = state.values[state.values.length - 1];
      const valuesEqual = compareEditorValues(newValue, lastValue);
      if (valuesEqual) return; //Nothing to change
      state.actualIndex++;
      state.values = state.values.slice(0, state.actualIndex);
      state.values.push(newValue);
      //Crop values size according to cache size
      if (state.values.length > cacheSize) {
        state.values.shift();
        state.actualIndex--;
      }
    },
    setActualIndex: (state, action: PayloadAction<number>) => {
      state.actualIndex = action.payload;
    },
  },
});

export const { addValue, setActualIndex } = textEditor.actions;

export default textEditor.reducer;
