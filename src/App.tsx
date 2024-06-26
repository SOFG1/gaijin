import { useDispatch, useSelector } from "react-redux";
import { textEditorValueSelector } from "./store/textEditor/selectors";
import { setValues } from "./store/textEditor/slice";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const dispatch = useDispatch();
  const values = useSelector(textEditorValueSelector);
  const [value, setValue] = useState("");

  const setValueDebounced = useDebounce((val: string) => {
     dispatch(setValues(val));
  }, 1000);

  const handleChange = (val: string) => {
    setValue(val);
    setValueDebounced(val);
  };

  useEffect(() => {
    setValue(values[values.length - 1] || "")
  }, [values])

  return (
    <>
      <h1>Text editor</h1>
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        style={{ display: "block", minHeight: "70px" }}
      />
      <button>Undo</button>
      <button>Redo</button>
      <button>Bold</button>
      <button>Italic</button>
    </>
  );
}

export default App;
