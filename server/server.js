const http = require('http');

const websocketServer = require("websocket").server;
//const httpServer = http.createServer(); 
//httpServer.listen(7070, () => console.log("Open on 7070")); 

//module.exports()
/* const app = require('express')();
app.get("/", (req, res)=> res.sendFile(__dirname + "/index.html")); 
app.listen(9091, () => console.log('Listening on http port 9091'));
//this will serve the HTML page */

const wsServer = new websocketServer('ws://localhost:7070')  //This guy has become httpServer property

clients = {}; //hashmap for clients
games = {}; // hashmap for gameid
maxPlayers = 5;



wsServer.on("request", request => {

    const connection = request.accept(null, request.origin); //null means accept any. 
    //This is the connection any client has to the server
    connection.on("open", () => console.log("opened!"));
    connection.on("closed", () => console.log("closed!"));
    connection.on("message", () => message => {

        const result = JSON.parse(message.utf8Data); //message received from client

        if (result.method === "create") {
            const clientId = result.clientId; // who are you
            const gameId = guid();
            games[gameId] = {
                "id": gameId,
                "track": [],
                "clients": []

            } //instance of game    



        const payLoad = {
            "method": "create",
            "game" : games[gameId]
        }
        const con = clients[clientId].connection; // give the connection needed
        con.send(JSON.stringify(payLoad)); //sent to server. new game created
    }

    if (result.method === "join") {

        const clientId = result.clientId;
        const gameId = result.gameId;
        const game = games[gameId];

        if (game.clients.length > maxPlayers) {
            console.log("Sorry, maximum players reached!");
            return;
        }

        // avatar code

        //if (game.clients.length === maxPlayers || result.method === "start") updateGameState();

        const payLoad = {
            "method": "join",
            "game" : game 
        }
        
        //Tells clients who has joined. Create new track 
        game.clients.forEach(c => {

            clients[c.clientId].connection.send(JSON.stringify(payLoad));


        })

    }

        

        if (result.method === 'start') {

            const clientId = result.clientId;
            const gameId = result.gameId;
            const game = games[gameId];
            let tracks = result.track;

            game.clients.forEach(c => {
                game.track.push(`Track${clientId}.mp3`);
            })

            const payLoad = {
                "method": "start",
                "game" : game,
                "tracks": game.track,
                "clients": game.clients,
                "round": 1,

            }

            con.send(JSON.stringify(payLoad));

            
        }

        if (result.method === 'roundOver') {
            const clientId = result.clientId
            const gameId = result.gameId;
            const game = games.gameId;
            const round = result.round;

            if (round == game.clients.length) {
                endGame()
            }

            const payLoad = {
                "method": "roundOver",
                "game": game,
                "tracks": game.track,
                "round": round + 1
            }

            con.send(JSON.stringify(payLoad));



        }




    connection.send(JSON.stringify(payLoad)); //Sent to user. Need to parse it.
    //send back the client connect

    })

// generate a new client ID
const clientId = guid();
clients[clientId] = { //mapping of client to a connection
    "connection": connection
}

//payload is information sent back from server to client
const payLoad = {
    "method": "connect",
    "clientId": clientId //This is the user

}


})

/*function endGame() {




} */


//These two functions generate a unique guid
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
let guid = () => {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}


