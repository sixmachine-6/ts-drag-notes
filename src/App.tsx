import { useState } from "react";
import { Search } from "./components/Search";
import { Notes } from "./components/Notes";

function App() {
  const [note, setNote] = useState("");
  const [renderNote, setRenderNote] = useState([
    { id: 0, note: "Add Note then drag & drop" },
  ]);

  return (
    <div className="h-screen bg-stone-200">
      <Search
        note={note}
        setNote={setNote}
        setRenderNote={setRenderNote}
        renderNote={renderNote}
      />
      <Notes renderNote={renderNote} setRenderNote={setRenderNote} />
    </div>
  );
}

export default App;
