
const getAllProduct = async(req,res)=>{
    try {
        res.send("all Product");
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async(req,res)=>{
    try {
        res.send("add Product");
        
    } catch (error) {
        console.log(error);
    }
}

const removeProduct = async(req,res)=>{
    try {
        res.send("remove Product");
  
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async(req,res)=>{
    try {
        res.send("updateProduct");
      
    } catch (error) {
        console.log(error);
    }
}

const getAllOwnVerifiedProduct = async(req,res)=>{
    try {
        res.send("getAllOwnVerifiedProduct");
       
    } catch (error) {
        console.log(error);
    }
}

const getAllOwnUnverifiedProduct = async(req,res)=>{
    try {
        res.send("get All Own Unverified Product");
       
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async(req,res)=>{
    try {
        res.send("get Product");
   
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllProduct,
    removeProduct,
    updateProduct,
    getAllOwnUnverifiedProduct,
    getAllOwnVerifiedProduct,
    getProduct,
    addProduct
}