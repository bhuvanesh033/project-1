const express = require("express");
const eventExpressRoute = express.Router();
const cors = require("cors");
let EventSchema = require("../model/event.model");
// CORS OPTIONS
var whitelist = ["http://localhost:8100", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
// Get users
eventExpressRoute
  .route("/", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    await EventSchema.find()
      .then((result) => {
        res.json({
          data: result,
          message: "Data successfully fetched!",
          status: 200,
        });
      })
      .catch((err) => {
        return next("my error"+err);
      });
  });
// Create user
eventExpressRoute.route("/create-event").post(async (req, res, next) => {
  await EventSchema.create(req.body)
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        message: "Data successfully added.",
        status: 200,
      });
    })
    .catch((err) => {
      return next("my error"+err);
    });
});
// Get single user
eventExpressRoute.route("/get-event").get(async (req, res, next) => {
  await EventSchema.find()
    .then((result) => {
      console.log(result)
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next("my error"+err);
    });
});
// Update user
eventExpressRoute.route("/update-event/:id").put(async (req, res, next) => {
  await EventSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      return next("my error"+err);
    });
});
// Delete student
eventExpressRoute.route("/remove-event/:id").delete(async (req, res) => {
    // console.log(req.params.id)
  await EventSchema.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully Deleted.",
      });
    })
    .catch((err) => {
      return next("my error"+err);
    });
});
module.exports = eventExpressRoute;
