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
        <h2>Scoreboard</h2>
        <div className="scoreboard-container">
          <ul>
            {roomNames.map((room) => {
              const { name, imgUrl } = room;
              return (
                <li>
                  <div className="room-img-container">
                    <img src={imgUrl} alt={`Poster for ${name}`} />
                  </div>
                  <div className="room-text-container">
                    <h3>{name}</h3>
                    <h4></h4>
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
