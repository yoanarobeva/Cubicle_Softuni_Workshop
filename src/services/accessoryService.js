const Accessory = require('../models/Accessory');

exports.getAllNotAttached = (cube) => Accessory.find({ _id: { $nin: cube.accessories } });

exports.getOne = (accessoryId) => Accessory.findById(accessoryId);