import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { get, getDatabase, ref } from "firebase/database";
import { roomNames } from "../components/roomNames";

const Scoreboard = () => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  const [databaseData, setDatabaseData] = useState([]);

  // States for room totals
  const [roomOneTotal, setRoomOneTotal] = useState([]);
  const [roomTwoTotal, setRoomTwoTotal] = useState([]);
  const [roomThreeTotal, setRoomThreeTotal] = useState([]);
  const [roomFourTotal, setRoomFourTotal] = useState([]);
  const [roomFiveTotal, setRoomFiveTotal] = useState([]);

  // States for passed rooms
  const [roomOnePass, setRoomOnePass] = useState([]);
  const [roomTwoPass, setRoomTwoPass] = useState([]);
  const [roomThreePass, setRoomThreePass] = useState([]);
  const [roomFourPass, setRoomFourPass] = useState([]);
  const [roomFivePass, setRoomFivePass] = useState([]);

  // States for Passrate
  const [roomOnePassrate, setRoomOnePassrate] = useState({});
  const [roomTwoPassrate, setRoomTwoPassrate] = useState({});
  const [roomThreePassrate, setRoomThreePassrate] = useState({});
  const [roomFourPassrate, setRoomFourPassrate] = useState({});
  const [roomFivePassrate, setRoomFivePassrate] = useState({});

  // Grabs data from database when website loads
  useEffect(() => {
    get(dbRef).then((response) => {
      const data = response.val();

      const tempArray = [];

      for (let key in data) {
        tempArray.push(data[key]);

        setDatabaseData(tempArray);
      }

      // First Room Total
      // -- The Elevator
      const elevatorTotal = tempArray.filter(
        (stat) => stat.name === "The Elevator"
      );
      setRoomOneTotal(elevatorTotal);
      // First Room Pass
      const elevatorPass = elevatorTotal.filter((stat) => stat.pass === "true");
      setRoomOnePass(elevatorPass);
      // FIRST ROOM PASSRATE
      setRoomOnePassrate(elevatorPass.length / elevatorTotal.length);

      // Second Room Total
      // -- Kate's Motel
      const katesTotal = tempArray.filter(
        (stat) => stat.name === "Kate's Motel"
      );
      setRoomTwoTotal(katesTotal);
      // Second Room Pass
      const katesPass = katesTotal.filter((stat) => stat.pass === "true");
      setRoomTwoPass(katesPass);
      // SECOND ROOM PASSRATE
      setRoomTwoPassrate(katesPass.length / katesTotal.length);

      // Third Room Total
      // -- True Spies
      const trueSpiesTotal = tempArray.filter(
        (stat) => stat.name === "True Spies"
      );
      setRoomThreeTotal(trueSpiesTotal);
      // Third Room Pass
      const trueSpiesPass = trueSpiesTotal.filter(
        (stat) => stat.pass === "true"
      );
      setRoomThreePass(trueSpiesPass);
      // THIRD ROOM PASSRATE
      setRoomThreePassrate(trueSpiesPass.length / trueSpiesTotal.length);

      // Fourth Room Total
      // -- The Last Laugh
      const lastLaughTotal = tempArray.filter(
        (stat) => stat.name === "The Last Laugh"
      );
      setRoomFourTotal(lastLaughTotal);
      // Fourth Room Pass
      const lastLaughPass = lastLaughTotal.filter(
        (stat) => stat.pass === "true"
      );
      setRoomFourPass(lastLaughPass);
      // FOURTH ROOM PASSRATE
      setRoomFourPassrate(lastLaughPass.length / lastLaughTotal.length);

      // Fifth Room Total
      // -- The Short Cut
      const shortCutTotal = tempArray.filter(
        (stat) => stat.name === "The Short Cut"
      );
      setRoomFiveTotal(shortCutTotal);
      // Fifth Room Pass
      const shortCutPass = shortCutTotal.filter((stat) => stat.pass === "true");
      setRoomFivePass(shortCutPass);
      // FIFTH ROOM PASSRATE
      setRoomFivePassrate(shortCutPass.length / shortCutTotal.length);
    });
  }, []);

  // PSEUDO
  // Find a way to pass thru passrates to store in room names...

  return (
    <section id="scoreboard" className="scoreboard-section">
      <div className="wrapper">
        <div className="carousel-container">
          <div className="scoreboard-div">
            <div className="carousel-slides first-slide">
              {/* <p>Get Your Locks Off</p> */}
              <ul>
                {roomNames.map((room) => {
                  const { name, imgUrl } = room;
                  return (
                    <li>
                      <img
                        src={imgUrl}
                        alt={`Poster for ${name} room`}
                        draggable={false}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            {roomNames.map((room) => {
              const { name, imgUrl } = room;
              return (
                <div className="carousel-slides">
                  <div className="scoreboard-container">
                    <div className="room-poster">
                      <div className="room-poster-container">
                        <img
                          src={imgUrl}
                          alt={`Poster for ${name} room`}
                          draggable={false}
                        />
                      </div>
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
