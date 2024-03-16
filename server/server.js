require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dbconfig = require('./config/dbConfig');
const usersRoute = require('./routes/usersRoute');
const booksRoute = require('./routes/booksRoute');
const issuesRoute = require('./routes/issuesRoute');
const reviewsRoute = require('./routes/reviewsRoute');
const requestRoute = require('./routes/requestRoute');

const PORT = process.env.PORT;

// Cross Origin Resource Sharing
app.use(cors())

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());


// Routes
app.use('/api/users', usersRoute);
app.use('/api/books', booksRoute);
app.use('/api/issues', issuesRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/request', requestRoute);


// Deployment for render
__dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    // set static folder
    app.use(express.static(path.join(__dirname, "/client/build")));

    // index.html for all page routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));