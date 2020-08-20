const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = 3010;

app.use('/:id', express.static(path.resolve(__dirname, './../public')));
// app.use(express.static(path.resolve(__dirname, './../public')));
// app.use(express.static(path.resolve(__dirname, './../dist')));


app.use('/:id/bag/:id/', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/:id/similar/:id/', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/:id/pictures/:id', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/:id/reviews/:id', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
// app.get('', function(req, res) {
//   res.sendFile('../public/index.html');
// });

app.listen(port, () => {
  console.log('Listening in on port', port);
});