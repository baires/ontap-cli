#!/usr/bin/env node

const ora = require("ora");
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyCS_5euhgdun42rkdKeMxj_emYUxl-AsZ8",
  Promise: Promise
});

const prog = require("caporal");

prog
  .description("Simple way to check is Ontap is open now")
  .option(
    "--venue <Joint>",
    "Joint to check: palermo, colegiales, san telmo, belgrano, retiro or boedo. Default Palermo",
    ["palermo", "colegiales", "san telmo", "belgrano", "retiro", "boedo"]
  )
  .action(function(args, options, logger) {
    const spinner = new ora({
      text: "Checking the beer",
      spinner: process.dots5
    });
    spinner.start();

    function getJoint(val) {
      let placeID = "";
      switch (val) {
        case "palermo":
          placeID = "ChIJiTabBY61vJURyvr1fOj68WU";
          break;
        case "colegiales":
          placeID = "ChIJKwu6i9y1vJURbspzEV9crJ8";
          break;
        case "san telmo":
          placeID = "ChIJm5zm0DLLvJURp2pwlXBEoRg";
          break;
        case "belgrano":
          placeID = "ChIJGcZJeSu0vJURfHKl44zJXQI";
          break;
        case "retiro":
          placeID = "ChIJmQSLIbbKvJUR0B-_v3tzFuY";
          break;
        case "boedo":
          placeID = "ChIJvXSJzFPKvJURICLju3J4jyo";
          break;
        default:
          placeID = "ChIJiTabBY61vJURyvr1fOj68WU";
      }
      return placeID;
    }

    googleMapsClient
      .place({
        placeid: getJoint(options.venue)
      })
      .asPromise()
      .then(response => {
        if (response.json.result.opening_hours.open_now) {
          setTimeout(() => {
            spinner.color = "green";
            spinner.text = "🍻🍻  Yes!";
            spinner.succeed();
          }, 2000);
        }
        setTimeout(() => {
          spinner.color = "red";
          spinner.text = "☹️☹️  No!";
          spinner.succeed();
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  });

prog.parse(process.argv);
