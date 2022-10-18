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

export const calculateTime = (room, time) => {
  // take time, if it has : , replace it with ''
  time = time.replace(":", "");

  // makes time 4 digits so it can be spliced evenly
  if (time.length <= 3) {
    time = time.padStart(4, "0");
  }

  // take the last two digits of time - this will be seconds
  const seconds = time.slice(-2);

  // ERROR HANDLING: If user inputs an invalid time where the seconds is greater than 59, it will return an error
  if (time.length >= 4 && parseInt(seconds) > 59) {
    return `Invalid Entry: Seconds`;
  }

  // take the remaining digits of time - this will be minutes
  const minutes = time.slice(0, 2);

  // ERROR HANDLING: If user inputs an invalid time where the minutes is greater than 75, it will return an error
  if (room === "The Last Laugh" && parseInt(minutes) > 75) {
    return "Invalid Entry: Minutes";
  } else if (parseInt(minutes) > 60) {
    return "Invalid Entry: Minutes";
  }

  // if seconds is 00, no need to carry over the 10s in the 60 seconds
  if (seconds === "00") {
    const remainingSeconds = seconds;
    if (room === "The Last Laugh") {
      const remainingMinutes = 75 - minutes;

      time = `${remainingMinutes}:${remainingSeconds}`;
      return time;
    } else {
      const remainingMinutes = 60 - minutes;

      time = `${remainingMinutes}:${remainingSeconds}`;
      return time;
    }

    // if seconds is more than 00, need to borrow from 10s in the 60 seconds, essentially taking a minute -- hence why the minutes is subtracted by (total time - 1min)
  } else {
    const remainingSeconds = 60 - seconds;

    if (room === "The Last Laugh") {
      const remainingMinutes = 74 - minutes;

      time = `${remainingMinutes}:${remainingSeconds}`;
      return time;
    } else {
      const remainingMinutes = 59 - minutes;

      time = `${remainingMinutes}:${remainingSeconds}`;
      return time;
    }
  }
};
