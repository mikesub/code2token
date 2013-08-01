/* jshint node: true */

var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var port = process.env.PORT || config.port;

http.createServer(function (request, response) {
    'use strict';

    var data = querystring.stringify({
        'grant_type': 'authorization_code',
        'client_id':  config.id,
        'client_secret': config.secret,
        'code': url.parse(request.url, true).query.code
    });

    var options = {
        'hostname': config.host,
        'path': config.path,
        'method': 'POST',
        'headers': {
            'Content-Length': data.length,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var tokenRequest = https.request(options, function(tokenResponse) {
        var body = '';
        tokenResponse.on('data', function(chunk){ body += chunk; });
        tokenResponse.on('end', function(){
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.end((JSON.parse(body).access_token || '') + '\n');
        });
    });
    tokenRequest.write(data);
    tokenRequest.end();
}).listen(port);

console.log('server running on', port);
