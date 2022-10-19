import React from "react";
import firebase from "../firebase";
import { getDatabase, ref } from "firebase/database";
import { roomNames } from "../components/roomNames";

const Scoreboard = () => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  return (
    <section id="scoreboard" className="scoreboard-section">
      <div className="wrapper">
        <div className="scoreboard-container">
          <ul>
            {roomNames.map((room) => {
              const { name, imgUrl } = room;
              return (
                <li>
                  <img src={imgUrl} alt={`Poster for ${name}`} />

                  {/* <div className="room-img-container"></div> */}
                  <div className="room-text-container">
                    <h3>{name}</h3>
                    <div className="best-time-container">
                      <h4>Best Time</h4>
                      <p>May 26th, 2022</p>
                      <p>45:12</p>
                      <p>0 hints</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;
