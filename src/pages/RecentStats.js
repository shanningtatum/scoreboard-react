import { useState } from "react";

const RecentStats = ({ recentData }) => {
  const [postsPerPage, setPostsPerPage] = useState(10);

  const handleSelect = (e) => {
    setPostsPerPage(e.target.value);
  };

  return (
    <section id="recentStats">
      <div className="wrapper">
        <h2>Recent Stats</h2>
        <div className="filter-posts">
          <select
            name=""
            id=""
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option value="10" defaultValue>
              10
            </option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <table className="room-stats-display">
          <thead>
            <tr>
              <th>Date</th>
              <th>Room</th>
              <th>Passed</th>
              <th>Time</th>
              <th>Players</th>
              <th>Hints</th>
            </tr>
          </thead>
          <tbody>
            {recentData.map((data, index) => {
              console.log(postsPerPage);
              const { date, hint, name, pass, player, time } = data;
              return (
                <tr key={index}>
                  <td>{date}</td>
                  <td>{name}</td>
                  <td>{pass}</td>
                  <td>{time}</td>
                  <td>{player}</td>
                  <td>{hint}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentStats;
