"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", function (req, res) {
    const input = req.query.input;

    try {
      // parse number
      const initNum = convertHandler.getNum(input);

      // parse unit
      const initUnit = convertHandler.getUnit(input);

      // get return unit
      const returnUnit = convertHandler.getReturnUnit(initUnit);

      // perform conversion
      const returnNum = convertHandler.convert(initNum, initUnit);

      // create response string
      const toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      // construct full response object
      const response = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString,
      };

      res.json(response);
    } catch (error) {
      // Handle different error scenarios
      if (
        error.message === "invalid number" &&
        error.message === "invalid unit"
      ) {
        res.status(400).send("invalid number and unit");
      } else if (error.message === "invalid number") {
        res.status(400).send("invalid number");
      } else if (error.message === "invalid unit") {
        res.status(400).send("invalid unit");
      } else {
        res.status(500).send("Error processing conversion");
      }
    }
  });
};
