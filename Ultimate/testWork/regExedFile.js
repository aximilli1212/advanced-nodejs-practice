const fetchLinks = require('./fullFetch');
var events = require('events');
const fs = require('fs');
var ndjson = require( "ndjson" );

//create an object of EventEmitter class by using above reference
var em = new events.EventEmitter();

// const url = "http://www.qbelimited.com";
const url = "http://dff.qbelimited.com";
const domain = new URL(url).origin;
let reqData = {url:url,rex:/qbe/i,depth:3};

     // Remove Duplicates from returned links
    const getUniqueLinks = (arrayObj)=>{
     return arrayObj.filter((link, index) => {
        const _link = JSON.stringify(link);
        return index === arrayObj.findIndex(obj => {
          return JSON.stringify(obj) === _link;
        });
      });
}

    // Save response into a ndjson.json file
const createNdjson = (data)=>{
     var transformStream = ndjson.stringify();
     var outputStream = transformStream.pipe( fs.createWriteStream( __dirname + "/ndata.ndjson" ) );
     // Iterate over the records and write EACH ONE to the TRANSFORM stream individually.
     data.forEach(
         function iterator( record ) {
             transformStream.write( record );
         }
     );
      //close stream
     transformStream.end();
    }

    //Raw split and filter Urls for crawl
    const urlPath = (u,d)=>{
     const urlObject = new URL(u);
    let pathString = urlObject.pathname;
    return pathString.split('/').length - 1 <= d  ? pathString : null ;
    };

    // Recursive Crawl webpages
em.on('crawlHere',(dset)=>{
    let dataSet = [];
    fetchLinks(dset).then(response =>{
        for(let i = 0; i <= dset.depth; i++){ //getting depth links
            for(let singleLink of response){
                let newLevel = urlPath(singleLink,dset.depth); // raw split with slash as delimiter
                if(newLevel){
                    dataSet.push({url:domain+newLevel});
                }
            }
        }

       let slimSet = getUniqueLinks(dataSet);

       console.log(slimSet);
        createNdjson([{regex:`"${dset.rex}"`,links:slimSet}]);
        console.log({count:slimSet.length});
    }).catch(err=>{
        console.log(err);
    });
})

em.emit('crawlHere',reqData);
