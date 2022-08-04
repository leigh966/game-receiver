import { game, root } from "../Game";
import WaitingScreen from "./Waiting";

function join() {
  game.username = encodeURIComponent(
    document.getElementById("txtUsername").value
  );
  if (game.username === "") {
    alert("Please input a username");
    return;
  }
  game.ip = document.getElementById("txtIp").value;
  const url = `http://${game.ip}:${game.port}/join?username=${game.username}`;
  fetch(url)
    .then((data) => getJoinResponse(data))
    .catch((err) => alert(err));
}

/**
 *
 * @param {Response} response
 */
function getJoinResponse(response) {
  if (response.status === 201) {
    alert("Successfully joined game!");
    game.joined = true;
    root.render(<WaitingScreen />);
  } else if (response.status === 409) {
    alert("This username is already taken!");
  } else if (response.status === 429) {
    alert("The game is full!");
  }
}

export default function JoinScreen() {
  return (
    <>
      <label>Enter the ip of the host</label>
      <input id="txtIp" type="text" placeholder="192.168.?.?" />
      <br />

      <label>Pick a username</label>
      <input id="txtUsername" type="text" placeholder="Username" />
      <button type="button" onClick={join}>
        Join
      </button>
    </>
  );
}
