"use strict";

var crrWeekStep = 0;

function getWeekDate() {
  var d = 24 * 60 * 60 * 1000;
  var curr = new Date(); // get current date

  var first = new Date(curr.getTime() - (curr.getDay() - 1) * d + crrWeekStep * 7 * d);
  var last = new Date(curr.getTime() - (curr.getDay() - 6 - 1) * d + crrWeekStep * 7 * d);
  var wd = "".concat(first.getDate() < 10 ? '0' : '').concat(first.getDate(), "/").concat(first.getMonth() + 1 < 10 ? '0' : '').concat(first.getMonth() + 1, "/").concat(first.getFullYear()) + ' - ' + "".concat(last.getDate() < 10 ? '0' : '').concat(last.getDate(), "/").concat(last.getMonth() + 1 < 10 ? '0' : '').concat(last.getMonth() + 1, "/").concat(last.getFullYear());
  document.getElementById("show-date").innerText = wd; // TODO: send rq
}

getWeekDate();

function preWeek() {
  crrWeekStep--;
  getWeekDate();
}

function nextWeek() {
  crrWeekStep++;
  getWeekDate();
}

Previous.onclick = function () {
  preWeek();
};

Next.onclick = function () {
  nextWeek();
};