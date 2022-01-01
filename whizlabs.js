// ==UserScript==
// @name         whizlabs revision tool
// @namespace    revision-tools
// @version      0.1
// @description  Tool to revise on those "incorrect" question after finished the execises on Whizlabs
// @author       Hugo Tse
// @match        https://www.whizlabs.com/*/report/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const showHideResult = function() {
    document.querySelectorAll('li.right span, li.wrong span').forEach((e) => e.style.display = e.style.display == 'none' ? 'inline' : 'none');
  };

  const cleanupAnswers = function() {
    document.querySelectorAll('.answer li').forEach((e) => {
      e.classList.remove('selected');
    });
  };

  const clickAble = function() {
    document.querySelectorAll('.answer li').forEach(answer => {
      answer.addEventListener('click', e => {
        let dom = e.target;
        dom.parentNode.childNodes.forEach(e => e.classList.remove('selected'));
        dom.classList.add('selected');
      });
    });
  }

  const injectCheckResultButton = function() {
    let button = document.createElement("button");
    button.innerText = 'Check Result';
    button.style.position = 'fixed';
    button.style.left = 0;
    button.classList.add('btn');
    button.style.bottom = '50%';
    document.body.append(button);
    button.addEventListener('click', e => {
      showHideResult();
    });
  };

  injectCheckResultButton();
  let timeout = 100;
  const init = function() {
    if(document.querySelector('.btn-finishReview')) {
      cleanupAnswers();
      showHideResult();
      clickAble();
    } else {
      timeout *= 2;
      setTimeout(init, timeout);
    }
  };
  setTimeout(init, timeout);

})();
