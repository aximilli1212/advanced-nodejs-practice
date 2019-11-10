const allIn = require('./fullFetch');

const url = "https://google.com";
const domain = new URL(url).hostname;
let dset = {url:url,rex:/a/i};
let depth = 3;

const urlPath = (u)=>{
     const urlObject = new URL(u);

    let pathString = urlObject.pathname;
    return pathString.split('/').length - 1 <= depth  ? pathString : null ;
};

// Crawl webpages
 allIn(dset).then(r=>{
        for(let i = 0; i <= depth; i++){ //getting depth links
            for(let singleLink of r){
                let newLevel = urlPath(singleLink); // raw split with slash as delimiter
                if(newLevel){
                    console.log({url:domain+newLevel});
                }
            }
        }
        console.log(r);
        // console.log({count:r.length})
    }).catch(err=>{
        console.log(err);
    });
