let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

request("https://www.reddit.com", function(error, response, body) {
    if(error) {
        console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    let $ =async () => await cheerio.load(body);


    $('div#siteTable > div.link').each(function( index ) {
        let title = $(this).find('p.title > a.title').text().trim();
        let score = $(this).find('div.score.unvoted').text().trim();
        let user = $(this).find('a.author').text().trim();
        console.log("Title: " + title);
        console.log("Score: " + score);
        console.log("User: " + user);
        fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
    });

});
