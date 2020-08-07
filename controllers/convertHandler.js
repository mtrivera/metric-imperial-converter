/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.formatNum = function(num) {
    return Math.fround(num).toFixed(7);
  }

  this.getNum = function(input) {
    var num = input.match(/\d\.?\d*\/?\d?\.?\d*/g);

    if (num === null) {
      return '1';
    }

    return num.join('');
  };
  
  this.getUnit = function(input) {
    return input.match(/[a-z]+/gi).join('');
  };
  
  this.getReturnUnit = function(initUnit) {
    var returnUnits = {
      'mi': 'km',
      'gal': 'L',
      'lbs': 'kg',
      'km': 'mi',
      'L': 'gal',
      'mi': 'km'
    };

    return returnUnits[initUnit];
  };

  this.spellOutUnit = function(unit) {
    var spelledOutUnits = {
      'mi': 'miles',
      'km': 'kilometers',
      'L': 'liters',
      'gal': 'gallons',
      'lbs': 'pounds',
      'kg': 'kilograms',
    };
    
    return spelledOutUnits[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    var newNum = initNum;

    if (initNum.includes('/')) {
      var [numerator, denominator] = initNum.split('/');
      newNum = parseFloat(numerator) / parseFloat(denominator);
    }

    switch (initUnit) {
      case 'mi': return this.formatNum(newNum * miToKm);
      case 'lbs': return this.formatNum(newNum * lbsToKg);
      case 'gal': return this.formatNum(newNum * galToL);
      case 'km': return this.formatNum(newNum / miToKm);
      case 'kg': return this.formatNum(newNum / lbsToKg);
      case 'L': return this.formatNum(newNum / galToL);
      default: return;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return`${initNum} ${this.spellOutUnit(initUnit)} converts to ${Math.fround(returnNum).toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
