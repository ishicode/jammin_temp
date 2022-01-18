// Connection between client side and server.js

let clientId = null;
let gameId = null;
let playerColor = null;

let ws = newWebsocket("ws://localhost:7070)");

function createGame() {
    addEventListener("click", e => {
    
    const  payLoad = {
        "method": "create",
        "clientId": clientId
    }

    ws.send(JSON.stringify(payLoad));
    
    })
};

function joinGame() {
    addEventListener("click", e => {

        const payLoad = {
            "method": "join",
            "clientId": clientId,
            "gameId": gameId
        }

        ws.send(JSON.stringify(payLoad));
    })

};

function startGame() {
    addEventListener("click", e => {

        const payLoad = {
            "method": "start",
            "game" : game,
            "tracks": game.track,
            "clients": game.clients,
            "round": 1
        }

        ws.send(JSON.stringify(payLoad));
    })
};


function roundOver() {
    addEventListener("click", e => {

        const payLoad = {
            "method": "roundOver",
            "game": game,
            "tracks": game.track,
            
        }

        ws.send(JSON.stringify(payLoad));
    })
}