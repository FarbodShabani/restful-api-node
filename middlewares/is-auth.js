const jwt = require("jsonwebtoken");



exports.isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error("User is not Authorized");
        error.statusCode = 401;
        error.data= authHeader;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, "thissecretistolongforFarbodandSaina");
    } catch (err) {
        next(err);
    }
    if (!decodeToken) {
        const error = new Error("user is not Authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodeToken.userId.toString();
    next();
}