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
        <div className="carousel-container">
          <div className="scoreboard-div">
            {roomNames.map((room) => {
              const { name, imgUrl } = room;
              return (
                <div className="scoreboard-container">
                  <div className="room-poster">
                    <img src={imgUrl} alt={`Poster for ${name} room`} />
                  </div>
                  <div className="room-stats">
                    {/* Pass Rate, Recommended Players */}
                    <div className="stats-row passrate-row">
                      <div className="stats-col ">
                        <h3>Pass Rate</h3>
                        <p>45%</p>
                      </div>
                      <div className="stats-col">
                        <h3>Recommended Players</h3>
                        <p>4</p>
                      </div>
                    </div>
                    {/* Best Time */}
                    <div className="stats-row best-time-row">
                      <div className="stats-col">
                        <h3>Best Time</h3>
                        <p>45:16</p>
                      </div>
                      <div className="stats-col">
                        <h3># Of Clues</h3>
                        <p>2</p>
                      </div>
                      <div className="stats-col">
                        <h3># Of Players</h3>
                        <p>4</p>
                      </div>
                    </div>
                    {/* Graph */}
                    <div className="stats-row graph-row">
                      <div className="stats-graph">Graph Here</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;

// -- DECREPIT
{
  /* <ul>
  {roomNames.map((room) => {
    const { name, imgUrl } = room;
    return (
      <li>
        <img src={imgUrl} alt={`Poster for ${name}`} />
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
</ul>; */
}
