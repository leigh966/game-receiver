import { game, root } from "../Game";
import Blackjack from "./Blackjack";
import JoinScreen from "./Join";

var numberOfDots = 0;

function displayMessage(message) {
  console.log("message: " + message);
  game.message = message;
}

function updateWaitMessage(message) {
  numberOfDots++;
  numberOfDots = numberOfDots % 4;

  for (let i = 0; i < numberOfDots; i++) {
    message += ".";
  }
  displayMessage(message);
}

function checkIfStarted() {
  const url = `http://${game.ip}:${game.port}/blackjack?username=${game.username}`;

  fetch(url)
    .then((response) => {
      if (response.status == 401) {
        root.render(<JoinScreen />);
        clearInterval(interval);
      } else return response.json();
    })
    .then((data) => {
      if (!data) return;
      console.log(data);
      if (data.started) {
        game.cards = data.cards;
        game.options = data.options;
        root.render(<Blackjack />);
        clearInterval(interval);
      } else {
        updateWaitMessage(data.message);
      }
    })
    .catch((err) => {
      displayMessage(err.message);
    });
}

function tick() {
  checkIfStarted();
  root.render(game.message);
}

export default function WaitingScreen() {
  interval = setInterval(tick, 1000);
}

var interval;
