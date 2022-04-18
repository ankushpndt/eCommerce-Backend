const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  name: {
    type: String,
  },
  mobileno: {
    type: String,
    max: 10,
    
  },
  pincode: {
    type: String,
    
  },
  address: {
    type: String,
  }
}, { timestamps: true })
const Address = mongoose.model("address", addressSchema)
module.exports = { Address }