const gameStatus = {
  currentScene: null,
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
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

  tick();
};

const tick = () => {
  // gameStatus.currentScene.update();
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
