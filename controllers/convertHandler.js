/*
*
*
*       Complete the handler logic below
*       
*       
*/
function ConvertHandler() {
  this.getUnitIndex = function(input) {
    return input.search(/[a-zA-Z]/);
  }

  this.getNum = function(input) {
    var unitIndex = this.getUnitIndex(input);
    var num = input.slice(0, unitIndex);

    if (unitIndex === 0) { return 1; }
    if (unitIndex < 1) { return 'invalid number'; }

    // Check if fraction
    if (num.includes('/')) {
      // Check for double fraction
      const fractions = num.match(/\//g);
      
      if (fractions.length > 1) {
        return 'invalid number';
      } else {
        var [numerator, denominator] = num.split('/');
        result = numerator / denominator;
    
        // Division by zero results in Infinity, not an error
        if (isFinite(result)) {
          return result;
        }
        return 'Cannot divide by zero';
      }
    }
    return +num;
  };
  
  this.getUnit = function(input) {
    var validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var unitIndex = this.getUnitIndex(input);
    var userUnit = input.slice(unitIndex);

    if (validUnits.includes(userUnit)) {
      return userUnit;
    }
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    var returnUnits = {
      'mi': function() {
        return 'km';
      },
      'gal': function() {
        return 'l';
      },
      'lbs': function() {
        return'kg'
      },
      'km': function() {
        return 'mi';
      },
      'l': function() {
        return 'gal';
      },
      'kg': function() {
        return 'lbs';
      }
    };
    return returnUnits[initUnit.toLowerCase()]();
  };

  this.spellOutUnit = function(unit) {
    var spelledOutUnits = {
      'mi': function() {
        return 'miles';
      },
      'gal': function() {
        return 'gallons';
      },
      'lbs': function() {
        return'pounds'
      },
      'km': function() {
        return 'kilometers';
      },
      'l': function() {
        return 'liters';
      },
      'kg': function() {
        return 'kilograms';
      }
    };

    return spelledOutUnits[unit.toLowerCase()]();
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    var convertUnits = {
      'mi': function() {
        return +(initNum * miToKm).toFixed(5);  // mi to km
      },
      'lbs': function() {
        return +(initNum * lbsToKg).toFixed(5);  // lbs to kg
      },
      'gal': function() {
        return +(initNum * galToL).toFixed(5);  // gal to l
      },
      'km': function() {
        return +(initNum / miToKm).toFixed(5);  // km to mi
      },
      'kg': function() {
        return +(initNum / lbsToKg).toFixed(5);  // kg to lbs
      },
      'l': function() {
        return +(initNum / galToL).toFixed(5);  // l to gal
      }
    };

    return convertUnits[initUnit.toLowerCase()]();
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return`${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
