#!/usr/bin/env node

const ora = require("ora");
const Table = require("cli-table3");
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyC5gcB1RjXModzRmJ9E50bC1ah6Vi9LIiY",
  Promise: Promise
});

const table = new Table();

const prog = require("caporal");

prog
  .description("Simple way to check is Ontap is open now")
  .option(
    "--venue <Joint>",
    "Joint to check: palermo, colegiales, san telmo, belgrano, retiro or boedo. Default Palermo",
    [
      "palermo",
      "colegiales",
      "san telmo",
      "belgrano",
      "retiro",
      "boedo",
      "recoleta",
      "san-nicolas",
      "san-miguel",
      "vicente-lopez"
    ]
  )
  .option("--full", "Get relevant information about the joint")
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
        case "recoleta":
          placeID = "ChIJ58-g9JjKvJURqtpZ_NiQ0VA";
          break;
        case "san-nicolas":
          placeID = "ChIJ5Wr9Ce7LvJURtyIr1j6Y0z4";
          break;
        case "san-miguel":
          placeID = "ChIJMRui-9O9vJURMFUUT2PNHfM";
          break;
        case "vicente-lopez":
          placeID = "ChIJz0bvkK62vJURBdUF-2nZqbo";
          break;
        default:
          placeID = "ChIJiTabBY61vJURyvr1fOj68WU";
      }
      return placeID;
    }

    function displayMore(value) {
      table.push(
        { "🏠  Address": value.formatted_address },
        [
          { rowSpan: 7, content: "⏰  Opening Hours", vAlign: "center" },
          value.opening_hours.weekday_text[0]
        ],
        [value.opening_hours.weekday_text[1]],
        [value.opening_hours.weekday_text[2]],
        [value.opening_hours.weekday_text[3]],
        [value.opening_hours.weekday_text[4]],
        [value.opening_hours.weekday_text[5]],
        [value.opening_hours.weekday_text[6]],
        { "📍  Map": value.url }
      );

      console.log(table.toString());
    }

    googleMapsClient
      .place({
        placeid: getJoint(options.venue)
      })
      .asPromise()
      .then(response => {
        const r = response.json.result;
        if (options.full) {
          setTimeout(() => {
            displayMore(r);
          }, 1200);
        }
        if (r.opening_hours.open_now) {
          setTimeout(() => {
            spinner.color = "green";
            spinner.text = "🍻🍻  Yes!";
            spinner.succeed();
          }, 1000);
        } else {
          setTimeout(() => {
            spinner.color = "red";
            spinner.text = "☹️☹️  No!";
            spinner.fail();
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

prog.parse(process.argv);
