import React, { useEffect, useState } from "react";
import styles from "./NoteInput.module.css";
import send from "../../assets/send.png";
import AllNotes from "../AllNotes/AllNotes";

function NoteInput({ selectedGroup, onNoteAdded }) {
  // console.log("Selected Group in NoteInput component:", selectedGroup);
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotesFromLocalStorage = () => {
    const notesFromStorage =
      JSON.parse(localStorage.getItem(selectedGroup.name)) || [];
    setNotes(notesFromStorage);
  };

  useEffect(() => {
    fetchNotesFromLocalStorage();
  }, [selectedGroup]);

  const handleSend = () => {
    // console.log("send");
    if (inputText.trim() !== "") {
      const noteObj = {
        id: Date.now(),
        title: selectedGroup.name,
        content: inputText.trim(),
        Date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString(),
      };

      const updatedNotes = [...notes, noteObj];
      localStorage.setItem(selectedGroup.name, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);

      setInputText("");
    }
    //   setNotes(notes);
  };

  return (
    <div className={styles.noteInputPage}>
      <div className={styles.title}>
        {selectedGroup && selectedGroup.logo && (
          <div style={{ backgroundColor: selectedGroup.color }}>
            {/* {console.log("selectedGroup:", selectedGroup)} */}
            <span>{noteLogo(selectedGroup.name).logo}</span>
          </div>
        )}
        <div className={styles.title_name}>{selectedGroup.name}</div>
      </div>

      <div className={styles.note_box}>
        {selectedGroup && (
          <div className={styles.note_box_box}>
            {notes
              .filter((note) => note.title === selectedGroup.name)
              .map((note) => (
                <AllNotes key={note.id} noteObj={note} />
              ))}
          </div>
        )}
      </div>

      <div className={styles.textar}>
        <textarea
          placeholder="Enter your text here......."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <img src={send} alt="send" onClick={handleSend} />
      </div>
    </div>
  );
}

export default NoteInput;
