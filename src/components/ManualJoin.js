import { game } from "../Game";
import { onJoined } from "../screens/Join";

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
    .then((response) => getJoinResponse(response.status))
    .catch((err) => alert(err));
}

/**
 *
 * @param {Response} response
 */
function getJoinResponse(status) {
  if (status === 201) {
    onJoined();
  } else if (status === 409) {
    alert("This username is already taken!");
  } else if (status === 429) {
    alert("The game is full!");
  }
}

export default function ManualJoin() {
  return (
    <div id="ManualJoin">
      <h3 className="joinDivHeading">or Enter manually:</h3>
      <label>Enter the ip of the host:</label>
      <br />
      <input id="txtIp" type="text" placeholder="xxx.xxx.xxx.xxx" />
      <br />
      <button id="btnJoin" type="button" onClick={join}>
        Join
      </button>
    </div>
  );
}
