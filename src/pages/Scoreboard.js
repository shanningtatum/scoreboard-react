import React, { useState, useEffect } from "react";
import { roomNames } from "../components/roomNames";
import firebase from "../firebase";
import { get, getDatabase, ref } from "firebase/database";

const Scoreboard = () => {
  // -- Create
  // create a state of the rooms in here and add the best times in here to prevent the error thingy
  const getBestTime = (array) => {
    console.log(array);
  };

  const getRoomStats = () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    get(dbRef).then((response) => {
      if (response.exists) {
        const data = response.val();

        const tempArray = [];

        for (let key in data) {
          // splits the date string so we can get the year from it
          const stringDate = data[key].date.split(" ");

          // will only push data from the selected year into tempArray
          if (stringDate[2] == "2022") {
            tempArray.push(data[key]);
          }
        }

        // First Room Total
        // -- The Elevator
        const elevatorTotal = tempArray.filter(
          (stat) => stat.name === "The Elevator"
        );
        // First Room Pass
        const elevatorPass = elevatorTotal.filter(
          (stat) => stat.pass === "true"
        );
        // FIRST ROOM PASSRATE
        const roomOnePassrate =
          (elevatorPass.length / elevatorTotal.length) * 100;
        // creates passrate property in the roomNames array object
        roomNames[0].passrate = roomOnePassrate.toFixed(2);
        getBestTime(elevatorPass);

        // Second Room Total
        // -- Kate's Motel
        const katesTotal = tempArray.filter(
          (stat) => stat.name === "Kate's Motel"
        );
        // Second Room Pass
        const katesPass = katesTotal.filter((stat) => stat.pass === "true");
        // SECOND ROOM PASSRATE
        const roomTwoPassrate = (katesPass.length / katesTotal.length) * 100;
        // creates passrate property in the roomNames array object
        roomNames[1].passrate = roomTwoPassrate.toFixed(2);
        getBestTime(katesPass);

        // Third Room Total
        // -- True Spies
        const trueSpiesTotal = tempArray.filter(
          (stat) => stat.name === "True Spies"
        );
        // Third Room Pass
        const trueSpiesPass = trueSpiesTotal.filter(
          (stat) => stat.pass === "true"
        );
        // THIRD ROOM PASSRATE
        const roomThreePassrate =
          (trueSpiesPass.length / trueSpiesTotal.length) * 100;
        // creates passrate property in the roomNames array object
        roomNames[2].passrate = roomThreePassrate.toFixed(2);
        getBestTime(trueSpiesPass);

        // 4th Room Total
        // -- The Last Laugh
        const lastLaughTotal = tempArray.filter(
          (stat) => stat.name === "The Last Laugh"
        );
        // 4th Room Pass
        const lastLaughPass = lastLaughTotal.filter(
          (stat) => stat.pass === "true"
        );
        // 4TH ROOM PASSRATE
        const roomFourPassrate =
          (lastLaughPass.length / lastLaughTotal.length) * 100;
        // creates passrate property in the roomNames array object
        roomNames[3].passrate = roomFourPassrate.toFixed(2);
        getBestTime(lastLaughPass);

        // Fifth Room Total
        // -- The Short Cut
        const shortCutTotal = tempArray.filter(
          (stat) => stat.name === "The Short Cut"
        );
        // Fifth Room Pass
        const shortCutPass = shortCutTotal.filter(
          (stat) => stat.pass === "true"
        );
        // FIFTH ROOM PASSRATE
        const roomFivePassrate =
          (shortCutPass.length / shortCutTotal.length) * 100;
        // creates passrate property in the roomNames array object
        roomNames[4].passrate = roomFivePassrate.toFixed(2);
        getBestTime(shortCutPass);
      } else {
        alert("something is wrong");
      }
      return "poop";
    });
  };

  // PSEUDO
  // Need to implement onValue for addStats to refresh room stats

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
            {roomNames.map((room, index) => {
              console.log(room);
              const { name, imgUrl, passrate, bestDate } = room;
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
                          <p>{passrate} %</p>
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
                          <p>{bestDate.time}</p>
                        </div>
                        <div className="stats-col">
                          <h3># Of Clues</h3>
                          <p>{bestDate.hint}</p>
                        </div>
                        <div className="stats-col">
                          <h3># Of Players</h3>
                          <p>{bestDate.player}</p>
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
