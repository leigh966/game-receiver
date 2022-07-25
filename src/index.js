import ReactDOM from "react-dom";

/**
 *
 * @param {Response} response
 */
function getJoinResponse(response) {
  if (response.status == 201) {
    alert("Successfully joined game!");
  } else if (response.status == 409) {
    alert("This username is already taken!");
  }
}

function join() {
  const username = document.getElementById("txtUsername").value;
  const ip = document.getElementById("txtIp").value;
  const url = `http://${ip}:9669/join?username=${username}`;
  fetch(url)
    .then((data) => getJoinResponse(data))
    .catch((err) => alert(err));
}

export default function App() {
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

ReactDOM.render(<App />, document.getElementById("root"));
