var Promise = require('bluebird');
var MongoDB = Promise.promisifyAll(require("mongodb"));
var MongoClient = Promise.promisifyAll(MongoDB.MongoClient);
var cheerio = require('cheerio');
var http = require('http');

var urls = [
    'http://www.magentocommerce.com/certification/directory/index/?q=&country_id=AU&region_id=&region=vic&certificate_type=',
    'http://www.magentocommerce.com/certification/directory/index/?q=&country_id=AU&region_id=&region=victoria&certificate_type='
];
var i = 0;
var pause = 10 * 1000;

var fetch = function (url) {
    console.log('Processing', url);
    return new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            var body = "";
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body);
            })
        });
    });
};

var process = function (url) {
    var devs = [];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            $('.results > .row').eq(0).remove(); // remove header row
            return $('.results > .row');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = {
                    name: $(this).find('div').eq(0).text().trim(),
                    company: $(this).find('div').eq(1).text().trim(),
                    location: $(this).find('div').eq(2).text().trim().replace(',Australia', ', Australia'),
                    certificates: $(this).find('div').eq(3).html().replace('\n', '').trim(),
                    href: $(this).attr('onclick').match(/'(.*?)'/)[1]
                };
                devs.push(dev);
            });
        })
        .then(function () {
            return MongoClient.connectAsync('mongodb://localhost:27017/magento');
        })
        .then(function (db) {
            this.db = db;
            return Promise.all(devs.map(function (dev) {
                return db.collection('melbourne').updateAsync({'name': dev.name}, {$set: dev}, {upsert: true});
            }))
        })
        .then(function (result) {
            console.log('Upserted', result.length, 'records');
            if ($('.main-section .pager a.next').length > 0) {
                setTimeout(function () {
                    process($('.main-section .pager a.next').attr('href'));
                }, pause);
            }
            else if (++i < urls.length) {
                setTimeout(function () {
                    process(urls[i]);
                }, pause);
            }
            else {
                console.log('No more to process, exiting.');
            }
            this.db.close();
        })
        .catch(function (err) {
            throw err;
        });
}

process(urls[i]);
