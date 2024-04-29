const register = async(req,res)=>{
    try {
        res.send("register admin");
    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res)=>{
    try {
        res.send("loign admin");
    } catch (error) {
        console.log(error);
    }
}

const logOut = async(req,res)=>{
    try {
        res.send("log-out admin");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login,
    logOut
}


