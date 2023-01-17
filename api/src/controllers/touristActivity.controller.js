const activityService = require('../services/touristActivity.service');
const WSresponse = require('../libs/WSresponse');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage });
const uploadImg = upload.single("img");

const getAllActivities = async (req, res) => {
    try {
        const data = await activityService.getAllActivities();
        res.status(201).json(new WSresponse(data, "ok", false, 0))
    } catch (error) {
        res.status(404).json(new WSresponse(null, error, true, 404))
    }
}

const getActivityID = async (req, res) => {

}


const createActivity = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const data = await activityService.createActivity(req.body)
        res.status(201).json(new WSresponse(data, "ok", false, 0))
    } catch (error) {
        res.status(404).json(new WSresponse(null, error, true, 404))
    }
}


module.exports = {
    getAllActivities,
    getActivityID,
    createActivity,
    uploadImg,

}