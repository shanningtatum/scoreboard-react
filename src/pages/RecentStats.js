import React, { useEffect } from "react";
import { getRoomStats } from "../components/roomNames";
import firebase from "../firebase";
import { get, getDatabase, ref } from "firebase/database";

const RecentStats = () => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  useEffect(() => {
    get(dbRef).then((response) => {
      console.log(response.data);

      // get data from database and save into a state to render into the page
    });
  }, []);

  return (
    <section id="recentStats">
      <div className="wrapper">
        <h2>Recent Stats</h2>
      </div>
    </section>
  );
};

export default RecentStats;
