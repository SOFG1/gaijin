export type EditorValueType = {
    bold: boolean
    italic: boolean
    text: string
}



export interface ITextEditorState {
    values: EditorValueType[]
    actualIndex: number
}