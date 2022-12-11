import "../App.scss";
import Homepage from "./Homepage";
import SignIn from "../pages/SignIn";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Error from "./Error";
import Scoreboard from "../pages/Scoreboard";
import AddStats from "../pages/AddStats";
import RecentStats from "../pages/RecentStats";
import EditStats from "../pages/EditStats";
import { UserAuth } from "../contexts/AuthContext";
import { DarkModeProvider } from "../contexts/DarkModeContext";
import { roomNames } from "../components/roomNames";
import firebase from "../firebase";
import { get, getDatabase, ref, onValue } from "firebase/database";

function App() {
  const { user } = UserAuth();
  const [recentData, setRecentData] = useState([]);

  const [fetching, setFetching] = useState(true);

  const database = getDatabase(firebase);
  const dbRef = ref(database);

  const updateStats = () => {
    onValue(dbRef, () => {
      getRoomStats();
    });
  };

  const getBestTime = (array) => {
    const bestTime = [];
    for (let i = 0; i < array.length; i++) {
      bestTime.push({
        time: parseInt(array[i].time.replace(":", "")),
        date: array[i].date,
      });
    }

    const fastestTime = Math.min(...bestTime.map((item) => item.time));

    const rejoinTime = [
      fastestTime.toString().slice(0, 2),
      fastestTime.toString().slice(-2),
    ].join(":");

    const bestDate = array.find((element) => element.time === rejoinTime);

    if (bestDate.name === "The Elevator") {
      roomNames[0].bestDate = bestDate;
    } else if (bestDate.name === "Kate's Motel") {
      roomNames[1].bestDate = bestDate;
    } else if (bestDate.name === "True Spies") {
      roomNames[2].bestDate = bestDate;
    } else if (bestDate.name === "The Last Laugh") {
      roomNames[3].bestDate = bestDate;
    } else if (bestDate.name === "The Short Cut") {
      roomNames[4].bestDate = bestDate;
    }

    setFetching(false);
  };

  const getRoomStats = () => {
    get(dbRef).then((response) => {
      setFetching(true);

      if (response.exists) {
        const data = response.val();

        const tempArray = [];

        for (let key in data) {
          const stringDate = data[key].date.split(" ");

          if (stringDate[2] === "2022") {
            tempArray.push(data[key]);
          }
          setRecentData(tempArray);
        }

        // First Room Total
        // -- The Elevator
        const elevatorTotal = tempArray.filter(
          (stat) => stat.name === "The Elevator"
        );
        const elevatorPass = elevatorTotal.filter(
          (stat) => stat.pass === "true"
        );
        const roomOnePassrate =
          (elevatorPass.length / elevatorTotal.length) * 100;
        roomNames[0].passrate = roomOnePassrate.toFixed(2);

        // Second Room Total
        // -- Kate's Motel
        const katesTotal = tempArray.filter(
          (stat) => stat.name === "Kate's Motel"
        );
        const katesPass = katesTotal.filter((stat) => stat.pass === "true");
        const roomTwoPassrate = (katesPass.length / katesTotal.length) * 100;
        roomNames[1].passrate = roomTwoPassrate.toFixed(2);

        // Third Room Total
        // -- True Spies
        const trueSpiesTotal = tempArray.filter(
          (stat) => stat.name === "True Spies"
        );
        const trueSpiesPass = trueSpiesTotal.filter(
          (stat) => stat.pass === "true"
        );
        const roomThreePassrate =
          (trueSpiesPass.length / trueSpiesTotal.length) * 100;
        roomNames[2].passrate = roomThreePassrate.toFixed(2);

        // 4th Room Total
        // -- The Last Laugh
        const lastLaughTotal = tempArray.filter(
          (stat) => stat.name === "The Last Laugh"
        );
        const lastLaughPass = lastLaughTotal.filter(
          (stat) => stat.pass === "true"
        );
        const roomFourPassrate =
          (lastLaughPass.length / lastLaughTotal.length) * 100;
        roomNames[3].passrate = roomFourPassrate.toFixed(2);

        // Fifth Room Total
        // -- The Short Cut
        const shortCutTotal = tempArray.filter(
          (stat) => stat.name === "The Short Cut"
        );
        const shortCutPass = shortCutTotal.filter(
          (stat) => stat.pass === "true"
        );
        const roomFivePassrate =
          (shortCutPass.length / shortCutTotal.length) * 100;
        roomNames[4].passrate = roomFivePassrate.toFixed(2);

        getBestTime(elevatorPass);
        getBestTime(katesPass);
        getBestTime(trueSpiesPass);
        getBestTime(lastLaughPass);
        getBestTime(shortCutPass);
      }
    });
  };

  // -- Will run getRoomStats on page load
  getRoomStats();

  return (
    <div className="App">
      <DarkModeProvider>
        {!user ? (
          <SignIn />
        ) : (
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/signup" element={<SignIn />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            >
              <Route
                path="/scoreboard"
                element={
                  <Scoreboard fetching={fetching} recentData={recentData} />
                }
              />
              <Route
                path="/add"
                element={
                  <AddStats fetching={fetching} updateStats={updateStats} />
                }
              />
              <Route
                path="/recent"
                element={
                  <RecentStats
                    recentData={recentData}
                    getRoomStats={getRoomStats}
                    fetching={fetching}
                  />
                }
              />
              <Route path="/edit" element={<EditStats />} />
            </Route>
          </Routes>
        )}
      </DarkModeProvider>
    </div>
  );
}

export default App;
