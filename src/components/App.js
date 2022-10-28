import "../App.scss";
import Homepage from "./Homepage";
import SignIn from "../pages/SignIn";
import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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
import { get, getDatabase, ref } from "firebase/database";

function App() {
  const { user } = UserAuth();
  const [recentData, setRecentData] = useState([]);

  const [fetching, setFetching] = useState(true);

  // -- Will run getRoomStats on page load
  useEffect(() => {
    getRoomStats();
  }, []);

  const getBestTime = async (array) => {
    const bestTime = [];
    // loops through array of passed rooms to breakdown the time into a number and puts in bestTime array
    for (let i = 0; i < array.length; i++) {
      bestTime.push({
        time: parseInt(array[i].time.replace(":", "")),
        date: array[i].date,
      });
    }

    // sorting through the bestTime array to find the lowest time and storing it in variable
    const fastestTime = Math.min(...bestTime.map((item) => item.time));

    const rejoinTime = [
      fastestTime.toString().slice(0, 2),
      fastestTime.toString().slice(-2),
    ].join(":");

    // loops through the array to find the index that has the best time in it and returns the object into bestDate variable
    const bestDate = await array.find((element) => element.time === rejoinTime);

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
          setRecentData(tempArray);
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

        try {
          getBestTime(elevatorPass);
          getBestTime(katesPass);
          getBestTime(trueSpiesPass);
          getBestTime(lastLaughPass);
          getBestTime(shortCutPass);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("something is wrong");
      }
      return "poop";
    });
  };

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
              <Route path="/scoreboard" element={<Scoreboard />} />
              <Route path="/add" element={<AddStats />} />
              <Route
                path="/recent"
                element={
                  <RecentStats recentData={recentData} fetching={fetching} />
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
