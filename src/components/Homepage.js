import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <header>
      <h1>Perplexity Escape Games</h1>
      <h2>Digital Score Board</h2>
      <p>User Email: </p>
      {user ? user.email : ""}
      <button onClick={handleLogout}>Log Out</button>
    </header>
  );
};

export default Homepage;
