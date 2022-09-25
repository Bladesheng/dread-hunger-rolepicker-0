import React, { useState, useRef, useEffect } from "react";

type IProps = {
  saveInput: (inputValue: string) => void;
};

// button that changes into input on click
// changes back to button on focus loss / esc keypress / enter keypress
export default function EditableButton(props: IProps) {
  const [editing, setEditing] = useState(false);

  const refInput = useRef(null); // reference to the input element

  // select input element when button is clicked
  useEffect(() => {
    if (editing) {
      refInput.current.focus();
    }
  }, [editing]);

  const inputElement = (
    <input
      key={0}
      type="text"
      className="editableInput"
      ref={refInput}
      onBlur={() => {
        // save inputted value on focus loss
        const inputValue = refInput.current.value;

        endEdit(inputValue);
      }}
      onKeyUp={(event) => {
        const inputValue = refInput.current.value;
        const key = event.code;

        if (key === "Escape") {
          endEdit(); // force cancel by omitting inputValue
        } else if (key === "Enter" || key === "NumpadEnter") {
          endEdit(inputValue); // save inputted value
        }
      }}
    ></input>
  );

  const saveButton = (
    <button
      key={1}
      className="plus"
      onClick={() => {
        const inputValue = refInput.current.value;
        endEdit(inputValue); // save inputted value
      }}
    >
      {" "}
      +
    </button>
  );

  function startEdit() {
    setEditing(true);
  }

  function endEdit(inputValue?: string) {
    setEditing(false);

    if (inputValue) {
      // saved
      props.saveInput(inputValue);
    } else {
      // didn't save
    }
  }

  return editing ? (
    <div className="inputs">{[inputElement, saveButton]}</div>
  ) : (
    <button className="editableButton" onClick={startEdit}>
      + Nový hráč
    </button>
  );
}
