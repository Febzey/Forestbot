import { mineflayer } from 'prismarine-viewer';
import { bot } from '../index.js';
import { bot_config } from '../config.js';
const viewer = () => mineflayer(bot, { port: bot_config.liveViewerPort});
export default viewer;