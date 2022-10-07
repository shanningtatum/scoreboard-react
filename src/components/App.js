import "../App.scss";
import Homepage from "./Homepage";
import SignIn from "./SignIn";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
