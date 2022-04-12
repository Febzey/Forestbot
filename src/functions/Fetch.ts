import fetch from 'node-fetch';
import { config } from '../index.js';

export const fetchUser = async (user: string, type: string) => {
    const data: any = await (await fetch(`${config.config.api_url}/${type}/${user}/${config.config.mc_server}`)).json();
    if (data.error || data.Error) return false;
    return data;
}