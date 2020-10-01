'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10; // Отступ для фона
const TABLET_GAP = 20; // отступ для данных таблицы
const COLUMN_GAP = 50; // отступ между столбцами
const FONT_GAP = 15; // отступ для всех шрифтов
const TEXT_HEIGHT = 15;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getBarColor = function () {
  return `hsl(240, ` + Math.floor(Math.random() * Math.floor(100)) + `%, 30%)`;
};

let getMaxElement = function (array) {
  let maxElement = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

let renderHeader = function (ctx, FONT, baseline, color, firstText, secondText) {
  ctx.fillStyle = color;
  ctx.font = FONT;
  ctx.textBaseline = baseline;
  ctx.fillText(firstText, CLOUD_X + TABLET_GAP, CLOUD_Y + TABLET_GAP);
  ctx.fillText(secondText, CLOUD_X + TABLET_GAP, CLOUD_Y + TABLET_GAP + FONT_GAP);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);
  renderHeader(ctx, `16px PT Mono`, `hanging`, `#000`, `Ура Вы победили!`, `Список результатов:`);


  let maxTime = getMaxElement(times);
  for (let i = 0; i < names.length; i++) {
    ctx.fillText(
        names[i],
        CLOUD_X + TABLET_GAP + (COLUMN_GAP + BAR_WIDTH) * i,
        CLOUD_HEIGHT - TABLET_GAP
    );
    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = getBarColor();
    }
    ctx.fillRect(
        CLOUD_X + TABLET_GAP + (COLUMN_GAP + BAR_WIDTH) * i,
        CLOUD_HEIGHT - TABLET_GAP - TEXT_HEIGHT,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i] / maxTime)
    );
    ctx.fillStyle = `#000`;
    ctx.fillText(
        Math.floor(times[i]),
        CLOUD_X + TABLET_GAP + (COLUMN_GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + (TEXT_HEIGHT * 2) + FONT_GAP
    );
  }
};
