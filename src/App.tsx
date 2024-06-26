import { useDispatch, useSelector } from "react-redux";
import { textEditorValueSelector } from "./store/textEditor/selectors";
import { addValue } from "./store/textEditor/slice";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const dispatch = useDispatch();
  const values = useSelector(textEditorValueSelector);
  const [value, setValue] = useState("");
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);

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

  useEffect(() => {
    setValue(values[values.length - 1]?.text || "");
    setItalic(values[values.length - 1]?.italic || false);
    setBold(values[values.length - 1]?.bold || false);
  }, [values]);

  console.log(values);

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
      <button>Undo</button>
      <button>Redo</button>
      <button onClick={() => handleChange(value, !bold, italic)}>Bold</button>
      <button onClick={() => handleChange(value, bold, !italic)}>Italic</button>
    </>
  );
}

export default App;
