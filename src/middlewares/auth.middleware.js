import jwt from 'jsonwebtoken'

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'artist') {
            return res.status(401).json({
                message: "You dont have access to create music",
            });
        }
        req.user=decoded
        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            reason: error.message
        });
    }
}

export default {authArtist}