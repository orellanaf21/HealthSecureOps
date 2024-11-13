//require modules
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/healthSecureOps';
app.set('view engine', 'ejs');
const mongoUri = 'mongodb+srv://admin:admin123@cluster0.ytplf.mongodb.net/healthSecureOps?retryWrites=true&w=majority&appName=Cluster0';

//connect to MongoDB
mongoose.connect(mongoUri)
.then(()=> {
    //start the server
    app.listen(port, host, () => {
    console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

const path = require('path');
// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// // Define the route
// app.get('/currentThreats', (req, res) => {
//     res.render('currentThreats');
// });

// app.get('/loggedIncidents', (req, res) => {
//     res.render('loggedIncidents'); // Ensure loggedIncidents.ejs exists in the views folder
// });

// app.get('/recomendedMeasures', (req, res) => {
//     res.render('recomendedMeasures'); // Ensure recommendedMeasures.ejs exists in the views folder
// });

// app.get('/vulnerabilities', (req, res) => {
//     res.render('vulnerabilities'); // Ensure vulnerabilities.ejs exists in the views folder
// });

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(
    session({
        secret: 'yourSecretKey',
        resave: false,
        saveUninitialized: false,
    })
);

//set up routes
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.render('index');
    } else {
        res.redirect('/information/login');
    }
});

app.use('/information', appRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err})
});
 
