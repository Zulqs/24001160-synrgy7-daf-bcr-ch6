const cloudinary = require('cloudinary').v2;
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CDNAME,
    api_key: process.env.CDKEY,
    api_secret: process.env.CDSEC,
    secure: true
});

module.exports = cloudinary;