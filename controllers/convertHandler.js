function ConvertHandler() {
  
  this.getNum = function(input) {
    let match = input.match(/^-?(\d)+((\.\d+)+)?(((\/)+\d+(\.\d+)?)+)?/);

    if (!match || !match[0]) return 1;
    console.log(match);

    const numStr = match[0];
    console.log('numStr', numStr);
    if (numStr.includes('/')) {
      const fractionParts = numStr.split('/');
      console.log('fractionParts', fractionParts);

      if (fractionParts.length !== 2) {
        return null;
      }
      return parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
  }

    if (numStr.startsWith('-')) {
      return null;
    }
    return parseFloat(numStr);
  };
  
  this.getUnit = function(input) {
    const match = input.match(/[a-zA-Z]+/);
    if (!match) return null;

    let unit = match[0].toLowerCase();
    const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
    return validUnits.includes(unit) ? (unit === "l" ? "L" : unit) : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnit = {
      'gal': 'L',
      'L' : 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return returnUnit[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      "gal": "gallons",
      "L": "liters",
      "lbs": "pounds",
      "kg": "kilograms",
      "mi": "miles",
      "km": "kilometers"
    };
    return spellOutMap[unit] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      "gal": 3.78541,
      "L": 1 / 3.78541,
      "lbs": 0.453592,
      "kg": 1 / 0.453592,
      "mi": 1.60934,
      "km": 1 / 1.60934
    };
    
    const conversionRate = conversionRates[initUnit];
    if (!conversionRate) return null;
    return parseFloat((initNum * conversionRate).toFixed(5));
  };
  
  this.getString = function(initNum, initUnitString, returnNum, returnUnitString) {
    const result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
