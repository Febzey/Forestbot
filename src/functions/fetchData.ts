import fetch from 'node-fetch';
import { apiUrl, serverString } from '../config.js';


const Fetch = async (url: string) => {
    try {
        const unParsedData: any = await fetch(`${apiUrl}${url}${serverString}`);
        const data = await unParsedData.json();
        if (data.error) return false;
        return data
    }
    catch (e) {
        return false;
    }
}
export default Fetch;