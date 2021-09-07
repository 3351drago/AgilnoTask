var express = require('express');
var router = express.Router();

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

function shortUrlName(string){
    string = string.split('.')[0];   //splits string to an array defined by the '.' and returns the first element
    return '/'+string.charAt(0)+string.charAt(getRandomNumber(1,string.length/2))+string.charAt(getRandomNumber(string.length/2,string.length));  //random short url 
}

exports.urlShort = function(req, res) {
    res.setHeader("Content-Type","application/json");
    var postUrl = req.body.url;
    if(postUrl.startsWith("http://") || postUrl.startsWith("https://")){
        var short_url = shortUrlName(postUrl)
        var urls = {
            url: postUrl,
            short_url: short_url
        }
        res.send(urls);
    }
    else{
        var expandedUrl = "http://"+postUrl
        var short_url = shortUrlName(postUrl)
        var urls = {
            url: expandedUrl,
            short_url: short_url
        }
        res.send(urls);
    }
};


//staviti erore i izbrisati users napraviti funkcije od svega sto se moze