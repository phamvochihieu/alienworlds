// ==UserScript==
// @name         Auto click raid for metal
// @namespace    game2.metal-war.com
// @version      1.0.0
// @description  Auto Mine & Claim
// @author       miner-team
// @match        http*://game2.metal-war.com
// @grant        none
// ==/UserScript==

(function init() {

  const RAID = 1; // Raiding time
  const REPAIR = 10; // repairing time
  const MILISECOND = 1000;
  const SECOND = 60;
  const DELAY = 2; // delay time for reparing


  // Mining - excute every minutes
  setInterval(() => {
    let timer = document.getElementsByClassName('timer')[0];
    let timerEl = timer.innerHTML.split(':');
    if (!timerEl) return;
    let remainSeconds = 0;
    remainSeconds = Number(timerEl[0]) * 60 + Number(timerEl[1]);
    if (!timer || remainSeconds < 30) {

      let buttons = document.getElementsByClassName('button raid');
      let raid = null;
      buttons.forEach((item, i) => {
        if (item.outerText == "RAID") {
          raid = item;
          return;
        }
      });

      if (raid) {
        raid.click();
        console.log(new Date().toLocaleString() + ' Click raid');
      } else {
        console.log(new Date().toLocaleString() + ' mining inprogress');
      }
    } else {
      console.log(new Date().toLocaleString() + ': ' + timer.outerText + ' - ' + remainSeconds);
    }
  }, RAID * SECOND * MILISECOND);

  // Repair the tool - excute every 2 minutes
  setInterval(() => {
    let hpEl = document.getElementsByClassName('hp_text')[0];
    if (!hpEl) return;
    let needRepair = hpEl.innerText.startsWith("0/");
    if (needRepair) {
      setTimeout(function() {
        (function waitMine() {
          let button = document.getElementsByClassName('repair_price')[0];
          if (button) {
            button.click();
            console.log(new Date().toLocaleString() + ' reparing ...');
          } else {
            console.log(new Date().toLocaleString() + 'Error...');
          }
        })();
      }, DELAY * SECOND * MILISECOND);


    } else {
      console.log(new Date().toLocaleString() + ' HP: ' + hpEl.innerText);
    }
  }, REPAIR * SECOND * MILISECOND);

})();
