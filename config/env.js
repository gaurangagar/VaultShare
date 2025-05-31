require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryapikey: process.env.CLOUDINARY_API_KEY,
  cloudinaryapisecret: process.env.CLOUDINARY_API_SECRET
};
