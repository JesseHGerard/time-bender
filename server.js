// start dev server with 'npm run dev', runs express and react servers concurrently
// start production server with 'npm start'

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

const clear = require('clear');
clear();

const PORT = process.env.PORT || 3001;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("static"));

app.use(routes);


io.on('connection', function(socket){
  console.log('connection')
  socket.on('gameState', function(nextState){
    io.emit('gameState', nextState);
    console.log(`nextState: ${JSON.stringify(nextState)}`);
  });
});




// Start the API server
http.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
