const express = require("express");
const router = express.Router();
const { Address } = require("../models/address.model")

//get address
router.get("/get/:userId", async (req, res) => {
  const {userId} = req.params;  
  try {
    const getAllAddress = await Address.find({userId})
    
    res.status(200).json({ success: true, message: "Addresses fetched successfully", getAllAddress })
  }
  catch (err) {
    res.status(400).json({ success: false, message: "No address found for the current user", errMessage: err.message })
  }
})

//add address
router.post("/add", async (req, res) => {
  try {
    const newAddress = new Address(req.body)
    const savedAddress = await newAddress.save()
    res.status(200).json({ success: true, message: "Address added successfully", savedAddress })
  }
  catch (err) {
    res.status(400).json({ success: false, message: "Error occurred while saving new address", errMessage: err.message })
  }
})

//delete address
router.delete("/delete/:addressId", async (req, res) => {
   const {addressId}=req.params
  try {
    const deleteAddress = await Address.findByIdAndDelete({_id:addressId})
    res.status(200).json({ success: true, message: "Address deleted successfully", deleteAddress })
  }
  catch (err) {
    res.status(400).json({ success: false, message: "Error occurred while deleting the address", errMessage: err.message })
  }
})
//update address

router.put("/update/:addressId", async(req,res)=>{
  const {addressId}=req.params
  try{
   
    const findAddress = await Address.findByIdAndUpdate({_id:addressId},req.body, {new:true})
    const updatedAddress= await findAddress.save()
     res.status(200).json({ success: true, message: "Address updated successfully", updatedAddress })
  }
   catch (err) {
    res.status(400).json({ success: false, message: "Error occurred while updating the address", errMessage: err.message })
  }
})
module.exports = router;