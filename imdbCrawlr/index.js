const cheerio = require('cheerio');
const request = require('request-promise');

const URL = "https://www.imdb.com/title/tt6811018/?ref_=ttls_li_tt";

console.log('running now');

(async ()=>{
    const response = await request(URL);
    let $ = cheerio.load(response);
    let title = $('div[id="ratingWidget"] > p > strong').text();
    console.log(title);
})();

