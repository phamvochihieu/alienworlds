// ==UserScript==
// @name         wax-dapps.site
// @namespace    wax-dapps.site
// @version      1.0.0
// @description  Auto Mine & Claim
// @author       miner-team
// @match        http*://wax-dapps.site/alienworlds/mining
// @icon         https://www.google.com/s2/favicons?domain=wax-dapps.site
// @grant        none
// ==/UserScript==

(function init() {
  // Constant
  const ON_SOUND = false; // TODO: Set it to enable/disable sound
  const ON_TESTING = true;
  const MILISECOND = 1000;
  const DEFAULT_TIMEOUT = 1 * MILISECOND;
  const LOG_COLOR = 'color: pink; background: black';

  // Time
  const delayTime = 720 * MILISECOND; // TODO: Set your timer
  const mineTime = 4 * MILISECOND;
  const claimTime = mineTime + 8 * MILISECOND;
  const errorTime = claimTime + 10 * MILISECOND;
  const timeToReload = claimTime + delayTime + 10 * MILISECOND;

  // Helper function
  function getRemainSeconds() {
    let timerEl = document.getElementById('timer').innerHTML.split(':');
    let remainSeconds = Number(timerEl[0]) * 60 + Number(timerEl[1]);
    return remainSeconds;
  }

  // Testing
  if (ON_TESTING) {
    document
      .getElementById('notification')
      .insertAdjacentHTML('afterend', `<p id="test" style="${LOG_COLOR}"></p>`);
    let mineTimeTest = mineTime / MILISECOND;
    let claimTimeTest = claimTime / MILISECOND;
    let errorTimeTest = errorTime / MILISECOND;
    let timeToReloadTest = timeToReload / MILISECOND;

    let itv = setInterval(() => {
      document.getElementById('test').innerHTML = `mineTime: ${
        mineTimeTest > 0 ? --mineTimeTest : 0
      }, claimTime: ${claimTimeTest > 0 ? --claimTimeTest : 0}, errorTime: ${
        errorTimeTest > 0 ? --errorTimeTest : 0
      }, timeToReload: ${timeToReloadTest > 0 ? --timeToReloadTest : 0}`;

      if (
        mineTimeTest <= 0 &&
        claimTimeTest <= 0 &&
        errorTimeTest <= 0 &&
        timeToReloadTest <= 0
      ) {
        clearInterval(itv);
      }
    }, MILISECOND);
  }

  // Disable play sound
  if (!ON_SOUND) {
    console.log('%c Sound is disabling...', LOG_COLOR);
    let cbAudio = document.getElementById('checkbox-audio');
    if (!cbAudio.checked) {
      return;
    }
    cbAudio.nextElementSibling.click();
  }

  // Click login
  setTimeout(function () {
    (function waitLogin() {
      console.log('%c Login...', LOG_COLOR);
      // Check if already login
      if (document.getElementById('header-info').innerHTML != 'Alien Worlds') {
        return;
      }

      // Login
      let loginBtn = document.getElementById('login-button');
      if (!loginBtn.hasAttribute('disabled')) {
        loginBtn.click();
        console.log('Click Login', new Date().toLocaleString());
      } else {
        setTimeout(waitLogin, DEFAULT_TIMEOUT);
      }
    })();
  }, mineTime);

  // Reload if get error
  setTimeout(function () {
    (function waitNextMine() {
      console.log('%c Waiting...', LOG_COLOR);

      let notification = document.getElementById('notification');
      if (notification.textContent.toLowerCase().toString().match('error')) {
        location.reload();
      } else {
        console.log('Wait for next mining reload', new Date().toLocaleString());
        // setTimeout(waitNextMine, DEFAULT_TIMEOUT);
      }
    })();
  }, errorTime);

  // *** IMPORTANT CODE ***

  // Click mine after reload page
  setTimeout(function () {
    (function waitMine() {
      console.log('%c Mining...', LOG_COLOR);

      let remainSeconds = getRemainSeconds();

      let mineBtn = document.getElementById('mine-button');
      if (!mineBtn.hasAttribute('disabled') && remainSeconds === 0) {
        mineBtn.click();
        console.log('Click Mine', new Date().toLocaleString());
      } else {
        if (remainSeconds > 0) {
          setTimeout(waitMine, remainSeconds * MILISECOND);
        }
      }
    })();
  }, mineTime);

  // Click Claim
  setTimeout(function () {
    (function waitClaim() {
      console.log('%c Claiming...', LOG_COLOR);

      let remainSeconds = getRemainSeconds();

      let claimBtn = document.getElementById('claim-button');
      if (!claimBtn.hasAttribute('disabled') && remainSeconds === 0) {
        claimBtn.click();
        console.log('Click Claim', new Date().toLocaleString());
      } else {
        if (remainSeconds > 0) {
          setTimeout(waitClaim, remainSeconds * MILISECOND);
        }
      }
    })();
  }, claimTime);

  // Set time to reload the page
  setTimeout(function () {
    (function waitReload() {
      console.log('%c Set time to reload the page...', LOG_COLOR);

      location.reload();
      // init();
    })();
  }, timeToReload);
})();
