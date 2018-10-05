const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmt = require('helmet');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const authenticate = require('../express-demo/authenticate');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api/courses', courses);
app.use('/', home);

app.use(helmt());
app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);


//Configuration
debug('Application Name: ' + config.get('name'));
debug('e-mail: ' + config.get('mail.host'));
debug('Password: ' + config.get('mail.password'));


if (app.get('env') === 'development' ){
    app.use(morgan('tiny'));
    debug('Morgan enable...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));