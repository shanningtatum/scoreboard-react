import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import roomNames from "../components/roomNames";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { UserAuth } from "../contexts/AuthContext";

const AddStats = () => {
  // declaring variable from AuthContext
  const { user } = UserAuth();
  // declaring variable from DarkModeContext
  const { darkMode } = useContext(DarkModeContext);
  const [toggleTime, setToggleTime] = useState(false);

  // setting states for user input
  const [roomInput, setRoomInput] = useState();
  const [passInput, setPassInput] = useState();
  const [timeInput, setTimeInput] = useState();
  const [hintInput, setHintInput] = useState();
  const [playerInput, setPlayerInput] = useState();

  // state for error messages
  const [errorMessage, setErrorMessage] = useState();

  const [roomStatInfo, setRoomStatInfo] = useState({});

  // creating functions for storing user input into their states

  // -- Room Input
  const handleRoom = (e) => {
    setRoomInput(e.target.value);
  };

  // -- Hint Input
  const handleHint = (e) => {
    setHintInput(e.target.value);
  };

  // -- Player Input
  const handlePlayer = (e) => {
    setPlayerInput(e.target.value);
  };

  const handleSubmit = () => {
    console.log(roomInput, passInput, timeInput, hintInput, playerInput);

    const roomStat = {
      name: roomInput,
      pass: passInput,
      time: timeInput,
      hints: hintInput,
      players: playerInput,
    };

    setRoomStatInfo(roomStat);
    setRoomInput();
    setPassInput();
    setTimeInput();
    setHintInput();
    setPlayerInput();
  };

  return (
    <section
      id="addStats"
      className={darkMode ? "add-stats darkTheme" : "add-stats"}
    >
      <div className="wrapper">
        <h2>Add Stats</h2>
        {!user.email ? (
          <>
            <h3>Oops...</h3>
            <h4>
              It seems you are not logged in. Only registered accounts can add
              stats. <Link to="/signup">Sign in</Link> to use this feature.
            </h4>
          </>
        ) : (
          <>
            <form>
              <fieldset id="room-input">
                <legend>Room Name</legend>
                {roomNames.map((room, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        name="room-input"
                        checked={roomInput === room}
                        value={room}
                        id={room}
                        onChange={handleRoom}
                      />
                      <label htmlFor={room}>{room}</label>
                    </div>
                  );
                })}
              </fieldset>
              <fieldset id="pass-input">
                <legend>Did They Escape?</legend>
                <input
                  type="radio"
                  name="pass-input"
                  id="pass-yes"
                  onClick={() => {
                    setToggleTime(true);
                    setPassInput(true);
                  }}
                  value={true}
                />
                <label htmlFor="pass-yes">Yes</label>
                <input
                  type="radio"
                  name="pass-input"
                  id="pass-no"
                  onClick={() => {
                    setToggleTime(false);
                    setPassInput(false);
                    setTimeInput("N/A");
                  }}
                  value={false}
                />
                <label htmlFor="pass-no">No</label>
              </fieldset>
              <fieldset
                id="time-input"
                className={toggleTime ? "time-input active" : "time-input"}
              >
                <legend>Time Remaining</legend>
                <input
                  type="number"
                  name="time-input"
                  placeholder="12:43 or 1243"
                  onChange={(e) => {
                    setTimeInput(e.target.value);
                  }}
                  required
                />
              </fieldset>
              <fieldset id="hint-input">
                <legend>No. Of Hints</legend>
                <input
                  type="radio"
                  name="hint-input"
                  id="hint-0"
                  value="0"
                  onChange={(e) => {
                    handleHint(e);
                  }}
                />
                <label htmlFor="hint-0">0</label>
                <input
                  type="radio"
                  name="hint-input"
                  id="hint-1"
                  value="1"
                  onChange={(e) => {
                    handleHint(e);
                  }}
                />
                <label htmlFor="hint-1">1</label>
                <input
                  type="radio"
                  name="hint-input"
                  id="hint-2"
                  value="2"
                  onChange={(e) => {
                    handleHint(e);
                  }}
                />
                <label htmlFor="hint-2">2</label>
                <input
                  type="radio"
                  name="hint-input"
                  id="hint-3"
                  value="3"
                  onChange={(e) => {
                    handleHint(e);
                  }}
                />
                <label htmlFor="hint-3">3</label>
                <input
                  type="radio"
                  name="hint-input"
                  id="hint-4"
                  value="4plus"
                  onChange={(e) => {
                    handleHint(e);
                  }}
                />
                <label htmlFor="hint-4">4 +</label>
              </fieldset>
              <fieldset id="player-input">
                <legend>No. Of Players</legend>
                <input
                  type="radio"
                  name="player-input"
                  id="player-2"
                  value="2"
                  onChange={(e) => {
                    handlePlayer(e);
                  }}
                />
                <label htmlFor="player-2">2</label>
                <input
                  type="radio"
                  name="player-input"
                  id="player-3"
                  value="3"
                  onChange={(e) => {
                    handlePlayer(e);
                  }}
                />
                <label htmlFor="player-3">3</label>
                <input
                  type="radio"
                  name="player-input"
                  id="player-4"
                  value="4"
                  onChange={(e) => {
                    handlePlayer(e);
                  }}
                />
                <label htmlFor="player-4">4</label>
                <input
                  type="radio"
                  name="player-input"
                  id="player-5"
                  value="5"
                  onChange={(e) => {
                    handlePlayer(e);
                  }}
                />
                <label htmlFor="player-5">5</label>
                <input
                  type="radio"
                  name="player-input"
                  id="player-6"
                  value="6"
                  onChange={(e) => {
                    handlePlayer(e);
                  }}
                />
                <label htmlFor="player-6">6</label>
                <input
                  type="radio"
                  name="player-input"
                  id="player-7"
                  value="7"
                  onChange={(e) => {
                    handlePlayer(e);
                  }}
                />
                <label htmlFor="player-7">7</label>
                <input
                  type="radio"
                  name="player-input"
                  id="player-8"
                  value="8"
                  onChange={(e) => {
                    handlePlayer(e);
                  }}
                />
                <label htmlFor="player-8">8</label>
              </fieldset>
            </form>
            <button onClick={() => handleSubmit()}>Submit</button>
          </>
        )}
      </div>
    </section>
  );
};

export default AddStats;
