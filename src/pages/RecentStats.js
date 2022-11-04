import { useState } from "react";
import ReactPaginate from "react-paginate";
import { roomNames } from "../components/roomNames";

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
    console.log(recentData);
    setUserPosts(recentData.slice(0, recentData.length).reverse());
    console.log(userPosts);
    setUserPosts(recentData.filter((post) => post.name === e.target.value));
    console.log(userPosts);
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
                <option value={room.name} key={index}>
                  {room.name}
                </option>
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
          <tbody>{!userPosts ? "Loading..." : displayStats}</tbody>
        </table>
        <div className="sort-results">
          <p>
            Results&nbsp;
            {pagesVisited + postPerPage > recentData.length
              ? recentData.length
              : `${pagesVisited + postPerPage}`}
            &nbsp;of
            {` ${recentData.length}`}
          </p>
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
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
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
      </div>
    </section>
  );
};

export default RecentStats;
