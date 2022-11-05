import { useState } from "react";
import ReactPaginate from "react-paginate";
import { roomNames } from "../components/roomNames";
import { BiEdit } from "react-icons/bi";

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

  const handleSelect = (e) => {
    setPostPerPage(parseInt(e.target.value));
    setPageNumber(0);
    getRoomStats();
  };

  const handleFilter = (e) => {
    if (e.target.value === "All") {
      setUserPosts(recentData.slice(0, recentData.length).reverse());
    } else {
      setUserPosts(
        recentData.filter((post) => post.name === e.target.value).reverse()
      );
    }
  };

  const pageCount = Math.ceil(userPosts.length / postPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // need to create a function that reads the selectoption
  // goes into recent data array and only returns array of that e.target.value
  // might need to manipulate user Posts or filter user Posts to return that value

  return (
    <section id="recentStats" className="recent-stats">
      <div className="wrapper">
        <h2>Recent Stats</h2>
        <div className="filter-posts">
          <p>Filter By:&nbsp;</p>
          <select
            name="stat-per-page"
            id="stat-per-page"
            onChange={(e) => {
              handleSelect(e);
            }}
            defaultValue={"Stats Per Page"}
          >
            <option value="Stats Per Page" disabled>
              Stats Per Page
            </option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="35">35</option>
          </select>
          <select
            name="filter-post-select"
            defaultValue={"Room Name"}
            onChange={(e) => handleFilter(e)}
          >
            <option value="Room Name" disabled>
              Room Name
            </option>
            <option value="All">All</option>
            {roomNames.map((room, index) => {
              return (
                <>
                  <option value={room.name} key={index}>
                    {room.name}
                  </option>
                </>
              );
            })}
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
            {userPosts == "" ? (
              <p>Click on another page and click back to display results</p>
            ) : (
              displayStats
            )}
          </tbody>
        </table>
        <div className="sort-results">
          <p>
            Results&nbsp;
            {`${pagesVisited + 1}`} -{" "}
            {pagesVisited + postPerPage > userPosts.length
              ? userPosts.length
              : pagesVisited + postPerPage}
            &nbsp;of
            {` ${userPosts.length}`}
          </p>
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
      </div>
    </section>
  );
};

export default RecentStats;
