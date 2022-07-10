import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameStatus } from './game-status';
import { addPlayer, clearPlayers } from './player';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

app.use(cors({ origin: 'http://localhost:4200' }));

let gameStatus = { status: GameStatus.Closed };

app.get('/game-status', (req, res) => {
  res.send(gameStatus);
});

app.post('/kill-game', (req, res) => {
  gameStatus = { status: GameStatus.Closed };
  res.send(gameStatus);
});

app.get('/start-game', (req, res) => {
  gameStatus = { status: GameStatus.Open };
  clearPlayers();
  res.send(gameStatus);
});

// app.post('join-game', (req, res) => {
//   const { player }: { player: string } = req.body;
//   if (gameStatus.status === GameStatus.Open) {
//     res.send(addPlayer(player));
//   } else {
//     res.status(400).send('Game is not open');
//   }
// });

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} has connected`);

  socket.on('disconnect', () =>
    console.log(`Socket ${socket.id} has disconnected`)
  );

  socket.on('join-game', (player) => {
    if (gameStatus.status === GameStatus.Open) {
      const added = addPlayer(player, socket.id);
      if (added) {
        socket.emit('joined-game', player);
      } else {
        socket.emit('join-failed', `${player} already exists`);
      }
    } else {
      socket.emit('join-game-failure', 'Game is not open');
    }
  });
});

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
