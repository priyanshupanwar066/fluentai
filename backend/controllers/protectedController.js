import jwt from "jsonwebtoken";

export const protectedRoute = (res , req)=>{
    const token = req.cookies.token;
    
      if (!token) {
        return res.status(401).json({ error: "Unauthorized ❌😓" });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Protected Content", user: decoded });
      } catch (err) {
        res.status(401).json({ error: "Invalid Token ❌😓" });
      }    
};