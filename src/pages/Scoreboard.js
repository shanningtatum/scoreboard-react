import React from "react";
import firebase from "../firebase";
import { getDatabase, ref } from "firebase/database";

const Scoreboard = () => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  return (
    <section id="scoreboard">
      <div className="wrapper">Scoreboard</div>
    </section>
  );
};

export default Scoreboard;
