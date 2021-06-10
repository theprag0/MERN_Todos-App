const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).json({msg: 'No Token, Authorization denied!'});

    try{
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        next();
    } catch(err) {
        res.status(400).json({msg: 'Invalid Token'});
        console.log(err);
    }
}

module.exports = auth;