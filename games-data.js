/**
 * =============================================
 * CRAZY GAME ONLINE — Games Data Registry
 * =============================================
 * To add a new game:
 * 1. Add an entry to the GAMES array below
 * 2. Create the game file at the specified `file` path
 * =============================================
 */

const GAMES = [
  // ── SINGLE PLAYER ──────────────────────────
  {
    id: "snake",
    title: "Snake Classic",
    description: "Eat the food, grow your snake, avoid the walls! How long can you survive?",
    emoji: "🐍",
    color: "#2ed573",
    file: "games/snake.html",
    tags: ["single", "action", "classic"],
    players: "1 Player",
    difficulty: "Medium",
    featured: true
  },
  {
    id: "2048",
    title: "2048",
    description: "Slide tiles and combine numbers to reach the 2048 tile. Addictive puzzle fun!",
    emoji: "🔢",
    color: "#ffa502",
    file: "games/2048.html",
    tags: ["single", "puzzle"],
    players: "1 Player",
    difficulty: "Hard",
    featured: true
  },
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Flip cards and find matching pairs. Train your brain and beat the clock!",
    emoji: "🃏",
    color: "#a55eea",
    file: "games/memory-match.html",
    tags: ["single", "puzzle", "brain"],
    players: "1 Player",
    difficulty: "Easy",
    featured: true
  },
  {
    id: "whack-a-mole",
    title: "Whack-A-Mole",
    description: "Hit the moles as fast as they pop up! Don't miss or lose points.",
    emoji: "🔨",
    color: "#ff4757",
    file: "games/whack-a-mole.html",
    tags: ["single", "action"],
    players: "1 Player",
    difficulty: "Easy",
    featured: true
  },
  {
    id: "typing-speed",
    title: "Speed Typer",
    description: "Type words as fast as you can before time runs out. Boost your WPM!",
    emoji: "⌨️",
    color: "#1e90ff",
    file: "games/typing-speed.html",
    tags: ["single", "brain"],
    players: "1 Player",
    difficulty: "Medium",
    featured: false
  },
  {
    id: "math-quiz",
    title: "Math Blaster",
    description: "Answer maths questions quickly to score points. Fast fingers win!",
    emoji: "🧮",
    color: "#2ed573",
    file: "games/math-quiz.html",
    tags: ["single", "brain", "trivia"],
    players: "1 Player",
    difficulty: "Medium",
    featured: false
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble the letters to form a correct word before time expires!",
    emoji: "🔤",
    color: "#ffa502",
    file: "games/word-scramble.html",
    tags: ["single", "puzzle", "brain"],
    players: "1 Player",
    difficulty: "Medium",
    featured: false
  },
  {
    id: "color-match",
    title: "Color Match",
    description: "Match the color shown on screen — but the word says something different. Can you resist?",
    emoji: "🎨",
    color: "#ff6b9d",
    file: "games/color-match.html",
    tags: ["single", "brain", "puzzle"],
    players: "1 Player",
    difficulty: "Hard",
    featured: false
  },
  {
    id: "brick-breaker",
    title: "Brick Breaker",
    description: "Classic Breakout arcade! Smash all bricks with your ball and paddle.",
    emoji: "🧱",
    color: "#ff4757",
    file: "games/brick-breaker.html",
    tags: ["single", "action", "classic"],
    players: "1 Player",
    difficulty: "Medium",
    featured: true
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    description: "Tap to keep the bird flying through the pipes. Simple but brutally hard!",
    emoji: "🐦",
    color: "#ffd32a",
    file: "games/flappy-bird.html",
    tags: ["single", "action"],
    players: "1 Player",
    difficulty: "Hard",
    featured: true
  },
  {
    id: "quiz-trivia",
    title: "Trivia Quiz",
    description: "Test your general knowledge with 20 categories of trivia questions!",
    emoji: "🧠",
    color: "#a55eea",
    file: "games/quiz-trivia.html",
    tags: ["single", "trivia", "brain"],
    players: "1 Player",
    difficulty: "Medium",
    featured: false
  },
  {
    id: "number-guess",
    title: "Number Guess",
    description: "Guess the secret number between 1 and 100. Use the hot/cold hints!",
    emoji: "🎯",
    color: "#2ed573",
    file: "games/number-guess.html",
    tags: ["single", "puzzle"],
    players: "1 Player",
    difficulty: "Easy",
    featured: false
  },
  {
    id: "reaction-time",
    title: "Reaction Time",
    description: "Click the button the instant it turns green. How fast are your reflexes?",
    emoji: "⚡",
    color: "#ffa502",
    file: "games/reaction-time.html",
    tags: ["single", "action"],
    players: "1 Player",
    difficulty: "Easy",
    featured: false
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description: "The classic number puzzle. Fill the grid so every row, column and box has 1–9.",
    emoji: "🔲",
    color: "#1e90ff",
    file: "games/sudoku.html",
    tags: ["single", "puzzle", "brain"],
    players: "1 Player",
    difficulty: "Hard",
    featured: false
  },

  // ── 2 PLAYER ───────────────────────────────
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "The all-time classic X's and O's game. Play vs a friend or challenge the AI!",
    emoji: "❌",
    color: "#ff4757",
    file: "games/tic-tac-toe.html",
    tags: ["two", "classic", "puzzle"],
    players: "1-2 Players",
    difficulty: "Easy",
    featured: true
  },
  {
    id: "pong",
    title: "Pong",
    description: "The original arcade classic. Two paddles, one ball. First to 7 wins!",
    emoji: "🏓",
    color: "#fffffe",
    file: "games/pong.html",
    tags: ["two", "action", "classic"],
    players: "2 Players",
    difficulty: "Easy",
    featured: true
  },
  {
    id: "connect-four",
    title: "Connect Four",
    description: "Drop discs and connect 4 in a row — horizontally, vertically or diagonally!",
    emoji: "🔴",
    color: "#ffd32a",
    file: "games/connect-four.html",
    tags: ["two", "puzzle", "classic"],
    players: "1-2 Players",
    difficulty: "Medium",
    featured: true
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    description: "The ultimate hand game! Play solo vs AI or challenge a friend locally.",
    emoji: "✊",
    color: "#a55eea",
    file: "games/rock-paper-scissors.html",
    tags: ["two", "classic", "single"],
    players: "1-2 Players",
    difficulty: "Easy",
    featured: false
  },
  {
    id: "chess",
    title: "Chess",
    description: "The royal game of strategy! Play vs a friend on the same device.",
    emoji: "♟️",
    color: "#fffffe",
    file: "games/chess.html",
    tags: ["two", "puzzle", "classic", "brain"],
    players: "2 Players",
    difficulty: "Hard",
    featured: true
  },
  {
    id: "battleship",
    title: "Battleship",
    description: "Place your fleet and sink the enemy! Classic naval strategy for 2 players.",
    emoji: "🚢",
    color: "#1e90ff",
    file: "games/battleship.html",
    tags: ["two", "puzzle", "classic"],
    players: "2 Players",
    difficulty: "Medium",
    featured: false
  },

  // ── TRIVIA ─────────────────────────────────
  {
    id: "science-quiz",
    title: "Science Quiz",
    description: "How much do you know about science? Space, biology, chemistry and more!",
    emoji: "🔬",
    color: "#2ed573",
    file: "games/science-quiz.html",
    tags: ["single", "trivia", "brain"],
    players: "1 Player",
    difficulty: "Hard",
    featured: false
  },
  {
    id: "geography-quiz",
    title: "Geography Quiz",
    description: "Capitals, countries, flags and landmarks. Test your world knowledge!",
    emoji: "🌍",
    color: "#1e90ff",
    file: "games/geography-quiz.html",
    tags: ["single", "trivia", "brain"],
    players: "1 Player",
    difficulty: "Medium",
    featured: false
  },
];

// ── TAG DISPLAY CONFIG ──────────────────────
const TAG_CONFIG = {
  single: { label: "1 Player",  cls: "tag-single" },
  two:    { label: "2 Players", cls: "tag-two" },
  multi:  { label: "Multiplayer", cls: "tag-multi" },
  puzzle: { label: "Puzzle",    cls: "tag-puzzle" },
  action: { label: "Action",    cls: "tag-action" },
  trivia: { label: "Trivia",    cls: "tag-trivia" },
  brain:  { label: "Brain",     cls: "tag-puzzle" },
  classic:{ label: "Classic",   cls: "tag-classic" },
};

// ── FILTER CATEGORIES ───────────────────────
const FILTERS = [
  { id: "all",     label: "🎮 All Games" },
  { id: "single",  label: "👤 Single Player" },
  { id: "two",     label: "👥 2 Players" },
  { id: "action",  label: "⚡ Action" },
  { id: "puzzle",  label: "🧩 Puzzle" },
  { id: "trivia",  label: "🧠 Trivia" },
  { id: "brain",   label: "💡 Brain" },
  { id: "classic", label: "🕹️ Classic" },
];

// Export for use in main.js
if (typeof module !== 'undefined') module.exports = { GAMES, TAG_CONFIG, FILTERS };