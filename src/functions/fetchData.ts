import fetch from 'node-fetch';
import { apiUrl } from '../config.js';


const Fetch = async (url: string) => {
    try {
        const unParsedData: any = await fetch(`${apiUrl}${url}${process.env.DATABASE === 'eusurvival' && 'eusurvival'}`);
        const data = await unParsedData.json();
        if (data.error) return false;
        return data
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
export default Fetch;