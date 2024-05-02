const User = require('../../models/user');
const Product = require('../../models/product')


const allUser = async (req, res) => {
    try {
        const users = await User.find({});
        const userPromises = users.map(async (user) => {
            const verifyCount = await Product.aggregate([
                { $match: { owner: user._id, isVerify: true } },
                { $count: "verify" }
            ]);

            const unverifyCount = await Product.aggregate([
                { $match: { owner: user._id, isVerify: false } },
                { $count: "unverify" }
            ]);

            console.log(verifyCount);
            
            return {
                id : user._id,
                name: user.username,
                countverify: verifyCount.length > 0 ? verifyCount[0].verify : 0,
                countUnverify: unverifyCount.length > 0 ? unverifyCount[0].unverify : 0
            };
        });

        const userDetails = await Promise.all(userPromises);
        
        res.json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const removeUser =  async (req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({error : "user doesn't exit"});
        }
        const deletedUser =  await User.findOneAndDelete({_id:id});
        res.status(200).json({message : "User Deleted Successfully",user : deletedUser});

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid product ID" });
          }
          res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    allUser,
    removeUser
}