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

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));