/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '45.53mi';
      assert.equal(convertHandler.getNum(input), 45.53);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/4kg';
      assert.equal(convertHandler.getNum(input), 0.75);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '2/6.3mi';
      assert.equal(convertHandler.getNum(input), 0.31746031746031744);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '2//6.3mi';
      assert.equal(convertHandler.getNum(input), false);
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = '3p';
      assert.equal(convertHandler.getUnit(input), false);
      done();
    });
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var [valInput, unitInput] = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(valInput, unitInput),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var [valInput, unitInput] = [3, 'L'];
      var expected = 0.79252;
      assert.approximately(convertHandler.convert(valInput, unitInput), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var [valInput, unitInput] = [3.1, 'mi'];
      var expected = 4.98900;
      assert.approximately(convertHandler.convert(valInput, unitInput), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var [valInput, unitInput] = [7, 'km'];
      var expected = 4.34960;
      assert.approximately(convertHandler.convert(valInput, unitInput), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var [valInput, unitInput] = [24, 'lbs'];
      var expected = 10.88620;
      assert.approximately(convertHandler.convert(valInput, unitInput), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var [valInput, unitInput] = [17, 'kg'];
      var expected = 37.47860;
      assert.approximately(convertHandler.convert(valInput, unitInput), expected, 0.1);
      done();
    });
    
  });

});