import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from '../../http';
import { createVideoRoom as createVideo } from '../../http';
import { useHistory } from 'react-router-dom';

const AddRoomModal = ({onClose}) => {
  const [roomType, setRoomType] = useState("open");
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const history = useHistory();

  async function createRoom() {
    try {
      if (!topic) return;
      setType("voice");
      const chatType = "voice";
      const { data } = await create({ topic, roomType, type:chatType });
      history.push(`/room/${data.id}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function createVideoRoom() {
    try {
      if (!topic) return;
      setType("video");
      const chatType = "video";
      const { data } = await createVideo({ topic, roomType, type: chatType });
      history.push(`/videoRoom/${data.id}`);
    } catch (err) {
      console.log(err.message);
    }
}


  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Voice Chat</span>
          </button>
          <button onClick={createVideoRoom} className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Video Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
