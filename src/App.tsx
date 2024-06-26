import { useDispatch, useSelector } from "react-redux";
import { textEditorValueSelector } from "./store/textEditor/selectors";
import { setValue } from "./store/textEditor/slice";

function App() {
  const value = useSelector(textEditorValueSelector);

  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    dispatch(setValue(value));
  };

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
