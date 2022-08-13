import { Mutex, Semaphore, withTimeout } from "async-mutex";
import React from "react";
import { game } from "../Game";

const MARCO_BATCH_SIZE = 8;

export default class HostFinder extends React.Component {
  getIp(subnetId, hostId) {
    return `192.168.${subnetId}.${hostId}`;
  }

  async sendMarcoToIp(ip) {
    const url = `http://${ip}:${game.port}/marco/`;
    const options = {};
    const { timeout = 500 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      let response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      let data = await response.json();

      let newGames = this.state.games;
      newGames.push(data);
      this.setState({ games: newGames });
      console.log(this.state.games);
    } catch (err) {
      console.log(err);
    }
    clearTimeout(id);
  }

  async marco() {
    console.log("marco run");
    const STARTING_SUBNET = 0;
    const STARTING_HOST = 2;
    const MAX_SUBNET = 1;
    const MAX_HOST = 255;

    game.rememberedAddresses.forEach((ip) => {
      this.sendMarcoToIp(ip);
      this.searching = true;

      this.clientSempahore = new Semaphore(MARCO_BATCH_SIZE);
    });

    for (let subnet = STARTING_SUBNET; subnet <= MAX_SUBNET; subnet++) {
      for (let host = STARTING_HOST; host <= MAX_HOST; host++) {
        let ip = this.getIp(subnet, host);
        if (game.rememberedAddresses.has(ip)) continue;
        let [semNumber, releaseSemaphore] =
          await this.clientSempahore.acquire();
        this.sendMarcoToIp(ip).then(() => {
          releaseSemaphore();
          if (subnet === MAX_SUBNET && host == MAX_HOST) this.searching = false;
        });
      }
    }
  }

  onServerClicked(index) {
    document.getElementById("txtIp").value = this.state.games[index].ip;
    document.getElementById("btnJoin").click();
  }

  constructor(props) {
    super(props);
    this.state = { games: [] };
    this.marco();
  }

  render() {
    let elements = [];

    if (this.state.games.length > 0) {
      console.log(this.state.games);
      for (let index = 0; index < this.state.games.length; index++) {
        let game = this.state.games[index];
        elements.push(
          <button
            className="foundServer"
            onClick={() => this.onServerClicked(index)}
          >
            {game.name}
          </button>
        );
      }
    }

    if (this.searching) {
      elements.push(
        <img id="SearchingGif" src="https://i.stack.imgur.com/kOnzy.gif" />
      );
      elements.push(<br />);
      elements.push(<p>Searching for games...</p>);
    }
    return (
      <div id="HostFinder">
        <h3 className="joinDivHeading">Join Game:</h3>
        {elements}
      </div>
    );
  }
}
