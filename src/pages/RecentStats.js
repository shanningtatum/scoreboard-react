import { useState } from "react";
import ReactPaginate from "react-paginate";
import { roomNames } from "../components/roomNames";
import { BiEdit, BiTrash } from "react-icons/bi";

const RecentStats = ({ recentData, getRoomStats }) => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [userPosts, setUserPosts] = useState(
    recentData.slice(0, recentData.length).reverse()
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [popupModal, setPopupModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const pagesVisited = pageNumber * postPerPage;

  const editButton = (e) => {
    console.log(e.target);
    // popupModal ? setPopupModal(false) : setPopupModal(true);
    // setModalMessage("Are you sure you want to edit this stat?");
  };
  const deleteButton = (e) => {
    console.log(e.target.parentElement.parentElement);
    popupModal ? setPopupModal(false) : setPopupModal(true);
    setModalMessage(`Are you sure you want to delete this stat?`);
  };

  const displayStats = userPosts
    .slice(pagesVisited, pagesVisited + postPerPage)
    .map((stat, index) => {
      const { date, hint, name, pass, player, time } = stat;
      return (
        <tr key={index}>
          <td>{date}</td>
          <td>{name}</td>
          <td>{pass === "true" ? "Yes" : "No"}</td>
          <td>{time}</td>
          <td>{player}</td>
          <td>{hint}</td>
          {editMode ? (
            <td>
              <button className="reactButton">
                <BiEdit
                  className="reactIcon"
                  title="Edit this stat"
                  onClick={(e) => editButton(e)}
                />
              </button>
              <button className="reactButton">
                <BiTrash
                  className="reactIcon"
                  title="Delete this stat"
                  onClick={(e) => deleteButton(e)}
                />
              </button>
            </td>
          ) : null}
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

  const editPost = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const yesConfirmDelete = () => {
    setPopupModal(false);
    setModalMessage("Are you ABSOLUTELY sure you want to do this?");
    setConfirmModal(true);
  };

  const deletePost = () => {
    console.log("deleted");
    setConfirmModal(false);
    setModalMessage("Stat successfully deleted!");
    setSuccessModal(true);
  };

  return (
    <section id="recentStats" className="recent-stats">
      {/* Popup Modal */}
      <div className={popupModal ? "error-modal active" : "error-modal"}>
        <div className="modal-container">
          <p>{modalMessage}</p>
          <div className="popupModalMessage">
            <button onClick={() => yesConfirmDelete()}>Yes</button>
            <button onClick={() => setPopupModal(false)}>No</button>
          </div>
        </div>
      </div>
      {/* Confirm Modal */}
      <div className={confirmModal ? "error-modal active" : "error-modal"}>
        <div className="modal-container">
          <p>{modalMessage}</p>
          <div className="popupModalMessage">
            <button onClick={() => deletePost()}>DELETE IT ALREADY!</button>
            <button onClick={() => setConfirmModal(false)}>
              On second thought...
            </button>
          </div>
        </div>
      </div>
      {/* Success message */}
      <div className={successModal ? "error-modal active" : "error-modal"}>
        <div className="modal-container">
          <p>{modalMessage}</p>
          <div className="popupModalMessage">
            <button onClick={() => setSuccessModal(false)}>Ok!</button>
          </div>
        </div>
      </div>
      {/* restof the code */}
      <div className="wrapper">
        <h2>Recent Stats</h2>
        <div className="action-container">
          <div className="edit-posts">
            <button
              onClick={() => {
                editPost();
              }}
            >
              {editMode ? `Cancel Editing` : `Edit`}
            </button>
          </div>
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
                  <option value={room.name} key={index + 1}>
                    {room.name}
                  </option>
                );
              })}
            </select>
          </div>
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
              {editMode ? <td>&nbsp;</td> : null}
            </tr>
          </thead>
          <tbody>
            {userPosts === "" ? (
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
