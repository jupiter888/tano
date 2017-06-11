/* includes.js */
//these are stoed entries on the map
module.exports = {
  mapData: [
    {
      title: "Pike Place Market",
      position: { lat: 47.6101, lng: -122.3421 },
      date: "July 1st, 2016",
      month: "Jul",
      day: "1st",
      year: 2016,
      author: "Yao San",
      authorEmail: "ping@gmail.com",
      entryType: "audio",
      description: "test for audio",
      id: 0,
      file: "1.mp3"
    },
    {
      title: "Torchlight Parade",
      position: { lat: 47.6215, lng: -122.3481 },
      date: "August 2nd, 2015",
      year: 2015,
      day: "2nd",
      month: "Aug",
      author: "Clayton Hawthorn",
      authorEmail: "aine@gmail.com",
      entryType: "video",
      description: "test for video",
      id: 1,
      file: "2.mp4"
    },
    {
      title: "Mt. Rainier",
      position: { lat: 46.8523, lng: -121.7603 },
      date: "March 4th, 2017",
      month: "Mar",
      day: "4th",
      year: 2017,
      author: "Donna Summer",
      authorEmail: "simmerdonna@gmail.com",
      entryType: "image",
      description: "test for image",
      id: 2,
      file: "3.jpg"
    },
    {
      title: "What PLUR means to me",
      position: { lat: 47.6456, lng: -122.3344 },
      date: "December 25th, 2001",
      month: "Dec",
      day: "25th",
      year: "2001",
      author: "Stephanie Someone",
      authorEmail: "shine@gmail.com",
      entryType: "writing",
      description: "test for writing",
      id: 3,
      file: "4.pdf"
    },
    {
      title: "Rotterdam",
      position: { lat: 51.9244, lng: 4.4777 },
      date: "December 25th, 2010",
      author: "Anders Somgan",
      authorEmail: "sun@gmail.com",
      entryType: "audio",
      description: "test for audio",
      id: 4,
      file: "5.mp3"
    }
  ],
  /* Entry, Entry Number */
  formatMapEntry: function(entry, eN) {
    var answer = "";
    answer += "<div id='content" + eN + "'>";
    answer +=
      "<h1 id='firstHeading" +
      eN +
      "' class='firstHeading'>" +
      entry.title +
      "</h1>";
    answer += "<div id='bodyContent" + eN + "'>";
    answer += "<p>" + entry.description + "</p>";
    answer +=
      "<p>Attribution: " +
      entry.author +
      ", <a href='/media/" +
      entry.id +
      "'>" +
      entry.title +
      "</a> (Date: " +
      entry.date +
      ").</p>";
    answer += "</div>";
    answer += "</div>";
    return answer;
  }
};
