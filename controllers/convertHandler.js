function ConvertHandler() {
  this.getNum = function (input) {
    // Handle number parsing with comprehensive support
    // Default to 1 if no number is provided
    if (input.replace(/[a-zA-Z]/g, "") === "") {
      return 1;
    }

    // Check for double fraction (invalid case)
    if ((input.match(/\//g) || []).length > 1) {
      throw new Error("invalid number");
    }

    // Extract numeric part
    const numPart = input.replace(/[a-zA-Z]/g, "");

    // Parse different number formats
    let result;
    if (numPart.includes("/")) {
      // Fraction case
      const [numerator, denominator] = numPart.split("/").map(parseFloat);

      // Validate fraction
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        throw new Error("invalid number");
      }

      result = numerator / denominator;
    } else {
      // Whole or decimal number
      result = parseFloat(numPart);

      // Validate number
      if (isNaN(result)) {
        throw new Error("invalid number");
      }
    }

    // Check for negative or zero numbers
    if (result <= 0) {
      throw new Error("invalid number");
    }

    return result;
  };

  this.getUnit = function (input) {
    // Extract unit and validate
    const unitPart = input.replace(/^[\d\.\/ ]+/, "").toLowerCase();

    const validUnits = {
      gal: "gal",
      l: "L",
      lbs: "lbs",
      kg: "kg",
      mi: "mi",
      km: "km",
    };

    if (!validUnits[unitPart]) {
      throw new Error("invalid unit");
    }

    return validUnits[unitPart];
  };

  this.getReturnUnit = function (initUnit) {
    const unitConversions = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };

    return unitConversions[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitSpellings = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };

    return unitSpellings[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversions = {
      gal: (x) => x * galToL,
      L: (x) => x / galToL,
      lbs: (x) => x * lbsToKg,
      kg: (x) => x / lbsToKg,
      mi: (x) => x * miToKm,
      km: (x) => x / miToKm,
    };

    const result = conversions[initUnit](initNum);
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
