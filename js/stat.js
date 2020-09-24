'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_SHADOW = `rgba(0, 0, 0, 0.3)`;
  var GAP = 10;
  var FONT_GAP = 20;
  var TEXT_MARGIN = 5;
  var COLOR_TEXT = `#000`;
  var COLOR_USER_BAR = `rgba(255, 0, 0, 1)`;
  var HISTOGRAM_TOP_MARGIN = 100;
  var HISTOGRAM_SIDE_MARGIN = 50;
  var HISTOGRAM_WIDTH = 40;
  var HISTOGRAM_MAX_LENGTH = 150;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };


  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, `white`);

    ctx.font = `16px PT Mono`;
    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(`Ура вы победили!`, CLOUD_X + FONT_GAP, FONT_GAP * 2);
    ctx.fillText(`Список результатов:`, CLOUD_X + FONT_GAP, FONT_GAP * 3);

    var maxTime = 0;
    for (var i = 0; i < times.length; i++) {
      times[i] = parseInt(times[i]);
      if (times[i] > maxTime) {
        maxTime = times[i];
      }
    }


    var barPosX = CLOUD_X + FONT_GAP * 2;
    var barPosY = CLOUD_Y + HISTOGRAM_TOP_MARGIN + HISTOGRAM_MAX_LENGTH + TEXT_MARGIN;


    for (var i = 0; i < players.length; i++) {
      var userProgress = parseInt(HISTOGRAM_MAX_LENGTH / maxTime * times[i]);

      ctx.fillStyle = COLOR_TEXT;
      ctx.fillText(times[i], barPosX, barPosY - FONT_GAP - userProgress - TEXT_MARGIN);
      ctx.fillStyle = (players[i] === `Вы`) ? COLOR_USER_BAR : `rgba(0,0,` + Math.ceil(55 + Math.random() * 200) + `)`;
      ctx.fillRect(barPosX, barPosY - FONT_GAP - userProgress, HISTOGRAM_WIDTH, userProgress);

      ctx.fillStyle = COLOR_TEXT;
      ctx.fillText(players[i], barPosX, barPosY);
      barPosX += HISTOGRAM_SIDE_MARGIN + HISTOGRAM_WIDTH;
    }

  };

})();
