import express from "express";
import morgan from "morgan";
import sql from "./utils/db";
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = parseInt(process.env.PORT || "3000");
const hostname = process.env.HOSTNAME || 'localhost'

const products = require('./routes/products')
const docs = require('./routes/docs')
const transactions = require('./routes/transactions')
const auth = require('./routes/auth')

// // Apply the rate limiting middleware to all requests
// app.use(rateLimit({
//     max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// }))
app.use(cors())
app.use(bodyParser.json());
app.use(morgan(process.env.MORGAN_FORMAT || 'tiny'))

app.use((req, res, next) => {
    try {
        // check if we are connected to the database
        if (!sql) {
            res.status(500).json({
                error: "Internal server error",
                message: "Database connection error"
            })
        }
        next();
    } catch (err: any) {
        res.status(500).json({
            error: "Internal server error",
            message: err.message
        })
    }
});


app.use('/docs', docs)
app.use('/products', products)
app.use('/transactions', transactions)
app.use('/auth', auth)



app.get('/', (req, res) => {
    res.redirect('/api/v1/docs')
})

app.use((err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({error: err})
});

app.listen(port, hostname, () => {
    console.log(`App listening on port ${port}`)
})