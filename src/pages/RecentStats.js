import { useState } from "react";
import ReactPaginate from "react-paginate";

const RecentStats = ({ recentData, getRoomStats }) => {
  console.log(recentData);
  const [postPerPage, setPostPerPage] = useState(10);
  const [userPosts, setUserPosts] = useState(
    recentData.slice(0, recentData.length).reverse()
  );
  const [pageNumber, setPageNumber] = useState(0);

  const statsPerPage = 10;
  const pagesVisited = pageNumber * postPerPage;

  const displayStats = userPosts
    .slice(pagesVisited, pagesVisited + postPerPage)
    .map((stat) => {
      const { date, hint, name, pass, player, time } = stat;
      return (
        <tr>
          <td>{date}</td>
          <td>{name}</td>
          <td>{pass === "true" ? "Yes" : "No"}</td>
          <td>{time}</td>
          <td>{player}</td>
          <td>{hint}</td>
        </tr>
      );
    });

  const handleSelect = (e) => {
    setPostPerPage(e.target.value);
    getRoomStats();
  };

  const pageCount = Math.ceil(userPosts.length / postPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <section id="recentStats" className="recent-stats">
      <div className="wrapper">
        <h2>Recent Stats</h2>
        <div className="filter-posts">
          <select
            name=""
            id=""
            onChange={(e) => {
              handleSelect(e);
            }}
            defaultValue={"Stats Per Page"}
          >
            <option value="Stats Per Page" disabled>
              Stats Per Page
            </option>
            <option value="2">2</option>
            <option value="8">8</option>
            <option value="10">10</option>
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
          <tbody>{displayStats}</tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous Page"}
          nextLabel={"Next Page"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination-btn"}
          previousLinkClassName={"previous-btn"}
          nextLinkClassName={"next-btn"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    </section>
  );
};

export default RecentStats;
