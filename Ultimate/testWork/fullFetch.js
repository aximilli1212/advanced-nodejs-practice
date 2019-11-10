const rp = require('request-promise');
const $ = require('cheerio');

//FIND ALL LINKS THAT MATCH THE GIVEN REGEX

const fetchLinks = dset =>{
    const prepareLink = (ln)=>{
        // Trim and append domain to orphaned links eg:'/profile'
        return ln.trim().startsWith('http') ? ln : `${dset.url}${ln}`;
    };
    return new Promise((resolve, reject) => {
        rp(dset.url)
            .then(function(html) {
                const matchedUrls = [];
                // fetch links as array with cheerio
                const mlinks = $('a', html);
                //traverse links, filter for regEX and generate array
                mlinks.each((i, link) => {
                    if(link.attribs.href.match(dset.rex)){
                        matchedUrls.push(prepareLink(link.attribs.href));
                    }
                });
               resolve(matchedUrls);
            })
            .catch(function(err) {
                reject(err)
            });
    })
}

module.exports = fetchLinks;



