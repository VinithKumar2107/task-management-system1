// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             token = req.headers.authorization.split(" ")[1];

//             const decoded = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET
//             );

//             req.user = await User.findById(decoded.id).select("-password");

//             next();

//         } catch (error) {
//             return res.status(401).json({
//                 message: "Not authorized, token failed",
//             });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({
//             message: "Not authorized, no token",
//         });
//     }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // Check header
    console.log(req.headers.authorization);
    console.log("AUTH HEADER:", req.headers.authorization);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    // No token case (early return)
    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token"
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed"
        });
    }
};

module.exports = { protect };