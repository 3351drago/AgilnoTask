var func = require("../helpers/helpers");


const shortUrlBuffer = []; 


exports.urlShort = function (req, res) {
    res.setHeader("Content-Type", "application/json");

    var postUrl = req.body.url;
    if (postUrl.startsWith("http://") || postUrl.startsWith("https://")) {
        var short_url = func.shortenUrlName(postUrl);   //gets short url
        short_url = func.isShortUrlSame(short_url,shortUrlBuffer);   //ads a number if the short url is already in the array
        var urls = {
            url: postUrl,
            short_url: short_url
        }
        shortUrlBuffer.push(urls);
        res.send(urls);
    }
    else {
        var expandedUrl = "http://" + postUrl;
        var short_url = func.shortenUrlName(postUrl);
        short_url = func.isShortUrlSame(short_url,shortUrlBuffer);
        var urls = {
            url: expandedUrl,
            short_url: short_url
        }
        shortUrlBuffer.push(urls);
        res.send(urls);
    }
};


exports.urlRedirect = function (req, res) {
    var shortUrl = req.params.shorturl;
    var isSame = false;
    var urlIndex = '';

    for (let i = 0; i < shortUrlBuffer.length; i++){
        if(shortUrlBuffer[i].short_url.replace('/','')===shortUrl){
            isSame=true;
            urlIndex = i;
        }
    }

    if(isSame == true){
        // res.redirect(301, shortUrlBuffer[urlIndex].url);
        res.set('location', shortUrlBuffer[urlIndex].url);
        res.status(301).send()
    }
    else{
        res.send("Url not on short_url list");
    }
};
