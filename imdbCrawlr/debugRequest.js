const rq = require('request-promise');

(async()=>{
    console.log('Initial Request');
    try{
        let status = await rq({
            uri: 'https://httpbin.org/status/200',
            resolveWithFullResponse: true,
        });
    }catch(response){
          if(response.statusCode === 300){
              console.log("We Good.")
          }else{
              console.log(`someshit happened: ${response}`)
              process.exit(1);
          }
    }
    

    debugger;
})();