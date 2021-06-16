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


  setInterval(() => {
    let timer = document.getElementsByClassName('timer')[0];
    if (!timer) {
      // Login
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
    }
  }, 60000);

})();
