var express = require("express");
//automatically uses main as default layout
var handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

var app = express();

var includes = require("./includes.js");
var mapData = includes.mapData;

app.engine("handlebars", handlebars.engine);
app.set("port", process.env.PORT || 3000);
app.set("view engine", "handlebars");

//when getting home route, uses handlebars engine to
//render the view of home
//home page

//helper for the map
//creates array, iterates over array , and formats into pattern that google mape can understand, 
//leaves JSON stringify to pass mapdata to client side for map pins to display
app.get("/", function(req, res) {
  res.render("home", {
    helpers: {
      cookedMapData: function() {
        var answer = [];
        for (var p = 0; p < mapData.length; p++) {
          answer.push({
            title: mapData[p].title,
            position: mapData[p].position,
            content: includes.formatMapEntry(mapData[p], p)
          });
        }
        return JSON.stringify(answer);
      }
    }
  });
});

//map page, not used , but created as example of how to use google maps on client
//google maps is a client side js library
app.get("/map", function(req, res) {
  res.render("map", {
    helpers: {
      cookedMapData: function() {
        var answer = [];
        for (var p = 0; p < mapData.length; p++) {
          answer.push({
            title: mapData[p].title,
            position: mapData[p].position,
            content: includes.formatMapEntry(mapData[p], p)
          });
        }
        return JSON.stringify(answer);
      }
    }
  });
});
//mapdata is an array of hashs, we can look up entry details by the index of
//each element in teh array
//based on the entry type, we pick which view template to render the data with . 
//look up the mapdata id, returns a mapdata element into entry,
//this is push to appropriate view layer
//iframe for writing. img tag for images. html5 has audio and video tags, just as there is an image tag. we use this for viewing and listening to those entries.  

app.get("/media/:id", function(req, res) {
  // When this turns to mongo in the backend it won't look so bad
  var entry = mapData[req.params.id];
  if (typeof entry !== "undefined") {
    switch (entry.entryType) {
      case "audio":
        res.render("media-audio", { entry: entry });
        break;
      case "image":
        res.render("media-image", { entry: entry });
        break;
      case "video":
        res.render("media-video", { entry: entry });
        break;
      case "writing":
        res.render("media-writing", { entry: entry });
        break;
      default:
        res.render("media-error");
    }
  } else {
    res.render("media-error");
  }
});

//about page 
app.get("/about", function(req, res) {
  res.render("about", {
    title: "<span>About</span>",
    quip: "<small></small>"
  });
});

//beliefs
app.get("/beliefs", function(req, res) {
  res.render("beliefs", {
    title: "<span>Beliefs</span>",
    quip: "<small></small>"
  });
});

//terms of service
//muted grey for terms
app.get("/tos", function(req, res) {
  res.render("tos", {
    title: '<span>Terms and Conditions <span class="font-weight-normal text-muted">("Terms")</span></span>',
    quip: "<small></small>"
  });
});

//privacy policy
app.get("/privacy", function(req, res) {
  res.render("privacy", {
    title: "<span>Privacy Policy</span>",
    quip: "<small></small>"
  });
});

//donate
app.get("/donate", function(req, res) {
  res.render("donate");
});

//submissions
//f means form group

app.get("/submit", function(req, res) {
  res.render("submit", {
    title: '<span>Submit <span class="font-weight-normal text-muted">Piece</span></span>',
    quip: "<small>Suggest something for our map</small>",
    fname: {
      eleid: "submit-name",
      name: "Name",
      type: "text",
      help: "First and last names."
    },
    femail: {
      eleid: "submit-email",
      name: "Email",
      type: "email",
      help: "We'll never share your email with anyone else."
    },
    ftitle: {
      eleid: "submit-title",
      name: "Title",
      type: "text",
      help: "Title of the piece."
    },
    fdescription: {
      eleid: "submit-description",
      name: "Description",
      rows: 12,
      help: "Description of the piece."
    },
    ftype: {
      eleid: "submit-type",
      name: "Entry Type",
      options: ["audio", "video", "image", "writing"],
      help: "What type of media is it."
    },
    ffile: {
      eleid: "submit-file",
      name: "File",
      help: "Upload the actual file here"
    }
  });
});

//art 
//entries is an anonymous fn that returns blog entries which meet our criteria
//criteria would be image and video, line 185
//same pattern as in cookmapdata
app.get("/art", function(req, res) {
  res.render("art", {
    title: "<span>Art</span>",
    quip: "<small></small>",
    entries: function() {
      var answer = [];
      mapData.forEach(function(cur, ind, arr) {
        if (cur.entryType === "image" || cur.entryType === "video") {
          var mod = cur;
          mod.detailLink = "/media/" + cur.id;
          answer.push(mod);
        }
      });
      return answer;
    }
  });
});

//music
//this meets the criteria for audio files
app.get("/music", function(req, res) {
  res.render("music", {
    title: "<span>Music</span>",
    quip: "<small></small>",
    entries: function() {
      var answer = [];
      mapData.forEach(function(cur, ind, arr) {
        if (cur.entryType === "audio") {
          var mod = cur;
          mod.detailLink = "/media/" + cur.id;
          answer.push(mod);
        }
      });
      return answer;
    }
  });
});

//writings
//this meets the criteria for writing entries
app.get("/writings", function(req, res) {
  res.render("writings", {
    title: "<span>Writings</span>",
    quip: "<small></small>",
    entries: function() {
      var answer = [];
      mapData.forEach(function(cur, ind, arr) {
        if (cur.entryType === "writing") {
          var mod = cur;
          mod.detailLink = "/media/" + cur.id;
          answer.push(mod);
        }
      });
      return answer;
    }
  });
});

//events
//calendar, iframe from google
app.get("/events", function(req, res) {
  res.render("events", {
    title: "<span>Events</span>",
    quip: "<small></small>"
  });
});

//contact
//same style of form as the submit form.
//uses same form partial as submit 
app.get("/contact", function(req, res) {
  res.render("contact", {
    title: '<span>Contact <span class="font-weight-normal text-muted">Us</span></span>',
    quip: "<small>Send us a message</small>",
    fname: {
      eleid: "contact-name",
      name: "Name",
      type: "text",
      help: "First and last names."
    },
    femail: {
      eleid: "contact-email",
      name: "Email",
      type: "email",
      help: "We'll never share your email with anyone else."
    },
    ftitle: {
      eleid: "contact-title",
      name: "Title",
      type: "text",
      help: "Title of the piece."
    },
    fmessage: {
      eleid: "contact-message",
      name: "Message",
      rows: 12,
      help: "What would you like to tell us?"
    }
  });
});

//below is to map static assets for the theme i chose
//this connects all the css, fonts, images, js, videos  
app.use("/assets/", express.static(__dirname + "/assets"));
//when submissions has a piece of media, it stores it in a flat file system
//stored in a file in a folder with no sub directories
app.use("/submissions/", express.static(__dirname + "/submissions"));

app.get("/404", function(req, res) {
  // 404 -- so we can see it for debug purposes
  res.render("404");
});

// 500 -- so we can see it for debug purposes
app.get("/500", function(req, res) {
  res.render("500");
});

// 404 handler
app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

// 500 handler
app.use(function(req, res) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express Server is now started at: http://localhost:" +
      app.get("port") +
      "/ ; press ctrl-c to terminate or just throw the laptop in some water"
  );
});
