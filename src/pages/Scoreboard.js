import { roomNames } from "../components/roomNames";
import { Bar } from "react-chartjs-2";
// import { Chart } from "chart.js/auto";

const Scoreboard = ({ fetching, recentData }) => {

  return (
    <section id="scoreboard" className="scoreboard-section">
      <div className="wrapper">
        <div className="carousel-container">
          <div className="scoreboard-div">
            <div className="carousel-slides first-slide">
              {/* <p>Get Your Locks Off</p> */}
              <ul>
                {roomNames.map((room, index) => {
                  const { name, imgUrl } = room;
                  return (
                    <li key={index}>
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
            {fetching ? (
              <div className="carousel-slides">
                <p>Loading Stats </p>
              </div>
            ) : (
              roomNames.map((room, index) => {
                const { name, imgUrl, passrate, bestDate } = room;
                return (
                  <div className="carousel-slides" key={index}>
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
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;

// -- DECREPIT
