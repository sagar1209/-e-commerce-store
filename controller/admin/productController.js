

const allverifiedProduct = async(req,res)=>{
     try {
        res.send("get all verified product");
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

const unverifiedProductToDelete = async(req,res)=>{
    try {
        res.send("unverified product has removed");
    } catch (error) {
        console.log(error)
    }
}

const verifiedProductToDelete = async(req,res)=>{
    try {
        res.send("verified product has removed")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    allverifiedProduct,
    allunVerifiedProduct,
    unverifiedProductToVerify,
    unverifiedProductToDelete,
    verifiedProductToDelete,
}