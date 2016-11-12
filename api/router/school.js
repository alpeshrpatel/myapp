var express = require("express");

var router = express.Router();

var schoolController = require('../controller/school-controller');

router.post('wis-api/school',schoolController.createSchool);

