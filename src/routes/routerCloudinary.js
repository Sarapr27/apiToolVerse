const { Router } = require("express");
const { postCloudinary } = require("../controllers/cloudinary.controller");

const router = Router();

router.post("/api/imageTool", postCloudinary);

module.exports = router
