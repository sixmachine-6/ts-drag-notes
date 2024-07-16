import React, { createRef, useEffect, useRef } from "react";
import { NotesList } from "./NotesList";

interface RenderNotes {
  renderNote: { id: number; note: string }[];
  setRenderNote: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        note: string;
      }[]
    >
  >;
}
export const Notes: React.FC<RenderNotes> = ({ renderNote, setRenderNote }) => {
  const LIRef = useRef<(React.RefObject<HTMLLIElement> | null)[]>([]);
  useEffect(
    function () {
      const localStorageNotes: {
        id: number;
        note: string;
        position: { x: number; y: number };
      }[] = JSON.parse(localStorage.getItem("notes") || `[]`);

      const updatedNotes = renderNote.map((note) => {
        const existingNote = localStorageNotes.find((el) => el.id === note.id);

        if (existingNote) {
          return { ...note, position: existingNote.position };
        }
        return {
          ...note,
          position: {
            x: `${Math.floor(Math.random() * (window.innerWidth - 250))}px`,
            y: `${Math.floor(Math.random() * (window.innerHeight - 250))}px`,
          },
        };
      });
      setRenderNote(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    },
    [renderNote.length, setRenderNote]
  );

  function handleDragEnd(
    note: { id: number; note: string; position?: { x: number; y: number } },
    ev: React.MouseEvent<HTMLLIElement>
  ) {
    const currentRef = LIRef.current[note.id]?.current;
    if (!currentRef) return;
    const rect = currentRef?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = ev.clientX - rect.left;
    const offsetY = ev.clientY - rect.top;

    const startPos = note.position;

    const handleMouseMove = (ev: any) => {
      const newX = ev.clientX - offsetX;
      const newY = ev.clientY - offsetY;

      currentRef.style.left = `${newX}px`;
      currentRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      const finalRect = currentRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkForOverlap(note.id)) {
        // check for overlap
        currentRef.style.left = `${startPos?.x}px`;
        currentRef.style.top = `${startPos?.y}px`;
      } else {
        updateNotePosition(note.id, newPosition);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const checkForOverlap = (id: number) => {
    const currentNoteRef = LIRef.current[id]?.current;
    const currentRect = currentNoteRef?.getBoundingClientRect();

    return renderNote.some((note): boolean => {
      if (note.id === id) return false;

      const otherNoteRef = LIRef.current[note.id]?.current;
      const otherRect = otherNoteRef?.getBoundingClientRect();

      if (currentRect && otherRect) {
        return !(
          currentRect.right < otherRect.left ||
          currentRect.left > otherRect.right ||
          currentRect.bottom < otherRect.top ||
          currentRect.top > otherRect.bottom
        );
      } else return false;
    });
  };

  const updateNotePosition = (
    id: number,
    newPosition: { x: number; y: number }
  ): void => {
    const updatedNotes = renderNote.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setRenderNote(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  function handleDelete(id: number) {
    const leftNotes = renderNote.filter((note) => note.id !== id);
    setRenderNote(leftNotes);
  }

  return (
    <ul>
      {renderNote.map((note) => (
        <NotesList
          ref={
            LIRef.current[note.id]
              ? LIRef.current[note.id]
              : (LIRef.current[note.id] = createRef<HTMLLIElement>())
          }
          note={note}
          key={note.id}
          onMouseDown={(ev) => handleDragEnd(note, ev)}
          onDelete={() => handleDelete(note.id)}
        />
      ))}
    </ul>
  );
};
