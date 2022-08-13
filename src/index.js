import { root, game } from "./Game.js";
import JoinScreenStart from "./screens/Join.js";
import WaitingScreen from "./screens/Waiting.js";
import "./stylesheet.css";

export default function App() {
  if (!game.joined) {
    return <JoinScreenStart />;
  } else {
    return <WaitingScreen />;
  }
}

root.render(<App />);
