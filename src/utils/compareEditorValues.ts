import { EditorValueType } from "../store/textEditor/types";




export const compareEditorValues = (firstVal: EditorValueType, secondVal: EditorValueType) => {
    return JSON.stringify(firstVal) === JSON.stringify(secondVal)
}