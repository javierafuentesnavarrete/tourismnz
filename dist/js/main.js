let locations = $("#selectbox");
let accommodation = $("#accommodation__container");
let switch_screen = $("#btn");
const scren = $(".container");
const acc__opt = $("#containeracco");
const prices = $("#accommodation__price");
const meal = $("#containermeal");
const date = $("#daterange");
const summary__con = $(".container--summary");
const xclose = $("#x");
let cityArray = [];
let locationArray = [];

//city-------------------------------------------------------------------
$.getJSON("json/city.json", function (data) {
 cityArray = data.cities;
 displayLocation(cityArray);
 getResult();
});

function displayLocation(cities) {
 let html = "";
 for (let i = 0; i < cities.length; i++) {
  html += makeHTML(cities[i]);
 }
 locations.html(html);
}

function makeHTML(citiesId) {
 return `
 <option data-id="${citiesId.id} "value="${citiesId.id}">${citiesId.id}</option>`;
}

// accommodation----------------------------------
$.getJSON("json/location.json", function (data) {
 locationArray = data.location;
 displaycategories(locationArray);
});

function displaycategories(location) {
 var html = "";
 for (var i = 0; i < location.length; i++) {
  html += createHTML(location[i]);
 }
 accommodation.html(html);
}

function createHTML(locJson) {
 return `<option data-id="${locJson.id} "value="${locJson.price}">${locJson.accommodation}</option>

 `;
}

function one() {
 $("#btn").click(function () {
  var locationArray = document.getElementById("accommodation__container").value;
  document.getElementById("pricecontainer").innerHTML = locationArray;
  document.getElementById("pricecontainer-two").innerHTML = locationArray;
  document.getElementById("total-summary").innerHTML = locationArray;
  console.log(locationArray);
 });
}

//datapicker-------------------------------------

$(function () {
 $('input[name="daterange"]').daterangepicker(
  {
   opens: "left",
   minDate: moment().startOf("month").add(1, "day"),
   maxDate: moment().endOf("month").subtract(15, "day"),
  },

  function (start, end, label) {
   console.log(start.format("YYYY-MM-DD") + " to " + end.format("YYYY-MM-DD"));
  }
 );
});

//SUMMARY PAGE---------------------------------------------------------
//city--------------------
function getResult() {
 $("#btn").click(function (lac) {
  var lac = document.getElementById("selectbox").value;
  document.getElementById("getcity__h3").innerHTML = lac;
  document.getElementById("location-summary").innerHTML = lac;

  console.log(lac);
 });
 getResultTwo();
}
function getResultTwo() {
 var lac = document.getElementById("selectbox").value;
 document.getElementById("getcity__h32").innerHTML = lac;
 document.getElementById("location-summary").innerHTML = lac;
 console.log(lac);
}

//guest-----------------------------
function summary() {
 var guest = document.getElementById("guests").value;
 document.getElementById("grey").innerHTML = guest;

 console.log(guest);
}
//meal--------------------------------------
function summaryMeal(btnbuger) {
 var btnburger = document.getElementById("optionmeal__btn").value;
 document.getElementById("meal-summary").innerHTML = btnburger;
 console.log(btnbuger);
}
function summaryMealSushil(btnsushi) {
 var btnsushi = document.getElementById("optionmeal__btnsushi").value;
 document.getElementById("meal-summary").innerHTML = btnsushi;
 console.log(btnsushi);
}

//change screens----------------------------------
function changeScreen() {
 switch_screen.on("click", changeScreens);
 scren.show();
 acc__opt.hide();
 meal.hide();
 summary__con.hide();
}
function changeScreens() {
 scren.hide();
 acc__opt.show();
 acc__opt.on("click", function () {
  meal.show();
  acc__opt.hide();
  meal.on("click", function () {
   meal.hide();
   summary__con.show();
   xclose.on("click", function () {
    scren.show();
    summary__con.hide();
   });
  });
 });
}

changeScreen();
