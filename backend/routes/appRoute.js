const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Verifier = require('../models/verifierModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require("crypto")
const auth = require('../middleware/auth')
const Decision = require("../models/decisionModel")

dotenv.config()

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY

function signCredential(credential) {
  const sign = crypto.createSign("SHA256");
  sign.update(JSON.stringify(credential));
  sign.end();
  return sign.sign(privateKey, "base64");
}
// ------------------ USER ------------------ //
router.post('/register-user', async(req,res) => {
  try {
    const { name, email, dob, gender, occupation, aadhar, phone, password} = req.body;
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ msg: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const credential = {
      name,email,dob,phone,gender,occupation
    }

    const signature = signCredential(credential)

    
    const user = new User({ name, email,dob,gender,occupation,aadhar,phone, password: hashedPassword, credential, credentialSignature: signature})
    await user.save()
   
    res.status(200).json({msg: "User registration successful"})
  
    // console.log(credential)

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
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    })
   
    res.json({message: "Login successful"})

  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

router.get('/user-dashboard', auth,async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });    
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
})

// 🔹 Download signed + hashed credential
router.get("/download-credential",auth, async (req, res) => {
  try {
    const userId = req.user.id;  
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const credential = user.toObject();

    // --- Signature ---
    const sign = crypto.createSign("SHA256");
    sign.update(JSON.stringify(credential));
    sign.end();
    const signature = sign.sign(privateKey, "base64");

    // --- Hash ---
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(credential))
      .digest("hex");

    const signedCredential = {
      credential,
      signature,
      publicKey, 
      hash, // for /verify-hash
    };

    res.setHeader("Content-Disposition","attachment; filename=credential.json");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(signedCredential, null, 2))

  } catch (error) {
    console.error("Error downloading credential:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})


// ------------------ VERIFIER ------------------ //
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

router.get('/verifier-dashboard', auth, async(req,res) => {
  try {
    const verifier = await Verifier.findById(req.verifier.id).select("-password")
    res.json({ verifier });    
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

router.post("/verify-signature", async (req, res) => {
  try {
    // console.log("Received body:", req.body); 

    const { credential, signature, publicKey } = req.body;
    if (!credential || !signature || !publicKey) {
      return res.status(400).json({ ok: false, reason: "Invalid credential format" });
    }

    const verify = crypto.createVerify("SHA256");
    verify.update(JSON.stringify(credential));
    verify.end();

    const isValid = verify.verify(publicKey, signature, "base64");

    if (!isValid) {
      return res.json({ ok: false, reason: "Signature verification failed" });
    }

    return res.json({
      ok: true,
      reason: "Signature valid",
      user: credential,
    });
  } catch (err) {
    console.error("Signature verification error:", err); // <--- Add this
    res.status(500).json({ ok: false, reason: "Server error" });
  }
});


// 🔹 Verify via hash
router.post("/verify-hash", async (req, res) => {
  try {
    const { credential, hash } = req.body;
    if (!credential || !hash) {
      return res.status(400).json({ ok: false, reason: "Invalid credential format" });
    }

    const computedHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(credential))
      .digest("hex");

    if (computedHash !== hash) {
      return res.json({ ok: false, reason: "Hash mismatch" });
    }

    return res.json({
      ok: true,
      reason: "Hash valid",
      user: credential,
    });

  } catch (err) {
    console.error("Hash verification error:", err);
    res.status(500).json({ ok: false, reason: "Server error" });
  }
});


// 🔹 Save verifier’s decision
router.post("/verify-decision", async (req, res) => {
  try {
    const { userId, decision, remarks, sourceFilename } = req.body;

    if (!userId || !decision) {
      return res.status(400).json({ error: "userId and decision required" });
    }

    const record = await Decision.create({
      userId,
      decision,
      remarks,
      sourceFilename,
    });

    return res.json({ success: true, record });
  } catch (err) {
    console.error("Decision save error:", err);
    res.status(500).json({ error: "Server error" });
  }
})

module.exports = router
