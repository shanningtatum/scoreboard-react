import { UserAuth } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate, NavLink, Outlet, Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
// import Dashboard from "./Dashboard";

const Homepage = () => {
  const { user, logoutUser } = UserAuth();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  // handles user log out
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (e) {
      // keep this, doesn't really do anything
      console.log(e.message);
    }
  };

  return (
    <>
      <header className={darkMode ? "darkTheme" : "lightTheme"}>
        <div className="wrapper">
          <div className="header-title">
            <Link to="/">
              <img
                src={
                  darkMode
                    ? require("../assets/logo-white.jpg")
                    : require("../assets/logo-regular.png")
                }
                alt="Perplexity Escape Games logo"
              />
            </Link>
            <h2>Digital Scoreboard</h2>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/scoreboard">Scoreboard</NavLink>
              </li>
              <li>
                <NavLink to="/add">Add Stats</NavLink>
              </li>
              <li>
                <NavLink to="/recent">Recent Stats</NavLink>
              </li>
              <li>
                <NavLink to="/edit">Edit Stats</NavLink>
              </li>
            </ul>
          </nav>
          <div className="user-info">
            <p>Current User: {!user.isAnonymous ? user.email : "Anon"}</p>
            <button onClick={handleLogout} title="Sign out of this account">
              Log Out
            </button>
            <button
              onClick={() => {
                toggleDarkMode();
              }}
              title={darkMode ? "Toggle light mode" : "Toggle dark mode"}
            >
              {darkMode ? "????" : "????"}
            </button>
          </div>
        </div>
      </header>
      <main
        id="mainContent"
        className={darkMode ? "main-content darkTheme" : "main-content"}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Homepage;
