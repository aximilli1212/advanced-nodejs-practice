const Crawler = require("crawler").Crawler;

let c = new Crawler({
    "maxConnections":10,
})

//This will be called for each crawled page

function pine (error, result,$){
    if(result){
        let page = result.body;
        let res = page.match(/akumia/i);
        if(res && res.length > 0){
            console.log(result.body);
        }
    }

    $("a").each(function(index,a){
        console.log(a.href);
        c.queue(a.href);
    })

}

//Queue just one url, with default callback
c.queue("http://construction.com");
