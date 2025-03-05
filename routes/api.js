'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const express = require('express');
const router = express.Router();

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  router.get('/', (req, res) => {
    res.render('index');
  })

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;

    if (!input) return res.json({ error: 'No input provided' });

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === null && initUnit === null) {
      console.log("Returning: ", { error: 'invalid number and unit' });
      return res.json({ error: 'invalid number and unit' });
    }
    if (initNum === null) {
      console.log("Returning: ", { error: 'invalid number' });
      return res.json({ error: 'invalid number' });
    }

    if (initUnit === null) {
      console.log("Returning: ", { error: 'invalid unit' });
      return res.json({ error: 'invalid unit' });
    }

    const initUnitString = convertHandler.spellOutUnit(initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnUnitString = convertHandler.spellOutUnit(returnUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    const string = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString);
    const responseData = { initNum, initUnit, returnNum, returnUnit, string };

    return res.json(responseData);
  })
};
