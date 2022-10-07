import "../App.scss";
import Homepage from "./Homepage";
import SignIn from "./SignIn";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
