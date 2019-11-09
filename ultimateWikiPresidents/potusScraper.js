const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./potusParse');
const url = 'https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States';

rp(url)
    .then(function(html) {
        //success!
        const wikiUrls = [];
        for (let i = 0; i < 45; i++) {
            wikiUrls.push($('big > a', html)[i].attribs.href);
        }

        // On getting the name from each page we parse it to get the birthdays

        return Promise.all(
            wikiUrls.map(url=> {
                return potusParse('https://en.wikipedia.org' + url);
            })
        );
    })
    .then(presidents=> {
        console.log(presidents);
    })
    .catch(function(err) {
        //handle error
        console.log(err);
    });
