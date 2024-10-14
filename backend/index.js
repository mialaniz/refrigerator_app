const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const http = require('http');
const predictRouter = require('./routes/predict');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

//Middleware that sends a link to the router.
app.use('/predict', predictRouter);

app.get('/', function (req, res) {
  res.send("launched");
  return res.sendFile(path.join(__dirname, "build", "index.html"))
})

const port = process.env.PORT || '8080';

app.set('port', port);
const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
  console.log('Listening on ' + (port));
});
