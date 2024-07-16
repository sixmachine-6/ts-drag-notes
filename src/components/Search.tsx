import React from "react";

interface Props {
  note: string;
  renderNote: { id: number; note: string }[];
  setNote: React.Dispatch<React.SetStateAction<string>>;
  setRenderNote: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        note: string;
      }[]
    >
  >;
}

export const Search: React.FC<Props> = ({
  note,
  setNote,
  renderNote,
  setRenderNote,
}) => {
  function handleAddNotes() {
    if (!note) return;
    const newNote = {
      id: renderNote.length,
      note,
    };
    setRenderNote([...renderNote, newNote]);
    setNote("");
  }
  return (
    <div className="flex justify-center items-center gap-3 p-3">
      <textarea
        className="bg-zinc-300 border-2 border-green-300 rounded-md p-1 focus:outline-none text-slate-600"
        value={note}
        placeholder="Write Notes"
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={handleAddNotes}
        className="bg-red-300  p-2 text-stone-600 text-semibold rounded-lg"
      >
        Add Note
      </button>
    </div>
  );
};
