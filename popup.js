"use strict";

function click(e) {
  chrome.tabs.executeScript(null, {
    code: "document.body.style.backgroundColor='" + e.target.id + "'",
  });
  window.close();
}

document.addEventListener("DOMContentLoaded", function () {
  let divs = document.querySelectorAll("div");
  for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", click);
  }
});
