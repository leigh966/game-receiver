import { game, root } from "../Game";
var interval;

function tick() {
  const url = `http://${game.ip}:${game.port}/blackjack?username=${game.username}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      game.options = data.options;
      if (game.options.length > 0) {
        clearInterval(interval);
        root.render(<Blackjack />);
      }
    });
}

function chooseOption(index) {
  const url = `http://${game.ip}:${game.port}/blackjack?username=${game.username}&option=${index}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      game.cards = data.cards;
      game.options = data.options;
      root.render(<Blackjack />);
      if (data.value > 21 && data.options.length > 0) {
        chooseOption(0);
        alert("Bust!");
      }
      if (data.value <= 21 && data.options.length == 0) {
        alert(data.value);
      }
    });
}

export default function Blackjack() {
  let elements = [];
  for (let index = 0; index < game.cards.length; index++) {
    elements.push(
      <img src={`./cards/${game.cards[index]}.png`} width={"30%"} />
    );
  }

  for (let index = 0; index < game.options.length; index++) {
    let option = game.options[index];
    elements.push(
      <button onClick={() => chooseOption(index)}>{option}</button>
    );
  }

  if (game.options.length === 0) {
    interval = setInterval(tick, 1000); // keep checking if it is my turn
  }

  return elements;
}
