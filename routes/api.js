"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", function (req, res) {
    const input = req.query.input;

    let initNum, initUnit;
    let numberError = false;
    let unitError = false;

    // Parse number first
    try {
      initNum = convertHandler.getNum(input);
    } catch (error) {
      numberError = true;
    }

    // Parse unit next
    try {
      initUnit = convertHandler.getUnit(input);
    } catch (error) {
      unitError = true;
    }

    // Priority for error responses
    if (numberError && unitError) {
      res.send("invalid number and unit");
      return;
    }

    if (unitError) {
      res.send("invalid unit");
      return;
    }

    if (numberError) {
      res.send("invalid number");
      return;
    }

    // If no errors, perform conversion
    try {
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      const response = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString,
      };

      res.json(response);
    } catch (error) {
      res.status(500).type("text").send("Error processing conversion");
    }
  });
};
