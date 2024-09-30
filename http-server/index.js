const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse command line arguments
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

// Function to serve files
const serveFile = (filePath, res, contentType = 'text/html') => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404: File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// Create HTTP server
const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/home.html') {
        // Serve home.html
        const filePath = path.join(__dirname, 'home.html');
        serveFile(filePath, res);
    } else if (url === '/project') {
        // Serve project.html
        const filePath = path.join(__dirname, 'project.html');
        serveFile(filePath, res);
    } else if (url === '/registration') {
        // Serve registration.html
        const filePath = path.join(__dirname, 'registration.html');
        serveFile(filePath, res);
    } else if (url.endsWith('.css')) {
        // Serve CSS file
        const filePath = path.join(__dirname, url);
        serveFile(filePath, res, 'text/css');
    } else if (url.endsWith('.js')) {
        // Serve JavaScript file
        const filePath = path.join(__dirname, url);
        serveFile(filePath, res, 'application/javascript');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404: Page Not Found</h1>');
    }
});

// Start server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
