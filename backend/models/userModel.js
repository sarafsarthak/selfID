const { Schema,model } = require("mongoose");
  
const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      maxLength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    aadhar: {
        type: Number,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joined: {
        type: String,
        default: () => new Date().toISOString().split("T")[0]
    }
  });
  
const userModel = model("registered-users", userSchema)
  
module.exports = userModel
  