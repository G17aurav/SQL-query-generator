const jwt = require('jsonwebtoken');
const models = require('../models/prisma');
const dotenv = require('dotenv');
dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try{ 
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Takon not present"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await models.user.findUnique({
            where: { id: decoded.userID },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if(!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}