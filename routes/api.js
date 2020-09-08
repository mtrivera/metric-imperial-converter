/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
  .get(function (req, res, next){
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    res.body = {};
    res.body.initNum = initNum;
    res.body.initUnit = initUnit;

    if (res.body.initNum !== 'invalid num' && res.body.initUnit !== 'invalid unit') {
      res.body.returnNum = convertHandler.convert(initNum, initUnit);
      res.body.returnUnit = convertHandler.getReturnUnit(initUnit);
      res.body.string = convertHandler.getString(initNum, initUnit, res.body.returnNum, res.body.returnUnit);
    }
    next();
  }, function(req, res) {
    let response = null;
    
    if (res.body.initNum === 'invalid num' && res.body.initUnit === 'invalid unit') {
      response = Object.assign({}, res.body, { string: 'invalid number and unit' });
    } else if (res.body.initNum === 'invalid number') {
      response = Object.assign({}, res.body, { string: 'invalid number' });
    } else if (res.body.initUnit === 'invalid unit') {
      response = Object.assign({}, res.body, { string: 'invalid unit' });
    } else if (res.body.initNum === 'Cannot divide by zero') {
      response = Object.assign({}, res.body, { string: 'Cannot divide by zero' });
    }

    response = {
      initNum: res.body.initNum,
      initUnit: res.body.initUnit,
      returnNum: res.body.returnNum,
      returnUnit: res.body.returnUnit,
      string: res.body.string
    }
    
    res.status(200).json(response);
  });
};
