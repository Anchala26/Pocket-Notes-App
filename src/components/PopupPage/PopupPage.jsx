import React, { useState } from "react";
import styles from "./PopupPage.module.css";

function PopupPage({ existingData, setExistingData, onClose }) {
  const [noteName, setNoteName] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [error, setError] = useState("");

  console.log("Renderog");

  const handlePopBox = () => {
    //for name
    if (!noteName.trim()) {
      setError("Name needed!!");
      return;
    }

    // name already exist
    if (existingData.some((group) => group.name === noteName)) {
      setError("Name already exist!!");
      return;
    }

    //for color choosing
    if (!bgColor) {
      setError("Please choose color!");
      return;
    }

    const data = { name: noteName, color: bgColor };
    const updatedData = [...existingData, data];
    setExistingData(updatedData);

    localStorage.setItem("noteData", JSON.stringify([...existingData, data]));
    // console.log("Data Stored ");

    onClose();
  };
  return (
    <div>
      <div>
        <div className={styles.popupdiv}>
          {error && <div className={styles.error}>{error}</div>}
          <h3>Create New group</h3>
          <label>
            Group Name
            <input
              type="text"
              value={noteName}
              placeholder="Enter group name"
              onChange={(e) => {
                setNoteName(e.target.value);
                setError("");
              }}
            />
          </label>

          <div className={styles.group_color}>
            <div style={{ fontWeight: "700" }}>Group Color</div>
            <div
              className={`${styles.color} ${
                selectedColor === "#B38BFA" ? styles.selectedColor : ""
              }`}
              style={{ backgroundColor: "#B38BFA" }}
              onClick={() => {
                setBgColor("#B38BFA");
                setSelectedColor("#B38BFA");
              }}
            ></div>
            <div
              className={`${styles.color} ${
                selectedColor === "#FF79F2" ? styles.selectedColor : ""
              }`}
              style={{ backgroundColor: "#FF79F2" }}
              onClick={() => {
                setBgColor("#FF79F2");
                setSelectedColor("#FF79F2");
              }}
            ></div>
            <div
              className={`${styles.color} ${
                selectedColor === "#43E6FC" ? styles.selectedColor : ""
              }`}
              style={{ backgroundColor: "#43E6FC" }}
              onClick={() => {
                setBgColor("#43E6FC");
                setSelectedColor("#43E6FC");
              }}
            ></div>
            <div
              className={`${styles.color} ${
                selectedColor === "#F19576" ? styles.selectedColor : ""
              }`}
              style={{ backgroundColor: "#F19576" }}
              onClick={() => {
                setBgColor("#F19576");
                setSelectedColor("#F19576");
              }}
            ></div>
            <div
              className={`${styles.color} ${
                selectedColor === "#0047FF" ? styles.selectedColor : ""
              }`}
              style={{ backgroundColor: "#0047FF" }}
              onClick={() => {
                setBgColor("#0047FF");
                setSelectedColor("#0047FF");
              }}
            ></div>
            <div
              className={`${styles.color} ${
                selectedColor === "#6691FF" ? styles.selectedColor : ""
              }`}
              style={{ backgroundColor: "#6691FF" }}
              onClick={() => {
                setBgColor("#6691FF");
                setSelectedColor("#6691FF");
              }}
            ></div>
          </div>

          <button onClick={handlePopBox}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default PopupPage;
