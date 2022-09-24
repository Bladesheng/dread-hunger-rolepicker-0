import React, { useState, useRef, useEffect } from "react";

type IProps = {
  saveInput: (inputValue: string) => void;
};

export default function EditableButton(props: IProps) {
  const [editing, setEditing] = useState(false);

  const refInput = useRef(null);

  // select input element when button is clicked
  useEffect(() => {
    if (editing) {
      refInput.current.focus();
    }
  }, [editing]);

  const inputEditor = (
    <input
      key={0}
      type="text"
      ref={refInput}
      onBlur={() => {
        const inputValue = refInput.current.value;

        endEdit(inputValue);
      }}
      onKeyUp={(event) => {
        const inputValue = refInput.current.value;
        const key = event.code;

        if (key === "Escape") {
          endEdit(); // force cancel by omitting inputValue
        } else if (key === "Enter" || key === "NumpadEnter") {
          endEdit(inputValue);
        }
      }}
    ></input>
  );

  const saveButton = (
    <button
      key={1}
      onClick={() => {
        const inputValue = refInput.current.value;
        endEdit(inputValue);
      }}
    >
      {" "}
      Přidat
    </button>
  );

  function startEdit() {
    setEditing(true);
  }

  function endEdit(inputValue?: string) {
    setEditing(false);

    if (inputValue) {
      console.log("passed back: ", inputValue);
      props.saveInput(inputValue);
    } else {
      console.log("didnt save");
    }
  }

  return editing ? (
    <div className="inputs">{[inputEditor, saveButton]}</div>
  ) : (
    <button className="editableButton" onClick={startEdit}>
      + Nový hráč
    </button>
  );
}
