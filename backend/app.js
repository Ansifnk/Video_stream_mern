const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const { unless } = require('express-unless')
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errors');
const cookieParser = require("cookie-parser");
require('dotenv').config()

const userRoutes = require('./routes/userRoutes');

const startServer = async () => {



    const app = express();

    mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });

    app.use(function (req, res, next) {
        res.header('Content-Type', 'application/json;charset=UTF-8')
        res.header('Access-Control-Allow-Credentials', true)
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })

    app.use(
        cors({
            origin: function (origin, callback) {
                return callback(null, true);
            },
        })
    );



    app.use(express.json());
    app.use(cookieParser());

    auth.authenticateToken.unless = unless;

    app.use(
        auth.authenticateToken.unless({
            path: [
                { url: '/user/create', methods: ["POST"] },
                { url: '/user/login', methods: ["POST"] },
                { url: '/user/logout', methods: ["GET"] },
               
            ]
        })
    )



    app.use('/user', userRoutes)

    app.use(errorHandler)


    app.listen(process.env.PORT, () => console.log('Server listening in Port ' + process.env.PORT))
}
startServer()  