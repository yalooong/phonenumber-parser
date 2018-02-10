// app.js

// call packages
var express = require('express');
var bodyParser = require('body-parser');
var upload = require('express-fileupload');
var libphonenumber = require('libphonenumber-js');
var https = require('https');
var http = require('http');

var app = express();
var port = process.env.port || 3000;

// Routes for API
var router = express.Router();

// test route
router.get('/test', (req, res) => {
    res.json({message: 'it works.'});
});

// GET /api/phonenumbers/parse/text/{...string...}
// allow sending small snippets of text to be parsed.
router.get('/text/:string', (req, res) => {
    var rt = [];
    var text = req.params.string;
    var result = libphonenumber.parse(text, "CA");

    if (!isEmpty(result)) {
        rt.push(libphonenumber.format(result, 'National'));
    }
    return res.status(200).send(rt);
});

// GET /api/phonenumbers/parse/url/{...website...}
// allow sending of url links to be parsed.
//note need  to send as www.{...string...}.com to work properly work
router.get('/http/:string', (req, res) => {
    var rt = [];

    var options = {
      host: req.params.string,
      path: '/',
    }
    //note the ress. had to put that because it conflicts with res in router
    var request = http.request(options, function (ress) {
      var data = '';
      ress.on('data', function (chunk) {
        data += chunk;
      });
      ress.on('end', function () {
        var textVersion = require("textversionjs");
        var plainText = textVersion(data);
        var phrases = data.split("\n");
        for(var i = 0; i < phrases.length; i++){
          var result = libphonenumber.parse(phrases[i], "CA");
          if (!isEmpty(result)) {
              rt.push(libphonenumber.format(result, 'National'));
          }
        }
        return res.status(200).send(rt);
      });
    });
    request.on('error', function (err) {
      console.log(err.message);
    });
    request.end();
});

// GET /api/phonenumbers/parse/https/{...website...}
// allow sending of url links to be parsed.
// note need  to send as www.{...string...}.com to work properly work
router.get('/https/:string', (req, res) => {
    var rt = [];

    var options = {
      host: req.params.string,
      path: '/',
    }
    //note the ress. had to put that because it conflicts with res in router
    var request = https.request(options, function (ress) {
      var data = '';
      ress.on('data', function (chunk) {
        data += chunk;
      });
      ress.on('end', function () {
        var textVersion = require("textversionjs");
        var plainText = textVersion(data);
        var phrases = data.split("\n");
        for(var i = 0; i < phrases.length; i++){
          var result = libphonenumber.parse(phrases[i], "CA");
          if (!isEmpty(result)) {
              rt.push(libphonenumber.format(result, 'National'));
          }
        }
        return res.status(200).send(rt);
      });
    });
    request.on('error', function (err) {
      console.log(err.message);
    });
    request.end();
});

// send file page
router.get('/file', (req, res) => {
    res.sendFile(__dirname + "/fileupload.html");
});

// POST /api/phonenumbers/parse/file
router.post('/file', function(req, res) {

    // nothing uploaded.
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    } else {
        var mfile = req.files.mfile;
        var rt = [];

        var fs = require('fs');
        fs.readFileSync(mfile.name).toString().split('\n').forEach(function (line) {
            var phone = libphonenumber.parse(line, "CA");

            if (!isEmpty(phone)) {
                rt.push(libphonenumber.format(phone, 'National'));
            }
        })

        return res.status(200).send(rt);
    }
});

// localhost status
app.get('/', (req, res) => {
    return res.status(200).send('API works');
});

// Register
app.use(upload());
app.use('/api/phonenumbers/parse', router);

// Start server
app.listen(port);
console.log('The server is on port ' + port);

// for testing
module.exports = app;

// util function to check if object is empty
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}
