import { game, root } from "../Game";
import { useState } from "react";
import HostFinder from "../components/HostFinder";
import ManualJoin from "../components/ManualJoin";
import WaitingScreen from "./Waiting";

const PREVIOUS_USERNAME_KEY = "unameLast";
let storedUsername = localStorage.getItem(PREVIOUS_USERNAME_KEY);

const IP_KEY = "prevIps";
const STORED_IP_JSON = localStorage.getItem(IP_KEY);
game.rememberedAddresses = new Set(JSON.parse(STORED_IP_JSON));

export function onJoined() {
  game.rememberedAddresses.add(game.ip);
  const STRING_TO_STORE = JSON.stringify(Array.from(game.rememberedAddresses));
  localStorage.setItem(IP_KEY, STRING_TO_STORE);
  localStorage.setItem(PREVIOUS_USERNAME_KEY, game.username);
  alert("Successfully joined game!");
  game.joined = true;
  root.render(<WaitingScreen />);
}

function UsernameSelection() {
  const [username, setUsername] = useState("");
  return (
    <div id="UsernameSelectDiv">
      <label>Pick a username: </label>
      <br />
      <input
        id="txtUsername"
        type="text"
        autoComplete="off"
        placeholder="Username"
        value={storedUsername ? storedUsername : username}
        onChange={(event) => {
          storedUsername = null;
          setUsername(event.target.value);
        }}
      />
    </div>
  );
}

function JoinScreen() {
  return (
    <div id="JoinScreen">
      <UsernameSelection />
      <br />
      <HostFinder />
      <ManualJoin />
    </div>
  );
}
let first = true;
export default function JoinScreenStart() {
  return <JoinScreen />;
}
