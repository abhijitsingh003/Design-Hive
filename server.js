require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.VERCEL) {
    app.use('/uploads', express.static('/tmp'));
}

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
}));

// Flash messages
app.use(flash());

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/posts', require('./routes/postRoutes'));

// Root redirect
app.get('/', (req, res) => res.redirect('/login'));

// Dashboard
const { protect } = require('./middleware/authMiddleware');
const Post = require('./models/Post');

app.get('/dashboard', protect, async (req, res) => {
    const success = req.flash('success');
    const error = req.flash('error');

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    try {
        const totalPosts = await Post.countDocuments();
        const posts = await Post.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.render('dashboard', {
            userName: req.user.userName,
            userId: req.user.userId,
            success,
            error,
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit)
        });
    } catch (err) {
        console.error(err);
        res.render('dashboard', {
            userName: req.user.userName,
            userId: req.user.userId,
            success,
            error: 'Failed to load posts',
            posts: [],
            currentPage: 1,
            totalPages: 1
        });
    }
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`DesignHive running on http://localhost:${PORT}`));
}

// Export for Vercel serverless functions
module.exports = app;
