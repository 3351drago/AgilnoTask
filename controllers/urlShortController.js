const shortUrlBuffer = []; 

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function shortenUrlName(string) {
    string = string.split('.')[0];   //splits string to an array defined by the '.' and returns the first element
    return '/' + string.charAt(0) + string.charAt(getRandomNumber(1, string.length / 2)) + string.charAt(getRandomNumber(string.length / 2, string.length));  //random short url 
}

exports.urlShort = function (req, res) {
    res.setHeader("Content-Type", "application/json");

    var postUrl = req.body.url;
    if (postUrl.startsWith("http://") || postUrl.startsWith("https://")) {
        var short_url = shortenUrlName(postUrl);
        var urls = {
            url: postUrl,
            short_url: short_url
        }
        shortUrlBuffer.push(urls);
        res.send(urls);
    }
    else {
        var expandedUrl = "http://" + postUrl;
        var short_url = shortenUrlName(postUrl);
        var urls = {
            url: expandedUrl,
            short_url: short_url
        }
        shortUrlBuffer.push(urls);
        res.send(urls);
    }
};

exports.urlRedirect = function (req, res) {
    var shortUrl = req.params.shorturl.replace('/','');

    shortUrlBuffer.forEach(url => {
        if(url.short_url.replace('/','')==shortUrl){
            console.log(url.short_url)
            res.redirect(url.url);
        }
        else
            res.send("Url has not been shortened");
    })
    
    res.send("Url has not been shortened");
};


//staviti erore i izbrisati users napraviti funkcije od svega sto se moze, ako je isti dodaj mu slovo