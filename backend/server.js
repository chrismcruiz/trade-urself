const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routersUrls = require('./routes/routes')
const cors = require('cors')
// const bodyParser = require('body-parser');

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})

app.use(express.json())
app.use(cors())
app.use('/app', routersUrls)

app.listen(4000, () => console.log('Server is up and running'))
