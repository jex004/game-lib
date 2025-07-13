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
const createdAt = new Date().toISOString();
console.log("Game singleton created at:", createdAt);
// Singleton game instance
const game = new Game();
export default game;