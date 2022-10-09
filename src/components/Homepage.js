import { UserAuth } from "../contexts/AuthContext";
import { useNavigate, Link, Outlet } from "react-router-dom";
import MainContainer from "./MainContainer";
import AddStats from "../pages/AddStats";
import EditStats from "../pages/EditStats";
import Scoreboard from "../pages/Scoreboard";

const Homepage = () => {
  const { user, logoutUser } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <header>
        <div className="wrapper">
          <h1>Perplexity Escape Games Digital Scoreboard</h1>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/scoreboard">Scoreboard</Link>
              </li>
              <li>
                <Link to="/add">Add Stats</Link>
              </li>
              <li>
                <Link to="/recent">Recent Stats</Link>
              </li>
              <li>
                <Link to="/edit">Edit Stats</Link>
              </li>
            </ul>
          </nav>
          <div className="user-info">
            <p>Current User: {!user.isAnonymous ? user.email : "Anon"}</p>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </header>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

export default Homepage;
