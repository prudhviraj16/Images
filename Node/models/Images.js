const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  avatar: {
    type: Buffer
  },
});

module.exports = mongoose.model("Images", ImageSchema);
