const Credentials = require('./credentials.js');
const express = require("express");
const path = require("path");
const pgp = require('pg-promise')(/*options*/);
const app = express();
const db = pgp('postgres://'
    + Credentials.db.user + ':'
    + Credentials.db.password + '@' 
    + Credentials.db.host + ':'
    + Credentials.db.port + '/'
    + Credentials.db.db_name);

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});


app.route('/meters/')
    .get(function (req, res) {
        db.any('SELECT * from meters')
            .then(function (data) {
                res.json(data);
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
    });


app.route('/demands/')
    .get(function (req, res) {
        // get meter readings at intervals of 1 hour, for 1 day
        db.any('select * from demand where extract(minute from time) = 05 and extract(day from time) = 20 ORDER BY time desc;')
            .then(function (data) {
                res.json(data);
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
    });
