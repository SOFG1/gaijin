import { useDispatch, useSelector } from "react-redux";
import {
  textEditorActualIndexSelector,
  textEditorValuesSelector,
} from "./store/textEditor/selectors";
import { addValue, setActualIndex } from "./store/textEditor/slice";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const dispatch = useDispatch();
  const values = useSelector(textEditorValuesSelector);
  const actualIndex = useSelector(textEditorActualIndexSelector);
  const [value, setValue] = useState("");
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);

  const currentValue = values[actualIndex];

  const setValueDebounced = useDebounce(
    (val: string, b: boolean, i: boolean) => {
      dispatch(addValue({ text: val, bold: b, italic: i }));
    },
    1000
  );

  const handleChange = (val: string, b: boolean, i: boolean) => {
    setValue(val);
    setBold(b);
    setItalic(i);
    setValueDebounced(val, b, i);
  };

  const handleChangeIndex = (index: number) => {
    dispatch(setActualIndex(index));
  };

  useEffect(() => {
    setValue(currentValue?.text || "");
    setItalic(currentValue?.italic || false);
    setBold(currentValue?.bold || false);
  }, [currentValue]);

  return (
    <>
      <h1>Text editor</h1>
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value, bold, italic)}
        style={{
          display: "block",
          minHeight: "120px",
          minWidth: "350px",
          fontFamily: "sans-serif",
          fontSize: "20px",
          fontStyle: italic ? "italic" : "normal",
          fontWeight: bold ? "bold" : "normal",
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
      <button onClick={() => handleChange(value, !bold, italic)}>Bold</button>
      <button onClick={() => handleChange(value, bold, !italic)}>Italic</button>
    </>
  );
}

export default App;
