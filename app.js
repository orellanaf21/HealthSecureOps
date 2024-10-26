//require modules
const express = require('express');
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

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.get('/', (req, res) => {
    res.render('index');
})

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