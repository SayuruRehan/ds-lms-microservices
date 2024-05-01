import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    const  token  = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Error Authenticating' });
    }
}

export const authorize = async (req, res, next) => {
    const token = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;

        if (req.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (req.role !== 'instructor' ) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Error Authorizing' });
    }
    next();
}