//Redirect all traffic from http to https.
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const app = express();
app.use(requireHTTPS);

// Serve our static files.
app.use(express.static('./dist/angular-crash-course'));

//Wait for a request to any path and redirect all of the requests to index.html
app.get('/', function(req, res) {
    res.sendFile('index.html', {root: 'dist/angular-crash-course/'}
  );
});

  //Listen for requests at the PORT specified by env variables or the default Heroku port, which is 8080
app.listen(process.env.PORT || 8080);


// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json'); 
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3200;

// server.use(middlewares);
// server.use(router);

// server.listen(port);


// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('./db.json');
// const middlewares = jsonServer.defaults({
//   //static: './build'
// });
// const PORT = process.env.PORT || 4200;
// server.use(middlewares);
// server.use(jsonServer.rewriter({
//   '/api/*': '/$1',
// }))
// server.use(router);
// server.listen(PORT, () => {
//   console.log('Server is running');
// });