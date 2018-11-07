'use strict';
const axios = require('axios');
const config = require('../../config').DataProvider;

const BASE = config.BaseAddress;
const TOKEN = config.Token;
function sanitizeSeries(arr){
    let sanitized = [];
    for(let val in arr){
        let o = sanitize(arr[val]);
        console.log();
        if(val.match(/(\d{4})-(\d{2})-(\d{2})/))
            o.date = val;
        sanitized.push(o);
    }
    return sanitized;
}
function sanitize(obj){
    let o = {};
    for(let key in obj){
        o[key.substring(3)] = obj[key];
    }
    return o;
}
async function Quote(identifier){
    try {
        const res = await axios.get(`${BASE}/query?function=GLOBAL_QUOTE&symbol=${identifier}&apikey=${TOKEN}`);
        if(res.data)
            return sanitize(res.data['Global Quote']);
        return [];
    } catch(err) {
        throw err;
    }
}
async function AdjustedSeries(identifier, full = false){
    try {
        const res = await axios(`${BASE}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${identifier}&outputsize=${full ? 'full' : 'compact'}&apikey=${TOKEN}`);
        if(res.data)
            return sanitizeSeries(res.data['Time Series (Daily)']);
        return [];
    } catch(err) {
        throw err;
    }
}
async function AdjustedWeekly(identifier){
    try {
        const res = await axios(`${BASE}/query?function=TIME_SERIES_WEEKLY&symbol=${identifier}&apikey=${TOKEN}`);
        if(res.data)
            return sanitizeSeries(res.data['Weekly Time Series']);
        return [];
    } catch(err) {
        throw err;
    }
}
async function Search(term){
    try {
        const res = await axios.get(`${BASE}/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${TOKEN}`);
        if(res.data)
            return sanitizeSeries(res.data['bestMatches']);
        return [];
    } catch(err) {
        console.log('Error', err);
        throw err;
    }
}
class AlphaVantage {
    static Quote(identifier) { return Quote(identifier) }
    static Search(term) { return Search(term) }
    static AdjustedSeries(identifier, fullHistory) { return AdjustedSeries(identifier, fullHistory) }
    static AdjustedWeekly(identifier) { return AdjustedWeekly(identifier) }
}
module.exports = AlphaVantage;