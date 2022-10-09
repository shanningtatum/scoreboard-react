import "../App.scss";
import Homepage from "./Homepage";
import SignIn from "../pages/SignIn";
import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Error from "./Error";
import MainContainer from "./MainContainer";
import Scoreboard from "../pages/Scoreboard";
import AddStats from "../pages/AddStats";
import RecentStats from "../pages/RecentStats";
import EditStats from "../pages/EditStats";
import { UserAuth } from "../contexts/AuthContext";

function App() {
  const { user } = UserAuth();
  return (
    <div className="App">
      {!user ? (
        <SignIn />
      ) : (
        <Routes>
          {/* <Route path="*" element={<Error />} /> */}
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
            <Route path="/recent" element={<RecentStats />} />
            <Route path="/edit" element={<EditStats />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
