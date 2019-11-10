const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');
var ndjson = require( "ndjson" );

const URLS = [{url:"https://www.imdb.com/title/tt6811018/?ref_=ttls_li_tt",
                     id:1},
               {url:"https://www.imdb.com/title/tt0240772/", id:2} 
];

console.log('running now');
  
(async ()=>{
    let moviesData = [];
    for(let movie of URLS){
        const response = await rp({ 
            uri:movie.url,
            headers:{
                'Host': 'www.imdb.com',
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.imdb.com/title/tt6811018/?ref_=ttls_li_tt',
                'Connection':'keep-alive',
                'Cache-Control': 'max-age=0',
            },
            gzip: true,
        });
        let $ = cheerio.load(response);
        let gen = [];
        let title = $('div[id="ratingWidget"] > p > strong').html();
        let genre = $('a[href^="/genre/"]').text();
        let director = $('div.credit_summary_item:nth-child(2) > a:nth-child(2)').text().trim();
         $('a[href^="/genre/"]').each((i,elm)=>{
             let genr = $(elm).text();
             gen.push({genre:genr});
        });
           moviesData.push({
               title,
               genre,
               director,
           })

           // downloading from website
    let file = fs.createWriteStream(`${movie.id}.jpg`);
    }

    

    // fs.writeFileSync('./ndata.ndjson', JSON.stringify(moviesData), 'utf-8');
    // fs.writeFileSync('./ndata.ndjson', JSON.stringify(moviesData), 'utf-8');
    // console.log(moviesData);
    
})();

