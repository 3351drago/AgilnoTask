function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function shortenUrlName(string) {
    string = string.split('.')[0];   //splits string to an array defined by the '.' and returns the first element
    return '/' + string.charAt(0) + string.charAt(getRandomNumber(1, string.length / 2)) + string.charAt(getRandomNumber(string.length / 2, string.length));  //random short url 
}

function isShortUrlSame(url, array) {   //ads a number if the short url is the same
    array.forEach(element => {
        if(url===element.short_url){
            url=url+getRandomNumber(0,9);
        }
    });
    return url;
}

module.exports = {
    shortenUrlName: shortenUrlName,
    getRandomNumber: getRandomNumber,
    isShortUrlSame: isShortUrlSame
  };