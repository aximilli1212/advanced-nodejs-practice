const rp = require('request-promise');
const $ = require('cheerio');

//FIND ALL LINKS THAT MATCH THE GIVEN REGEX

const htmlPage = dset =>{
    return new Promise((resolve, reject) => {
        rp(dset.url)
            .then(function(html) {
               resolve(html);
            })
            .catch(function(err) {
                reject(err)
            });
    })
}

module.exports = htmlPage;

