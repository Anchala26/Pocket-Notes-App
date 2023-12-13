import React from "react";
import styles from "./AllNotes.module.css";

function AllNotes({ noteObj }) {
  // console.log("Note in AllNotes component:", noteObj);

  return (
    <div className={styles.note_content}>
      <div className={styles.content}>
        <div>{noteObj.content}</div>
      </div>
      <div className={styles.date_time}>
        <div className={styles.Date}>{noteObj.date}</div>
        <div className={styles.time}>{noteObj.time}</div>
      </div>
    </div>
  );
}

export default AllNotes;
