import React, { forwardRef, useState } from "react";
import { TiArrowMinimise, TiArrowMaximise, TiPin } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
interface NoteProps {
  note: { id: number; note: string; position?: { x: number; y: number } };
  onMouseDown: (e: React.MouseEvent<HTMLLIElement>) => void;
  onDelete: () => void;
}

export const NotesList = forwardRef<HTMLLIElement, NoteProps>(
  ({ note, onMouseDown, onDelete }, ref) => {
    const [minMax, setMinMax] = useState<boolean>(true);
    return (
      <li
        ref={ref}
        style={{
          position: "absolute",
          top: `${note.position?.y}px`,
          left: `${note.position?.x}px`,
        }}
        onMouseDown={onMouseDown}
        className="bg-green-300 p-3 rounded-lg hover:cursor-move"
      >
        <div className="flex justify-end gap-2">
          <TiArrowMinimise
            onClick={() => setMinMax(false)}
            className="text-2xl bg-green-500 rounded-full p-1 hover:cursor-pointer"
          />
          <TiArrowMaximise
            onClick={() => setMinMax(true)}
            className="text-2xl bg-yellow-400 rounded-full p-1 hover:cursor-pointer"
          />
          <RxCross1
            onClick={onDelete}
            className="text-2xl bg-red-400 rounded-full p-1 hover:cursor-pointer"
          />
        </div>
        {minMax && (
          <div className="flex justify-center items-center mt-2">
            <TiPin className="text-2xl mr-2 text-red-400" />
            <p>{note.note}</p>
          </div>
        )}
      </li>
    );
  }
);
