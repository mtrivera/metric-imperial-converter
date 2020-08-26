/*
*
*
*       Complete the handler logic below
*       
*       
*/
function ConvertHandler() {
  this.formatNum = function(num, size) {
    return Math.fround(num).toFixed(size);
  }

  this.getUnitIndex = function(input) {
    return input.search(/[a-zA-Z]/);
  }

  this.getNum = function(input) {
    var result = null;
    var unitIndex = this.getUnitIndex(input);
    var num = input.slice(0, unitIndex);

    if (unitIndex === 0) { return 1; }
    if (unitIndex < 1) { return false; }

    // Check if fraction
    if (num.includes('/')) {
      // Check for double fraction
      const fractions = num.match(/\//g);
      
      if (fractions.length > 1) {
        return false;
      } else {
        var [numerator, denominator] = num.split('/');
        result = parseFloat(numerator) / parseFloat(denominator);
        return +result;
      }
    }
    result = num;
    return +result;
  };
  
  this.getUnit = function(input) {
    var validUnitsRe = /[mi|km|gal|l|lbs|kg]/gi;
    var unitIndex = this.getUnitIndex(input);
    var userUnit = input.slice(unitIndex);

    var isValidUnit = validUnitsRe.test(input);

    if (isValidUnit) {
      return userUnit;
    } else {
      return false;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    var returnUnits = {
      'mi': 'km',
      'gal': 'l',
      'lbs': 'kg',
      'km': 'mi',
      'l': 'gal',
      'kg': 'lbs'
    };

    return returnUnits[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    var spelledOutUnits = {
      'mi': 'miles',
      'l': 'liters',
      'gal': 'gallons',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'km': 'kilometers'
    };
    
    return spelledOutUnits[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    //const UNIT_SIZE = 7;

    switch (initUnit.toLowerCase()) {
      case 'mi': return +(initNum * miToKm).toFixed(4);
      case 'lbs': return +(initNum * lbsToKg).toFixed(4);
      case 'gal': return +(initNum * galToL).toFixed(4);
      case 'km': return +(initNum / miToKm).toFixed(4);
      case 'kg': return +(initNum / lbsToKg).toFixed(4);
      case 'l': return +(initNum / galToL).toFixed(4);
      default: return false;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return`${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.formatNum(returnNum, 5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
