import { RootStateType } from "..";
import { EditorValueType } from "./types";


export const textEditorValueSelector = (state: RootStateType): EditorValueType[] => state.textEditor.values