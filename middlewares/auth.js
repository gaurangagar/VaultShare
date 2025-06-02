const jwt=require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

async function checkToken(req,res,next) {
    try{
        const token=req.cookies?.token;
        if(!token) return res.status(401).json({ message: "User not signed in" })
        const user=jwt.verify(token,secret);
        req.user=user
        //res.status(401).json({ message: "middleware passed" });
        next();
    } catch(err) {
        res.status(401).json({ message: "Invalid token",err:err });  
    }
}

module.exports=checkToken