import { game, root } from "../Game";
import Blackjack from "./Blackjack";

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
  const url = `http://${game.ip}:${game.port}/blackjack`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.started) {
        root.render(<Blackjack startingCards={data.cards} />);
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
