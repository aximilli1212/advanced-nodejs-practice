const allIn = require('./fullFetch');

const url = "https://google.com";
const domain = new URL(url).hostname;
let dset = {url:url,rex:/a/i,depth:3};


const urlPath = (u,d)=>{
     const urlObject = new URL(u);

    let pathString = urlObject.pathname;
    return pathString.split('/').length - 1 <= d  ? pathString : null ;
};

// Crawl webpages
const crawlr = (dsetter=>{
    return allIn(dsetter).then(r=>{
        for(let i = 0; i <= dsetter.depth; i++){ //getting depth links
            for(let singleLink of r){
                let newLevel = urlPath(singleLink,dsetter.depth); // raw split with slash as delimiter
                if(newLevel){
                    console.log(newLevel);
                    console.log("Shiew");
                    crawlScrapedLinks({url:domain+newLevel});
                }
            }
        }
    }).catch(err=>{
        console.log(err);
    });

});


const crawlScrapedLinks = (url,rex="/a/i",depth=3)=>{
    crawlr({url:url,rex:rex,depth:depth});
};

crawlScrapedLinks(url,'/as/i',3);


