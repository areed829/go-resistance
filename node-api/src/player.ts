export let players: { [player: string]: string } = {};

export const addPlayer = (player: string, socketId: string) => {
  if (!playerExists(player)) {
    players = { ...players, [player]: socketId };
    return true;
  }
  return false;
};

export const clearPlayers = () => {
  players = {};
};

const playerExists = (player: string) =>
  Object.keys(players).some(
    (currentPlayer) =>
      currentPlayer.localeCompare(player, undefined, {
        sensitivity: 'accent',
      }) === 0
  );
