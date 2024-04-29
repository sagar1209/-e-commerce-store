const allUser = async (req,res)=>{
    try {
        res.send("get all user");
    } catch (error) {
        console.log(error)
    }
}

const removeUser =  async (req,res)=>{
    try {
        res.send("remove user");
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    allUser,
    removeUser
}