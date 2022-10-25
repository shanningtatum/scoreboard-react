import React, { useState, useEffect } from "react";
import { roomNames, getRoomStats } from "../components/roomNames";

const Scoreboard = () => {
  useEffect(() => {
    getRoomStats();
  }, []);

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
              const { name, imgUrl, passrate } = room;
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
