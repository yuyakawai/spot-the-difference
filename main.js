const gameParameters = {
  initialRemainingTime: 60,
};

const gameStatus = {
  currentScene: null,
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
  startTime: 0,
  remainingTime: 0,
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

const timeMessageContainer = {
  element: null,
  width: screenContainer.width,
  height: screenContainer.height * 0.1,
};

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
  screenContainer.element.style.margin = "1px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(screenContainer.element);

  timeMessageContainer.element = document.createElement("div");
  timeMessageContainer.element.style.position = "relative";
  timeMessageContainer.element.style.width = timeMessageContainer.width + "px";
  timeMessageContainer.element.style.height =
    timeMessageContainer.height + "px";
  timeMessageContainer.element.style.margin = "1px";
  timeMessageContainer.element.style.fontSize = "20px";
  timeMessageContainer.element.textContent =
    "⌛ " + gameParameters.initialRemainingTime.toFixed(2);
  mainContainer.element.appendChild(timeMessageContainer.element);

  tick();
};

const tick = () => {
  gameStatus.remainingTime = Math.max(
    0,
    gameParameters.initialRemainingTime -
      (performance.now() - gameStatus.startTime) / 1000
  );

  timeMessageContainer.element.textContent =
    "⌛ " + gameStatus.remainingTime.toFixed(2);

  if (gameStatus.remainingTime <= 0) {
    gameStatus.isGameOver = true;
    showGameOverMessage();
  }
  requestAnimationFrame(tick);
};

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
