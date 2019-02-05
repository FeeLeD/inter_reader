var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

var API_KEY = process.env.YA_TRAN_KEY;
var URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?";

function accept(clientRequest, responseToClient) 
{

  if (clientRequest.url.startsWith('/translate')) 
  {
  	var qStringIn = clientRequest.url.split('\?')[1];
    var options = querystring.parse(qStringIn);
    var qStringOut = querystring.stringify({ key: API_KEY, text: options.word, lang: 'en-ru'});
    var urlToTranslator = URL + qStringOut;

 	var requestToTranslator = https.request(urlToTranslator, function(translatorResponse){
 		translatorResponse.on('data', (chunk) => {
  			console.log(`Received ${chunk}.`);
  			var parsedResponse = JSON.parse(chunk);
  			console.log(parsedResponse.text[0]);
  			responseToClient.write(parsedResponse.text[0]);
  			responseToClient.end();
		});
 	});

 	requestToTranslator.end();
 	console.log('finished');
  } 
  else 
    file.serve(clientRequest, responseToClient);
}


if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}