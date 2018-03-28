const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});


app.route('/note/:id?')
    .get(function (req, res) {
        if(!req.params.id) // retrieve bulk notes
        {
            res.json("hello");
        }
        else { // retrieve specific note
            res.json("hello " + req.params.id);
        }
    });