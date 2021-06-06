const express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    dbUrl = process.env.DB_URL || require('./config/keys').mongoURI;

const todoRoutes = require('./routes/api/todos');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 3001, process.env.IP, () => {
    console.log("Server listening on port 3001...");
});
