import { RootStateType } from "..";
import { EditorValueType } from "./types";


export const textEditorValuesSelector = (state: RootStateType): EditorValueType[] => {
    return state.textEditor.values
}


export const textEditorActualIndexSelector = (state: RootStateType): number => {
    return state.textEditor.actualIndex
}