import React from "react";
import roomNames from "../components/roomNames";

const AddStats = () => {
  return (
    <section id="addStats">
      <div className="wrapper">
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
                    value={room}
                    id={room}
                  />
                  <label htmlFor={room}>{room}</label>
                </div>
              );
            })}
          </fieldset>
          <fieldset id="pass-input">
            <legend>Did They Escape?</legend>
            <input type="radio" name="pass-input" id="pass-yes" />
            <label htmlFor="pass-yes">Yes</label>
            <input type="radio" name="pass-input" id="pass-no" />
            <label htmlFor="pass-no">No</label>
          </fieldset>
          <fieldset id="time-input">
            <legend>Time Remaining</legend>
            <input type="text" name="time-input" placeholder="12:43 or 1243" />
          </fieldset>
          <fieldset id="hint-input">
            <legend>No. Of Hints</legend>
            <input type="radio" name="hint-input" id="hint-0" value="0" />
            <label htmlFor="hint-0">0</label>
            <input type="radio" name="hint-input" id="hint-1" value="1" />
            <label htmlFor="hint-1">1</label>
            <input type="radio" name="hint-input" id="hint-2" value="2" />
            <label htmlFor="hint-2">2</label>
            <input type="radio" name="hint-input" id="hint-3" value="3" />
            <label htmlFor="hint-3">3</label>
            <input type="radio" name="hint-input" id="hint-4" value="4plus" />
            <label htmlFor="hint-4">4 +</label>
          </fieldset>
          <fieldset id="player-input">
            <legend>No. Of Players</legend>
            <input type="radio" name="player-input" id="player-2" value="2" />
            <label htmlFor="player-2">2</label>
            <input type="radio" name="player-input" id="player-3" value="3" />
            <label htmlFor="player-3">3</label>
            <input type="radio" name="player-input" id="player-4" value="4" />
            <label htmlFor="player-4">4</label>
            <input type="radio" name="player-input" id="player-5" value="5" />
            <label htmlFor="player-5">5</label>
            <input type="radio" name="player-input" id="player-6" value="6" />
            <label htmlFor="player-6">6</label>
            <input type="radio" name="player-input" id="player-7" value="7" />
            <label htmlFor="player-7">7</label>
            <input type="radio" name="player-input" id="player-8" value="8" />
            <label htmlFor="player-8">8</label>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default AddStats;
