const cheerio = require('cheerio');
var chalk = require( "chalk" );
const request = require('request-promise');
const fs = require('fs');
var ndjson = require( "ndjson" );

const URLS = ["https://www.imdb.com/title/tt6811018/?ref_=ttls_li_tt",
               "https://www.imdb.com/title/tt0240772/" 
];

console.log('running now');
  
(async ()=>{
    let moviesData = [];
    for(let movie of URLS){
        const response = await request({
            uri:movie,
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
    }

    fs.writeFileSync('./data.json', JSON.stringify(moviesData), 'utf-8');
    

        //  Save response into an ndJson file

            var transformStream = ndjson.stringify();

            var outputStream = transformStream.pipe( fs.createWriteStream( __dirname + "/ndata.ndjson" ) );
            // Iterate over the records and write EACH ONE to the TRANSFORM stream individually.
            moviesData.forEach(
                function iterator( record ) {
                    transformStream.write( record );
                }
            );
             //close sream
            transformStream.end();

            // Once ndjson has flushed all data to the output stream, let's indicate done.
            outputStream.on(
                "finish",
                function handleFinish() {

                    console.log( chalk.green( "ndjson serialization complete!" ) );
                    console.log( "- - - - - - - - - - - - - - - - - - - - - - -" );

                }
);


    console.log(moviesData);
    
})();