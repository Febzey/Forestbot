import draw from './draw.js';
import { bot } from '../index.js';
export default function tab() {
  setInterval(function () {
    let arr = [];
    const playerList = Object.keys(bot.players);
    playerList.forEach(function (i) {
      if (!bot.players[i]) return console.log("Unexpected Error.");
      let name = bot.players[i].username, ping = bot.players[i].ping;
      arr.push(`${name}:${ping}`);
    });
    draw(arr.sort())
  }, 20000)
}