import { useState } from "react";
import ReactPaginate from "react-paginate";

const RecentStats = ({ recentData, getRoomStats, fetching }) => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [userPosts, setUserPosts] = useState(
    recentData.slice(0, recentData.length).reverse()
  );
  const [pageNumber, setPageNumber] = useState(0);

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

  console.log(recentData);
  console.log(displayStats);

  // issue is that userpost is not being set at the time of loading page.

  const handleSelect = (e) => {
    setPostPerPage(parseInt(e.target.value));
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
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
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
          <tbody>{!userPosts ? "Loading..." : displayStats}</tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination-btn"}
        previousLinkClassName={"previous-btn"}
        nextLinkClassName={"next-btn"}
        disabledClassName={"pagination-disabled"}
        activeClassName={"pagination-active"}
      />
    </section>
  );
};

export default RecentStats;
