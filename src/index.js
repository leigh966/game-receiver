import { root, game } from "./Game.js";
import JoinScreen from "./screens/Join.js";
import WaitingScreen from "./screens/Waiting.js";

export default function App() {
  if (!game.joined) {
    return <JoinScreen />;
  } else {
    return <WaitingScreen />;
  }
}

root.render(<App />);
