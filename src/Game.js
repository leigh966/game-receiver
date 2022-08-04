import { createRoot } from "react-dom/client";

class Game {
  ip = "";
  username = "";
  started = false;
  message = "";
  cards = [];
  options = [];
  joined = false;
  port = 9669;
}
export var game = new Game();
export const root = createRoot(document.getElementById("root"));
