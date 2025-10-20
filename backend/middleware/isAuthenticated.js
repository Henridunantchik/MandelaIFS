import jwt from "jsonwebtoken"


export const isAuthenticated = async (req, res, next) =>{
    try {
        let token = req.cookies.token;
        // Fallback to Authorization header: Bearer <token>
        if(!token && req.headers.authorization){
            const parts = req.headers.authorization.split(' ')
            if(parts[0] === 'Bearer' && parts[1]){
                token = parts[1]
            }
        }
        
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }
        const decode =  jwt.verify(token, process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false,
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        
    }
}