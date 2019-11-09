const htmlPage = require('./htmlFetch');
const allIn = require('./fullFetch');

let url = "https://google.com";
// let dset = {url:url,rex:/as/i};
let depth = 3;

// htmlPage(dset).then(r=>{
//     console.log(r);
// }).catch(err=>{
//     console.log(err);
// });

for(let i = 0; i <= depth; i++){
    let dset = {url:url,rex:/as/i};

    allIn(dset).then(r=>{
        console.log(r);
        console.log({count:r.length})
    }).catch(err=>{
        console.log(err);
    });
}





