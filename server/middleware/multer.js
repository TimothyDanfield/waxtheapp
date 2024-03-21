const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = new multer.memoryStorage()
const  upload = multer({
  storage,
})

module.exports = upload;