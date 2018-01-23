const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models/');
//or const {db} = require('./models/')
const path = require('path');
const routes = require('./routes/');//also known as api. Any external application will need ot use these routes
const app = express();

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', nunjucks.render); // how to render html templates. engine is html. Setting view engine to html and view this engine, render this nunjucks method

//logging
app.use(morgan('dev'));

//static middleware - when request comes in, it will look inside that directory for that request


//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//nunjucks configuration

//setting up routing middleware
app.use('/', routes);


//start up server w/ db access
models.db.sync({force: true})//force:true lets us drop our db & recreate it
  .then(function() {
    app.listen(3000, function() {
    console.log('listening on port 3000');
    });
});

//basic server startup:
// app.listen(3000, () => {
//   console.log('it lives on port 3000!')
// })
