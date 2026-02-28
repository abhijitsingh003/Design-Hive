const User = require('../models/User');
const jwt = require('jsonwebtoken');

// GET /login
const getLogin = (req, res) => {
    if (req.cookies && req.cookies.token) return res.redirect('/dashboard');
    const error = req.flash('error');
    const success = req.flash('success');
    res.render('auth/login', { title: 'Login — DesignHive', error, success });
};

// POST /login
const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }

        const token = jwt.sign(
            { userId: user._id, userName: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        });

        req.flash('success', 'Successfully logged in!');
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/login');
    }
};

// GET /signup
const getSignup = (req, res) => {
    if (req.cookies && req.cookies.token) return res.redirect('/dashboard');
    const error = req.flash('error');
    const success = req.flash('success');
    res.render('auth/signup', { title: 'Sign Up — DesignHive', error, success });
};

// POST /signup
const postSignup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if (!name || !email || !password || !confirmPassword) {
            req.flash('error', 'All fields are required.');
            return res.redirect('/signup');
        }
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match.');
            return res.redirect('/signup');
        }
        if (password.length < 6) {
            req.flash('error', 'Password must be at least 6 characters.');
            return res.redirect('/signup');
        }
        const existing = await User.findOne({ email });
        if (existing) {
            req.flash('error', 'An account with that email already exists.');
            return res.redirect('/signup');
        }

        const user = await User.create({ name, email, password });

        const token = jwt.sign(
            { userId: user._id, userName: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        });

        req.flash('success', 'Account created and logged in!');
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/signup');
    }
};

// GET /logout
const logout = (req, res) => {
    res.clearCookie('token');
    req.flash('error', 'Successfully logged out.');
    res.redirect('/login');
};

module.exports = { getLogin, postLogin, getSignup, postSignup, logout };
