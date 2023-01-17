const activityController = require('../controllers/touristActivity.controller');
const { Router } = require('express');
const activityRoute = Router();

activityRoute.get('/', activityController.getAllActivities);
activityRoute.get('/:id', activityController.getActivityID);
activityRoute.post('/', activityController.uploadImg ,activityController.createActivity);


module.exports = activityRoute