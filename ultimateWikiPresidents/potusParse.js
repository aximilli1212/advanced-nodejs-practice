const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/George_Washington';

const potusParse = url =>{

    return rp(url)
        .then(function(html) {
            return {name: $('.firstHeading', html).text(),
                     age:$('.bday', html).text() }
        })
        .catch(function(err) {
            //handle error
        });

}

module.exports = potusParse;

