import React from "react";
import firebase from "../firebase";
import { getDatabase, ref } from "firebase/database";

const Scoreboard = () => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  return (
    <section id="scoreboard">
      <div className="wrapper">
        <h2>Scoreboard</h2>
      </div>
    </section>
  );
};

export default Scoreboard;
