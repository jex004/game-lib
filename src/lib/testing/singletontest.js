class Game {
  constructor() {
    this.state = {
      players: [],
      score: 0,
      started: false,
    };
    this.msgs="";
  }

  startGame() {
    this.state.started = true;
  }

  addPlayer(player) {
    this.state.players.push(player);
  }

  tick() {
    // game logic here
  }

  getState() {
    return this.state;
  }
}

// Singleton game instance
const game = new Game();
export default game;