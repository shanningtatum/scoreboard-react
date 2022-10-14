// doing this so it will be easier to change things in the future

export const roomNames = [
  "The Elevator",
  "Kate's Motel",
  "True Spies",
  "The Last Laugh",
  "The Short Cut",
];

// export const maxPlayers = 8;
// export const minPlayers = 2;

// export const maxHints = 3;
// export const minHints = 0;

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// -- Get time and date
export const calculateDate = () => {
  const timestamp = new Date();

  // get date
  const currentMonth = months[timestamp.getMonth()];
  const currentDay = timestamp.getDate();
  const currentYear = timestamp.getFullYear();

  // get time
  const hour = timestamp.getHours();
  const currentMinutes =
    timestamp.getMinutes() < 10
      ? `0${timestamp.getMinutes()}`
      : `${timestamp.getMinutes()}`;
  const timeOfDay = hour >= 12 ? "PM" : "AM";

  // converting hours
  const currentHour = hour % 12 == 0 ? 12 : hour;

  // putting it all together
  const currentTime = `${currentHour}:${currentMinutes}${timeOfDay}`;
  const currentDate = `${currentMonth} ${currentDay}, ${currentYear}`;
  return currentDate + " " + currentTime;
};
