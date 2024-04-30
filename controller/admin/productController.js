const Admin = require('../../models/admin');


const allverifiedProduct = async(req,res)=>{
     try {
        console.log(req.id)
        const admin = await Admin.findOne({_id : req.id});
        res.json({admin})
     } catch (error) {
        console.log(error)
     }
}

const allunVerifiedProduct = async(req,res)=>{
    try {
        res.send("get all unverified product")
    } catch (error) {
        console.log(error)
    }
}

const unverifiedProductToVerify =  async(req,res)=>{
    try {
        res.send("product has verified");
    } catch (error) {
        console.log(error);
    }
}

const productToDelete = async(req,res)=>{
    try {
        res.send("product has removed")
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async(req,res)=>{
    try {
        res.send("get Product");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    allverifiedProduct,
    allunVerifiedProduct,
    unverifiedProductToVerify,
    productToDelete,
    getProduct,
}