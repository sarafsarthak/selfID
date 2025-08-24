const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Verifier = require('../models/verifierModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require("crypto")
const auth = require('../middleware/auth')

dotenv.config()

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY

router.post('/register-user', async(req,res) => {
  try {
    const { name, email, dob, gender, occupation, aadhar, phone, password} = req.body;
      const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ msg: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ name, email,dob,gender,occupation,aadhar,phone, password: hashedPassword})
    await user.save()
    res.status(200).json({msg: "User registration successful"})

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error.message})
  }
})

router.post('/user-login', async (req,res) => {
  try {
  const { email, password } = req.body
    
  const user = await User.findOne({email})
  if(!user) return res.status(400).json({message: "Invalid email or password"})

  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) return res.status(400).json({message: "Invalid email or password"})

  const token = jwt.sign({
    id: user._id, email: user.email},
    process.env.SECRET_KEY,
    {expiresIn: "1h"}
  )
  res.json({message: "Login successful", token})
  

  } catch (error) {
    res.status(404),json({message: error.message})
  }
})

router.get('/user-dashboard', auth,async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json({ user });    
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });

  }

})

router.get("/download-credential",auth, async (req, res) => {
  try {
    // ✅ userId should come from decoded token (middleware should set req.user)
    const userId = req.user.id;  

    // ✅ Fetch user details from DB, excluding password
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Prepare data for signing
    const credential = user.toObject();

    // ✅ Sign data with RSA private key
    const sign = crypto.createSign("SHA256");
    sign.update(JSON.stringify(credential));
    sign.end();

    const signature = sign.sign(privateKey, "base64");

    const signedCredential = {
      credential,
      signature,
      publicKey, // to allow verification
    };

    // ✅ Send signed data as downloadable JSON
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=credential.json"
    );
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(signedCredential, null, 2))
  } catch (error) {
    console.error("Error downloading credential:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})







//for Verifier

router.post('/register-verifier', async(req,res) => {
  try {
    const { orgName, companyEmail,address,city,pincode,employees,domain, cin, password } = req.body

      const existing = await Verifier.findOne({ companyEmail })
      if (existing) return res.status(400).json({ msg: "User already exists" })
      const hashedPassword = await bcrypt.hash(password, 10)

    const verifier = new Verifier({ orgName, companyEmail,address,city,pincode,employees,domain, cin, password: hashedPassword })
    await verifier.save()
    res.status(200).json({success:true})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "Server error"})
  }
})

router.post('/verifier-login', async(req,res) => {
  try {
    const { companyEmail, password } = req.body
    const verifier = await Verifier.findOne({companyEmail})
    if(!verifier) return res.status(404).json({message: "Invalid username or password"})
    
      const isMatch = await bcrypt.compare(password, verifier.password)
      if(!isMatch) return res.status(404).json({message : "Invalid username or password"})

      const token = jwt.sign({
          id: verifier._id, email: verifier.companyEmail},
          process.env.SECRET_KEY,
          {expiresIn: "1h"}
        )
        res.json({message: "Login successful", token})


  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router
