import { useDispatch, useSelector } from "react-redux";
import {
  textEditorActualIndexSelector,
  textEditorValuesSelector,
} from "./store/textEditor/selectors";
import { addValue, setActualIndex } from "./store/textEditor/slice";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { EditorValueType } from "./store/textEditor/types";
import { compareEditorValues } from "./utils/compareEditorValues";

function App() {
  const dispatch = useDispatch();
  const values = useSelector(textEditorValuesSelector);
  const actualIndex = useSelector(textEditorActualIndexSelector);
  const currentValue = values[actualIndex];
  const [value, setValue] = useState<EditorValueType>(currentValue);

  const setValueDebounced = useDebounce(
    (val: EditorValueType) => {
      dispatch(addValue(val));
    },
    1500
  );

  const handleChange = (key: keyof EditorValueType, val: string | boolean) => {
    setValue((p) => {
      const newVal = { ...p, [key]: val };
      setValueDebounced(newVal);
      return newVal;
    });
  };

  const handleChangeIndex = (index: number) => {
    dispatch(setActualIndex(index));
  };


  useEffect(() => {
    setValue(p => {
      const isDifferent = compareEditorValues(p, currentValue)
      if(isDifferent) return currentValue
      return p
    })
  }, [currentValue])

  return (
    <>
      <h1>Text editor</h1>
      <textarea
        value={value.text}
        onChange={(e) => handleChange("text", e.target.value)}
        style={{
          display: "block",
          minHeight: "120px",
          minWidth: "350px",
          fontFamily: "sans-serif",
          fontSize: "20px",
          fontStyle: value.italic ? "italic" : "normal",
          fontWeight: value.bold ? "bold" : "normal",
        }}
      />
      <button
        disabled={actualIndex < 1}
        onClick={() => handleChangeIndex(actualIndex - 1)}
      >
        Undo
      </button>
      <button
        disabled={actualIndex + 1 === values.length}
        onClick={() => handleChangeIndex(actualIndex + 1)}
      >
        Redo
      </button>
      <button onClick={() => handleChange("bold", !value.bold)}>Bold</button>
      <button onClick={() => handleChange("italic", !value.italic)}>Italic</button>
    </>
  );
}

export default App;
