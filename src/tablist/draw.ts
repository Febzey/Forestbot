import Canvas from 'canvas';
import database from '../database/createPool.js';
export default function draw(names: string[]) {

  let width = Math.ceil(names.length / 16) * 278;

  Canvas.registerFont("./assets/mc.otf", { family: "mc" });

  const canvas = Canvas.createCanvas(width + 2, 350);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.font = "16px mc";

  const loadPing = (ping: number) => {
    if (ping === null || ping === undefined || ping < 0)
      return "./assets/signal_0.png";
    if (ping < 150) return "./assets/signal_5.png";
    if (ping < 300) return "./assets/signal_4.png";
    if (ping < 600) return "./assets/signal_3.png";
    if (ping < 1000) return "./assets/signal_2.png";
    return "./assets/signal_1.png";
  }

  const drawBlock = (x: any, z: any, name: string, ping: number) => {
    ctx.fillStyle = "#D3D3D3";
    ctx.globalAlpha = 1;
    ctx.fillRect(x + 2, z, 276, 20);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";

    Canvas.loadImage(`https://mc-heads.net/avatar/${name}/16`)
      .then((img) => {
        ctx.drawImage(img, x + 5, z + 2, 16, 16);
      });

    Canvas.loadImage(loadPing(ping))
      .then((img: any) => {
        ctx.drawImage(img, x + 259, z + 2, 16, 16);
      });

    ctx.fillText(name, x + 23, z + 16);
  }

  const renderTab = (a: any) => {
    let z = 0;
    let x = 0;
    a.forEach((i: any) => {
      if (z > 330) {
        x = x + 278;
        z = 0;
      }
      let splt = i.split(":");
      drawBlock(x, z, splt[0], splt[1]);
      z = z + 22;
    });
  }

  renderTab(names);

  setTimeout(() => {
    const imageAsBase64 = canvas.toDataURL("image/png");
    database.query("UPDATE Misc SET tablist = ?", [imageAsBase64]);
  }, 2000);

};