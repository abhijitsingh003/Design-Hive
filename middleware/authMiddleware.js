const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            req.flash('error', 'Not authorized to access this route.');
            return res.redirect('/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err);
        req.flash('error', 'Session expired or not authorized.');
        return res.redirect('/login');
    }
};

module.exports = { protect };
