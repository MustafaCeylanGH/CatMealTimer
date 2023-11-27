"use strict";

/* CAT CLOCK TIMER*/
////////////////////////////

const UpdateTime = function () {
  const date = new Date();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const currentTime = `${hour >= 10 ? hour : "0" + hour}:${
    minute >= 10 ? minute : "0" + minute
  }:${second >= 10 ? second : "0" + second} GMT+3`;

  const clockEl = document.querySelector(".cat-clock");
  clockEl.textContent = currentTime;
  const yearEl = document.querySelector(".year");
  yearEl.textContent = year;
};
UpdateTime();
setInterval(UpdateTime, 1000);

/* CAT MEAL STATUS */

const playTextEl = document.querySelector(".cat-play-text");
const playImgEl = document.querySelector(".cat-play-img");
const mealTextEl = document.querySelector(".cat-meal-text");
const mealImgEl = document.querySelector(".cat-meal-img");
const sleepTextEl = document.querySelector(".cat-sleep-text");
const sleepImgEl = document.querySelector(".cat-sleep-img");
const giveMealBtn = document.querySelector(".give-meal");
let isMealTime = localStorage.getItem("isMealTime") === "true" || false;
let isGaveMeal = localStorage.getItem("isGaveMeal") === "true" || false;
// For process priority
let isMealItemElRemoved = false;

const CheckMealTime = function () {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (
    (currentHour >= 8 && currentHour < 9) ||
    (currentHour >= 17 && currentHour < 18) ||
    (currentHour >= 23 && currentHour < 24)
  ) {
    isMealTime = true;
    localStorage.setItem("isMealTime", "true");
  } else {
    isMealTime = false;
    localStorage.setItem("isMealTime", "false");
    isGaveMeal = false;
    localStorage.setItem("isGaveMeal", "false");
  }
  MealTime();
  PlayTime();
  SleepTime();
};

const MealTime = function () {
  if (isMealTime && !isGaveMeal) {
    mealTextEl.classList.add("active");
    mealImgEl.classList.add("active");
  } else {
    mealTextEl.classList.remove("active");
    mealImgEl.classList.remove("active");
    isMealItemElRemoved = true;
  }
};

const SleepTime = function () {
  if (isGaveMeal && isMealTime) {
    // For process priority
    if (isMealItemElRemoved) {
      sleepTextEl.classList.add("active");
      sleepImgEl.classList.add("active");
    }
  } else {
    sleepTextEl.classList.remove("active");
    sleepImgEl.classList.remove("active");
  }
};

const PlayTime = function () {
  if (!isMealTime) {
    playTextEl.classList.add("active");
    playImgEl.classList.add("active");
  } else {
    playTextEl.classList.remove("active");
    playImgEl.classList.remove("active");
  }
};

// CHECK BUTTON STATUS

giveMealBtn.addEventListener("click", function () {
  if (!isGaveMeal && isMealTime) {
    isGaveMeal = true;
    localStorage.setItem("isGaveMeal", "true");
    SleepTime();
  }
});

CheckMealTime();
setInterval(CheckMealTime, 1000);
