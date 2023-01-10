function constructTimesArray(params) {
  const response = UrlFetchApp.fetch(
    "http://api.aladhan.com/v1/calendarByCity?city=Asyut&country=Egypt&method=2&month=01&year=2023"
  );
  const content = response.getContentText();
  var prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  var monthData = JSON.parse(content)["data"];
  var arrayLength = monthData.length;
  var timesArray = [];
  for (let i = 0; i < arrayLength; i++) {
    for (let j = 0; j < 5; j++) {
      timesArray.push(monthData[i]["timings"][prayers[j]].split(" ")[0]);
    }
  }
  return timesArray;
}

function populateEvents(params) {
  var timesArray = constructTimesArray();
  var prayersNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  var colors = [
    CalendarApp.EventColor.BLUE,
    CalendarApp.EventColor.CYAN,
    CalendarApp.EventColor.MAUVE,
    CalendarApp.EventColor.GREEN,
    CalendarApp.EventColor.ORANGE,
  ];
  var dayPrayers = 0;
  for (let i = 1; i <= 31; i++) {
    var timesArrayPart = timesArray.slice(dayPrayers, 155);
    for (let j = 0; j < 5; j++) {
      var startDate = new Date(
        2023, // year 2023
        0, //January
        i, //9
        timesArrayPart[j].split(":")[0], //hour
        timesArrayPart[j].split(":")[1] //minutes
      );

      var endDate = new Date(startDate.getTime() + 30 * 60000);
      // Logger.log(
      //   `Prayer ${j} - ${prayersNames[j]} - for Day ${i}  starts at ${startDate}
      //   and ends at ${endDate}
      //   `
      // );
      var event = CalendarApp.getDefaultCalendar()
        .createEvent(prayersNames[j], startDate, endDate)
        .setColor(colors[j]);
    }
    dayPrayers += 5;
  }
}
function deletePopulatedEvents(params) {
  var startDate = new Date(2023, 0, 1);
  var endDate = new Date(2023, 1, 1);
  var events = CalendarApp.getDefaultCalendar().getEvents(startDate, endDate);
  events.forEach((element) => {
    element.deleteEvent();
  });
}
function onOpen() {}
function doGet(params) {
  HtmlService;
}
