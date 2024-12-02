const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function getNum(input)", function () {
    test("should correctly read a whole number input", function () {
      assert.equal(convertHandler.getNum("32L"), 32);
    });

    test("should correctly read a decimal number input", function () {
      assert.equal(convertHandler.getNum("3.2L"), 3.2);
    });

    test("should correctly read a fractional input", function () {
      assert.equal(convertHandler.getNum("3/2L"), 1.5);
    });

    test("should correctly read a fractional input with a decimal", function () {
      assert.equal(convertHandler.getNum("3.5/2L"), 1.75);
    });

    test("should correctly return an error on a double-fraction", function () {
      assert.throws(
        () => convertHandler.getNum("3/2/3L"),
        Error,
        "invalid number"
      );
    });

    test("should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      assert.equal(convertHandler.getNum("L"), 1);
    });
  });

  suite("Function getUnit(input)", function () {
    test("should correctly read each valid input unit", function () {
      const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
      validUnits.forEach((unit) => {
        assert.oneOf(
          convertHandler.getUnit(`10${unit}`),
          validUnits.map((u) => (u === "L" ? "L" : u))
        );
      });
    });

    test("should correctly return an error for an invalid input unit", function () {
      assert.throws(
        () => convertHandler.getUnit("10kilometers"),
        Error,
        "invalid unit"
      );
    });
  });

  suite("Function getReturnUnit(initUnit)", function () {
    test("should return the correct return unit for each valid input unit", function () {
      const unitPairs = [
        ["gal", "L"],
        ["L", "gal"],
        ["mi", "km"],
        ["km", "mi"],
        ["lbs", "kg"],
        ["kg", "lbs"],
      ];

      unitPairs.forEach(([input, expected]) => {
        assert.equal(convertHandler.getReturnUnit(input), expected);
      });
    });
  });

  suite("Function spellOutUnit(unit)", function () {
    test("should correctly return the spelled-out string unit for each valid input unit", function () {
      const unitSpellings = {
        gal: "gallons",
        L: "liters",
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms",
      };

      Object.entries(unitSpellings).forEach(([unit, spelling]) => {
        assert.equal(convertHandler.spellOutUnit(unit), spelling);
      });
    });
  });

  suite("Function convert(initNum, initUnit)", function () {
    test("should correctly convert gal to L", function () {
      assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.001);
    });

    test("should correctly convert L to gal", function () {
      assert.approximately(convertHandler.convert(1, "L"), 0.264172, 0.001);
    });

    test("should correctly convert mi to km", function () {
      assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.001);
    });

    test("should correctly convert km to mi", function () {
      assert.approximately(convertHandler.convert(1, "km"), 0.621371, 0.001);
    });

    test("should correctly convert lbs to kg", function () {
      assert.approximately(convertHandler.convert(1, "lbs"), 0.453592, 0.001);
    });

    test("should correctly convert kg to lbs", function () {
      assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.001);
    });
  });
});
