const gameParameters = {
  maxQuestionNumber: 2,
  initialRemainingTime: 60,
};

const gameStatus = {
  currentScene: null,
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
  startTime: 0,
  remainingTime: 0,
  questionNumber: 0,
  character: null,
  dummyCharacter: null,
};

const mainContainer = {
  element: null,
  width: 320,
  height: 480,
};

const screenContainer = {
  element: null,
  width: mainContainer.width - 10,
  height: mainContainer.height - 10,
};

const statusMessageContainer = {
  element: null,
  width: screenContainer.width,
  height: screenContainer.height * 0.1,
};

const characterData = [
  {
    level: 1,
    character: "肉",
    dummyCharacter: "内",
  },
  // {
  //   level: 1,
  //   character: "明",
  //   dummyCharacter: "朋",
  // },
];

const cellRow = 8;
const cellCol = 11;
const cellSize = screenContainer.width / cellRow;

window.onload = () => {
  init();
};

const init = () => {
  mainContainer.element = document.getElementById("main-container");
  mainContainer.element.style.position = "relative";
  mainContainer.element.style.width = mainContainer.width + "px";
  mainContainer.element.style.height = mainContainer.height + "px";
  mainContainer.element.style.margin = "5px";
  mainContainer.element.style.fontFamily =
    "'Helvetica Neue',Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif";
  mainContainer.element.style.backgroundColor = "#f5deb3";
  mainContainer.element.style.border = "2px solid #deb887";
  mainContainer.element.style.boxSizing = "border-box";
  mainContainer.element.style.borderRadius = "5px";
  mainContainer.element.style.display = "flex";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.flexDirection = "column";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  screenContainer.element = document.createElement("div");
  screenContainer.element.style.position = "relative";
  screenContainer.element.style.width = screenContainer.width + "px";
  screenContainer.element.style.height = screenContainer.height + "px";
  screenContainer.element.style.margin = "3px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(screenContainer.element);

  statusMessageContainer.element = document.createElement("div");
  statusMessageContainer.element.style.position = "relative";
  statusMessageContainer.element.style.width =
    statusMessageContainer.width + "px";
  statusMessageContainer.element.style.height =
    statusMessageContainer.height + "px";
  statusMessageContainer.element.style.margin = "1px";
  statusMessageContainer.element.style.fontSize = "20px";
  statusMessageContainer.element.textContent =
    "⌛ " + gameParameters.initialRemainingTime.toFixed(2);
  mainContainer.element.appendChild(statusMessageContainer.element);

  initQuestion();

  tick();
};

const tick = () => {
  if (gameStatus.isGameClear || gameStatus.isGameOver) {
    return;
  }

  gameStatus.remainingTime = Math.max(
    0,
    gameParameters.initialRemainingTime -
      (performance.now() - gameStatus.startTime) / 1000
  );

  statusMessageContainer.element.textContent =
    "⌛ " +
    gameStatus.remainingTime.toFixed(2) +
    " " +
    "問題 " +
    gameStatus.questionNumber +
    "/" +
    gameParameters.maxQuestionNumber;

  if (gameStatus.remainingTime <= 0) {
    gameStatus.isGameOver = true;
    showGameOverMessage();
    return;
  }
  requestAnimationFrame(tick);
};

const initQuestion = () => {
  if (gameStatus.questionNumber >= gameParameters.maxQuestionNumber) {
    gameStatus.isGameClear = true;
    showGameClearMessage();
    return;
  }
  gameStatus.questionNumber++;

  const char =
    characterData[[Math.floor(Math.random() * characterData.length)]];
  gameStatus.character = char.character;
  gameStatus.dummyCharacter = char.dummyCharacter;

  cells.forEach((cell) => cell.init());
  cells[[Math.floor(Math.random() * cells.length)]].element.textContent =
    gameStatus.character;
};

const cells = [...Array(cellRow * cellCol)].fill().map((_, index) => ({
  element: null,
  isEmpty: false,
  x: 0,
  y: 0,
  init: () => {
    cells[index].x = index % cellRow;
    cells[index].y = Math.trunc(index / cellRow);
    cells[index].element = document.createElement("div");
    cells[index].element.style.position = "absolute";
    cells[index].element.style.width = cellSize + "px";
    cells[index].element.style.height = cellSize + "px";
    cells[index].element.style.left = cells[index].x * cellSize + "px";
    cells[index].element.style.top = cells[index].y * cellSize + "px";
    cells[index].element.style.border = "3px ridge #cb986f";
    cells[index].element.style.backgroundColor = "#ccb28e";
    cells[index].element.style.boxSizing = "border-box";
    cells[index].element.style.fontSize = cellSize * 0.6 + "px";
    cells[index].element.style.display = "flex";
    cells[index].element.style.alignItems = "center";
    cells[index].element.style.justifyContent = "center";
    cells[index].element.style.cursor = "pointer";
    cells[index].element.textContent = gameStatus.dummyCharacter;
    screenContainer.element.appendChild(cells[index].element);

    const handleCellTouchEvent = (e) => {
      e.preventDefault();
      if (e.target.textContent === gameStatus.character) {
        initQuestion();
      }
    };

    if (window.ontouchstart === null) {
      cells[index].element.ontouchstart = handleCellTouchEvent;
    } else {
      cells[index].element.onpointerdown = handleCellTouchEvent;
    }
  },
}));

const scene = [
  {
    name: "title",
    update: () => {
      updateTitle();
    },
  },
  {
    name: "gamePlay",
    update: () => {},
  },
  {
    name: "gameOver",
    update: () => {},
  },
  {
    name: "gameClear",
    update: () => {},
  },
  {
    name: "stageClearBirdDown",
    update: () => {},
  },
  {
    name: "stageClearJellySpeech",
    update: () => {},
  },
  {
    name: "nextStageMove",
    update: () => {},
  },
];

const updateGameOver = () => {};

const updateGameClear = () => {};

const versionMessage = {
  version: "ver.1.0.0",
  draw: () => {},
};

const stageMessage = {
  wait: 0,
  draw: () => {},
};

const drawGameOverMessage = () => {};

const drawGameClearMessage = () => {};

const drawStageClearMessage = () => {};

const resetGame = () => {};

const showGameClearMessage = () => {
  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width * 0.8 + "px";
  messageElement.style.height = screenContainer.height * 0.15 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.backgroundColor = "#f5deb3";
  messageElement.style.color = "blue";
  messageElement.style.fontSize = "36px";
  messageElement.textContent = "Game Clear !!";
  screenContainer.element.appendChild(messageElement);
};

const showGameOverMessage = () => {
  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width * 0.8 + "px";
  messageElement.style.height = screenContainer.height * 0.15 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.backgroundColor = "#f5deb3";
  messageElement.style.color = "red";
  messageElement.style.fontSize = "32px";
  messageElement.textContent = "Game Over";
  screenContainer.element.appendChild(messageElement);
};
