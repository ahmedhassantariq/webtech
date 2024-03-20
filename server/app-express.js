const express = require("express");
let server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");
server.get("/api/stories", function (req, res) {
  res.send([
    { title: "Story 1", content: "story 1 content" },
    { title: "story 2", content: "story 2 content" },
  ]);
});
server.get("/contact-us", function (req, res) {
  res.render("contact-us");
});
server.get("/", function (req, res) {
  res.render("homepage");
});

server.listen(4000);