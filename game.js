const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  let help = {
    rock:     "  Type 'r' for Rock",
    paper:    "  Type 'p' for Paper",
    sissors:  "  Type 's' for Scissors",
    quit:     "  Type 'q' to quit",
    validCMD: "  Type 'h' for a list of valid commands\n"
  }

  for (const key in help) {
    console.log(help[key])
  }
}

function getWinner(move1, move2) {
  if (move1 === move2) { // tie
    return 0;
  }
  else if (VALID_MOVES[move1].winsAgainst === move2) { // win
    return 1;
  } else { // loss
    return -1;
  }
}

function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  const cpu = validMoveKeys[randomIndex];
  return cpu;
}

function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);

  const result = getWinner(cmd, cpu);

  switch(result) {
    case -1:
      console.log("You lose...\n");
      losses++;
      break;

    case 0:
      console.log("You tie.\n");
      ties++;
      break;

    case 1:
      console.log("You win!\n");
      wins++;
      break;
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp()
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]) {
      const cpu = getCPUMove();
      
      processMove(cmd, cpu);
    } else {
      console.log("\nInvalid command.\n");

      printHelp();
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};