const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
var ndjson = require( "ndjson" );

const URLS = [{url:"https://www.imdb.com/title/tt6811018/?ref_=ttls_li_tt",
                     id:1,
                    poster:"https://m.media-amazon.com/images/M/MV5BYzVmYzVkMmUtOGRhMi00MTNmLThlMmUtZTljYjlkMjNkMjJkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg"}
];

console.log('running now');
  
(async ()=>{
for(let movie of URLS){

    let file = fs.createWriteStream(`${movie.id}.jpg`);

        let stream = request({ 
            uri:movie.poster,
            headers:{
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.imdb.com/title/tt6811018/?ref_=ttls_li_tt',
                'Connection':'keep-alive',
                'Cache-Control': 'max-age=0',
            }, 
            gzip: true,
        }).pipe(file);
    }

})()

