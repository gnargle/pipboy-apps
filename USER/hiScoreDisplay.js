let phs = require("pbhs").initPipboyHighScores();

console.log(phs.readHighScores("piptris"));
console.log(phs.addHighScore("piptris", 5000));
console.log(phs.readHighScores("piptris"));

showMainMenu();