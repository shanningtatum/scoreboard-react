import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  roomNames,
  calculateDate,
  calculateTime,
} from "../components/roomNames";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { UserAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

const AddStats = () => {
  // declaring variable from AuthContext
  const { user } = UserAuth();
  // declaring variable from DarkModeContext
  const { darkMode } = useContext(DarkModeContext);
  const [toggleTime, setToggleTime] = useState(false);

  // setting states for user input
  const [roomInput, setRoomInput] = useState(undefined);
  const [passInput, setPassInput] = useState(undefined);
  const [timeInput, setTimeInput] = useState("");
  const [hintInput, setHintInput] = useState(undefined);
  const [playerInput, setPlayerInput] = useState(undefined);
  const [timeRemain, setTimeRemain] = useState("");

  // state for error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  // state to store user input to push to database
  const [roomStatInfo, setRoomStatInfo] = useState({});

  // declaring database stuff for Firebase
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  // creating functions for storing user input into their states
  // -- Room Input
  const handleRoom = async (e) => {
    setRoomInput(e.target.value);
  };

  // -- Pass Input
  const handlePass = async (e) => {
    setPassInput(e.target.value);
  };

  // -- Hint Input
  const handleHint = async (e) => {
    setHintInput(e.target.value);
  };

  // -- Player Input
  const handlePlayer = async (e) => {
    setPlayerInput(e.target.value);
  };

  // trigger event when button is clicked - this will add the input fields info to database
  const handleSubmit = () => {
    if (
      roomInput === undefined ||
      passInput === undefined ||
      timeInput === undefined ||
      hintInput === undefined ||
      playerInput === undefined ||
      (passInput === "true" && timeInput === "")
    ) {
      setErrorMessage("Please fill in all fields");
      setToggleModal(true);
    } else if (roomInput && passInput && timeInput && hintInput && passInput) {
      // get date timestamp function
      const date = calculateDate();

      if (timeInput !== "") {
        const remainingTime = calculateTime(roomInput, timeInput);

        setTimeRemain(remainingTime);
      } else {
        const remainTime = async () => {
          setTimeRemain(timeInput);
        };
        remainTime();
      }

      // stores user selection into an object to push into firebase
      const roomStat = {
        date: date,
        name: roomInput,
        pass: passInput,
        time: timeRemain,
        hint: hintInput,
        player: playerInput,
      };

      console.log(roomStat);

      push(dbRef, roomStat)
        .then(() => {
          // set success error message
          setErrorMessage("Successfully added new stat!");
          setToggleModal(true);

          // clears all states/unchecked radio buttons
          setRoomInput(undefined);
          setPassInput(undefined);
          setTimeInput("");
          setHintInput(undefined);
          setPlayerInput(undefined);
          setToggleTime(false);
        })
        .catch((error) => {
          // keep this
          console.log(error);
        });
    } else {
      setErrorMessage("Please fill in time remaining");
      setToggleModal(true);
    }
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  return (
    <>
      <div className={toggleModal ? "error-modal active" : "error-modal"}>
        <div className="modal-container">
          {errorMessage}
          <button onClick={closeModal}>Ok</button>
        </div>
      </div>
      <section
        id="addStats"
        className={darkMode ? "add-stats darkTheme" : "add-stats"}
      >
        <div className={!user.email ? "wrapper anon" : "wrapper"}>
          {!user.email ? (
            <div className="error-message">
              <div className="error-text">
                <h3>Oops...</h3>
                <h4>It seems you are not logged in.</h4>
                <h4>Only registered accounts can add stats. </h4>
                <h4>
                  <Link to="/signup">Sign in</Link> to use this feature.
                </h4>
              </div>
              <div className="error-image">
                <img
                  src={require("../assets/error-image.png")}
                  alt="A person holding a magnifying glass and a question mark near their head"
                />
              </div>
            </div>
          ) : (
            <>
              <h2>Add Stats</h2>

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
                    checked={passInput === "true"}
                    onChange={(e) => {
                      setToggleTime(true);
                      handlePass(e);
                      setTimeInput("");
                    }}
                    value={true}
                  />
                  <label htmlFor="pass-yes">Yes</label>
                  <input
                    type="radio"
                    name="pass-input"
                    id="pass-no"
                    checked={passInput === "false"}
                    onChange={(e) => {
                      setToggleTime(false);
                      handlePass(e);
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
                    type="text"
                    name="time-input"
                    placeholder="12:43 or 1243"
                    onChange={(e) => {
                      setTimeInput(e.target.value);
                    }}
                    value={timeInput}
                    maxLength="5"
                    required
                  />
                </fieldset>
                <fieldset id="hint-input">
                  <legend>No. Of Hints</legend>
                  <input
                    type="radio"
                    name="hint-input"
                    checked={hintInput === "0"}
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
                    checked={hintInput === "1"}
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
                    checked={hintInput === "2"}
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
                    checked={hintInput === "3"}
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
                    checked={hintInput === "4+"}
                    id="hint-4"
                    value="4+"
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
                    checked={playerInput === "2"}
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
                    checked={playerInput === "3"}
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
                    checked={playerInput === "4"}
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
                    checked={playerInput === "5"}
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
                    checked={playerInput === "6"}
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
                    checked={playerInput === "7"}
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
                    checked={playerInput === "8"}
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
    </>
  );
};

export default AddStats;
