require('dotenv').config()

const express = require('express'),
    app = express(),
    path = require('path'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    dbUrl = process.env.DB_URL 

const todoRoutes = require('./routes/api/todos'),
    userRoutes = require('./routes/api/user'),
    authRoutes = require('./routes/api/auth');

//app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Connect Mongo
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connected!"))
.catch(err => console.log(err));

// Use Routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 3001, process.env.IP, () => {
    console.log("Server listening on port 3001...");
});
