// Create web server
var http = require('http');
// Create file system
var fs = require('fs');
// Create url
var url = require('url');
// Create path
var path = require('path');
// Create querystring
var querystring = require('querystring');

// Create server
http.createServer(function(req, res) {
    // Get the request url
    var urlPath = url.parse(req.url).pathname;
    // Get the request method
    var method = req.method;

    // Check if the request url is '/'
    if (urlPath === '/') {
        // Check if the request method is 'GET'
        if (method === 'GET') {
            // Read the file 'index.html'
            fs.readFile('index.html', function(err, data) {
                // Write the file 'index.html' to the response
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });
        }
    }

    // Check if the request url is '/comments'
    if (urlPath === '/comments') {
        // Check if the request method is 'GET'
        if (method === 'GET') {
            // Read the file 'comments.json'
            fs.readFile('comments.json', function(err, data) {
                // Write the file 'comments.json' to the response
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(data);
                res.end();
            });
        }

        // Check if the request method is 'POST'
        if (method === 'POST') {
            // Create a variable to store the data from the request
            var body = '';

            // Read the data from the request
            req.on('data', function(data) {
                // Append the data to the body
                body += data;
            });

            // When the request has ended
            req.on('end', function() {
                // Parse the body data
                var data = querystring.parse(body);

                // Read the file 'comments.json'
                fs.readFile('comments.json', function(err, fileData) {
                    // Parse the file data
                    var comments = JSON.parse(fileData);
                    // Push the new data to the comments array
                    comments.push(data);

                    // Write the comments array to the file 'comments.json'
                    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                        // Write a response
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify(comments));
                        res.end();
                    }
                });
            }
        }
    }
}).listen(3000); // Listen on port 3000
