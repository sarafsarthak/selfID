const { Schema,model } = require("mongoose");
  
const verifierSchema = new Schema({
    orgName: {
      type: String,
      required: true
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    employees: {
        type: String,
    },
    domain: {
        type: String,
        required: true,
    },
    cin: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    }
  });
  
const verifierModel = model("registered-verifiers", verifierSchema)
  
module.exports = verifierModel
  