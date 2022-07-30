import { game, root } from "../Game";

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
      console.log(data.started);
      console.log(data);
      console.log(data.message);
      if (data.started) {
        displayMessage("The game has started");
        root.render(game.message);
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
  tick();
  interval = setInterval(tick, 1000);
}

var interval;
