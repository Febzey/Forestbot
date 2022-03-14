import date              from 'date-and-time';
import TimeAgo           from 'javascript-time-ago';
import { createRequire } from "module"; 
const require = createRequire(import.meta.url); 
const en = require('javascript-time-ago/locale/en.json') 

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US');

export const timeAgoStr = (time: number) => timeAgo.format(time);

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dateTime = () => {
    const t:date = new Date();
    const p:string = date.compile("MMM DD/YY");
    return date.format(t, p) + " at " + date.format(t, "hh:mmA [CDT]");
}

export const dhms = (time: number | string) => {
    if (typeof time === 'string') time = parseInt(time);
    let d: number | string, 
        h: number | string, 
        m: number | string;
    (d = Math.floor(time / (1000 * 60 * 60 * 24))),
    (h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    (m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    return `${d} Days(s) ${h} hours ${m} minutes.`;
};