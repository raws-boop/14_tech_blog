const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('exphbs-handlebars');
const routes = require('./controllers');
const helpers = require('./util/helpers');

const sequelize = require('.config/connection');
const SequelizeStore = require('connection-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'I like cats',
    cookies: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(expressurlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
}); 