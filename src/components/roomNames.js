// doing this so it will be easier to change things in the future
import imgOne from "../assets/room-1.jpg";
import imgTwo from "../assets/room-2.jpg";
import imgThree from "../assets/room-3.jpg";
import imgFour from "../assets/room-4.jpg";
import imgFive from "../assets/room-5.jpg";

// import firebase things
import firebase from "../firebase";
import { get, getDatabase, ref } from "firebase/database";

// get best time
export const getBestTime = (array) => {
  const bestTime = [];

  // loops through array of passed rooms to breakdown the time into a number and puts in bestTime array
  for (let i = 0; i < array.length; i++) {
    bestTime.push({
      time: parseInt(array[i].time.replace(":", "")),
      date: array[i].date,
    });
  }
  // finds the fastest time

  const fastestTime = Math.min(...bestTime.map((item) => item.time));

  const rejoinTime = [
    fastestTime.toString().slice(0, 2),
    fastestTime.toString().slice(-2),
  ].join(":");

  // loops through the array to find the index that has the best time in it and returns the object into bestDate variable
  const bestDate = array.find((element) => element.time === rejoinTime);
};

// get passrates
export const getRoomStats = () => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  get(dbRef).then((response) => {
    if (response.exists) {
      const data = response.val();

      const tempArray = [];

      for (let key in data) {
        // splits the date string so we can get the year from it
        const stringDate = data[key].date.split(" ");

        // will only push data from the selected year into tempArray
        if (stringDate[2] == "2022") {
          tempArray.push(data[key]);
        }
      }

      // First Room Total
      // -- The Elevator
      const elevatorTotal = tempArray.filter(
        (stat) => stat.name === "The Elevator"
      );
      // First Room Pass
      const elevatorPass = elevatorTotal.filter((stat) => stat.pass === "true");
      // FIRST ROOM PASSRATE
      const roomOnePassrate =
        (elevatorPass.length / elevatorTotal.length) * 100;
      // creates passrate property in the roomNames array object
      roomNames[0].passrate = roomOnePassrate.toFixed(2);
      getBestTime(elevatorPass);

      // Second Room Total
      // -- Kate's Motel
      const katesTotal = tempArray.filter(
        (stat) => stat.name === "Kate's Motel"
      );
      // Second Room Pass
      const katesPass = katesTotal.filter((stat) => stat.pass === "true");
      // SECOND ROOM PASSRATE
      const roomTwoPassrate = (katesPass.length / katesTotal.length) * 100;
      // creates passrate property in the roomNames array object
      roomNames[1].passrate = roomTwoPassrate.toFixed(2);
      getBestTime(katesPass);

      // Third Room Total
      // -- True Spies
      const trueSpiesTotal = tempArray.filter(
        (stat) => stat.name === "True Spies"
      );
      // Third Room Pass
      const trueSpiesPass = trueSpiesTotal.filter(
        (stat) => stat.pass === "true"
      );
      // THIRD ROOM PASSRATE
      const roomThreePassrate =
        (trueSpiesPass.length / trueSpiesTotal.length) * 100;
      // creates passrate property in the roomNames array object
      roomNames[2].passrate = roomThreePassrate.toFixed(2);
      getBestTime(trueSpiesPass);

      // 4th Room Total
      // -- The Last Laugh
      const lastLaughTotal = tempArray.filter(
        (stat) => stat.name === "The Last Laugh"
      );
      // 4th Room Pass
      const lastLaughPass = lastLaughTotal.filter(
        (stat) => stat.pass === "true"
      );
      // 4TH ROOM PASSRATE
      const roomFourPassrate =
        (lastLaughPass.length / lastLaughTotal.length) * 100;
      // creates passrate property in the roomNames array object
      roomNames[3].passrate = roomFourPassrate.toFixed(2);
      getBestTime(lastLaughPass);

      // Fifth Room Total
      // -- The Short Cut
      const shortCutTotal = tempArray.filter(
        (stat) => stat.name === "The Short Cut"
      );
      // Fifth Room Pass
      const shortCutPass = shortCutTotal.filter((stat) => stat.pass === "true");
      // FIFTH ROOM PASSRATE
      const roomFivePassrate =
        (shortCutPass.length / shortCutTotal.length) * 100;
      // creates passrate property in the roomNames array object
      roomNames[4].passrate = roomFivePassrate.toFixed(2);
      getBestTime(shortCutPass);
    } else {
      alert("something is wrong");
    }
    return "poop";
  });
};

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
  const currentHour = hour % 12 == 0 ? 12 : hour - 12;

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

export const roomNames = [
  {
    name: "The Elevator",
    imgUrl: imgOne,
  },
  { name: "Kate's Motel", imgUrl: imgTwo },
  {
    name: "True Spies",
    imgUrl: imgFive,
  },
  {
    name: "The Last Laugh",
    imgUrl: imgThree,
  },
  {
    name: "The Short Cut",
    imgUrl: imgFour,
  },
];
