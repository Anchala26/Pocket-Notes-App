import React, { useState, useEffect } from "react";
import home from "../../assets/homepage.png";
import lock from "../../assets/lock.png";
import styles from "./Mainpage.module.css";
import PopupPage from "../PopupPage/PopupPage";
import { noteLogo } from "../Function Files/utils";
import NoteInput from "../NoteInput/NoteInput";
import { useScreen } from "../Function Files/useScreen.js";

function Mainpage() {
  const [showPopup, setShowPopup] = useState(false);
  const [existingData, setExistingData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedGroupNotes, setSelectedGroupNotes] = useState([]);
  const { isMobile } = useScreen();
  console.log("isMobile", isMobile);

  const handleOpen = () => {
    console.log("open");
    const DatainLocalStorage =
      JSON.parse(localStorage.getItem("noteData")) || [];
    setExistingData(DatainLocalStorage);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const showTheInput = () => {
    setShowInput((prev) => !prev);
  };

  const handleTitleClick = (index) => {
    console.log("handleTitleClick", index);
    if (isMobile) {
      setSelectedTitle(index === selectedTitle ? null : index);
      setShowInput(true);
    } else {
      setSelectedTitle(index === selectedTitle ? null : index);
    }
  };

  const handleNoteAdded = (newNote) => {
    console.log("Note addee", newNote);
    setSelectedGroupNotes((prevNotes) => [...prevNotes, newNote]);
  };

  useEffect(() => {
    const DatainLocalStorage =
      JSON.parse(localStorage.getItem("noteData")) || [];
    setExistingData(DatainLocalStorage);
  }, []);

  return (
    <>
      <div className={styles.main_page}>
        <div className={styles.note_title_section} onClick={showTheInput}>
          <h1>Pocket Notes</h1>
          {existingData.map((group, index) => (
            <div
              key={index}
              onClick={() => handleTitleClick(index)}
              className={`${styles.noteTitle} ${
                index === selectedTitle ? styles.selectedTitle : ""
              }`}
            >
              {/* {console.log("group:", group)} */}
              {/* {console.log("noteLogo(group.name):", noteLogo(group.name))} */}
              {group.name && (
                <div className={styles.title}>
                  <span
                    className={styles.logo}
                    style={{ backgroundColor: group.color }}
                  >
                    {noteLogo(group.name).logo}
                  </span>
                  {group.name}
                </div>
              )}
            </div>
          ))}
          <button className={styles.add_note_button} onClick={handleOpen}>
            {/* <h4 style={{ fontSize: "40px" }}>+</h4> */}+
          </button>
        </div>

        {isMobile && selectedTitle !== null ? (
          <NoteInput
            selectedGroup={existingData[selectedTitle]}
            onNoteAdded={handleNoteAdded}
          />
        ) : (
          <div className={styles.main_screen}>
            {selectedTitle == null ? (
              <>
                <img src={home} alt="home" style={{ width: "30rem" }} />

                <h1>Pocket Notes</h1>
                <p>
                  Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
                <div className={styles.footer}>
                  <img src={lock} alt="lock" style={{ width: "10px" }} />
                  <span> end-to-end encrypted</span>
                </div>
              </>
            ) : (
              <NoteInput
                selectedGroup={existingData[selectedTitle]}
                onNoteAdded={handleNoteAdded}
              />
            )}
          </div>
        )}
      </div>
      {showPopup && (
        <div className={styles.overlay}>
          <PopupPage
            existingData={existingData}
            setExistingData={setExistingData}
            onClose={handleClose}
          />
        </div>
      )}
    </>
  );
}

export default Mainpage;
