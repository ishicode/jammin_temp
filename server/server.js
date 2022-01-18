/* -----CONFIG----- */
const PORT = 3000;
const MAX_PLAYERS = 5;
/* ---------------- */

/* ---GAME STATE--- */
const uuid = require('uuid');

const games = {};
const players = {};
/* ---------------- */

/* -----SERVER----- */
const { Server } = require('socket.io');
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = new Server(server);
/* ---------------- */

// Server all the files in `out/`
app.use(express.static(path.resolve(__dirname, '../client/out')))

// Listen for incoming socket connections
io.on('connection', (socket) => {
    console.log(`User#${socket.id} connected!`);
    
    // Subscribe to client's events
    socket.on('disconnect', () => {
        console.log(`User#${socket.id} disconnected.`);
    });
    socket.on('create-game', () => {
        // Create game ID to send back to player
        // Note: This takes the first segment of a UUID
        const id = uuid.v4().split('-')[0];

        // Register game
        games[id] = {
            // Clients in game
            clients: [socket],
            // [Rounds] where Rounds: { (client.id): [track data] }
            tracks: [],
            // Length of tracks -1
            round: -1,
        }
        // Register host
        players[socket.id] = id;

        // Send response back to client
        socket.emit('create-game-res', id);
    });
    socket.on('join-game', (id) => {
        if (!games[id]) {
            return socket.emit('error', 'Game does not exist!');
        }
        if (games[id].clients.length > MAX_PLAYERS) {
            return socket.emit('error', 'Max players reached!');
        }
        // Register client with game
        games[id].clients.push(socket);
        players[socket.id] = id;

        // TODO: notify client
    });
    socket.on('start-game', () => {
        let game = findGame(socket);
        if (game) {
            if (game.round >= 0) {
                return socket.emit('error', "The game has already started!");
            }

            // Create round
            game.tracks.push({});
            game.round = 0;
            // Notify everyone
            game.clients.forEach((c) => {
                c.emit('start-round', [/* Other's track data, starts empty */])
            })
        }
    });
    socket.on('submit-track', (track) => {
        let game = findGame(socket);
        if (game) {
            // Put under client id under current round
            game.tracks[game.round][socket.id] = track;
            console.log(game.tracks);
            // Everyone submitted?
            if (Object.entries(game.tracks[game.round]).length == game.clients.length) {
                // Done with round
                game.clients.forEach((c) => {
                    // Build up previous round's tracks
                    const prev = [];

                    // TODO make this deterministic
                    game.tracks.forEach((round) => {
                        // Add a random track that isn't from author
                        prev.push(Object
                            .entries(round)
                            .filter(([author, _]) => author != socket.id)
                            .map(([_, track]) => track)
                            [Math.floor(Math.random() * game.clients.length)]);
                    });
                    console.log(prev);
                    // Same as (start-game), but with track data.
                    c.emit('start-round', prev);
                });

                game.round += 1;
            }
        }
    });
    // Find game for the given client
    const findGame = (socket) => {
        let out = undefined;
        if (!players[socket.id]) {
            socket.emit('error', 'You are not in a game!');
        }
        else if (!(out = games[players[socket.id]])) {
            socket.emit('error', 'Game does not exist!');
        }
        return out;
    }
})

// Start server
server.listen(PORT, () => console.log(`Listening on ${PORT}`) );