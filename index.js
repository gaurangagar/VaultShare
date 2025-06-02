const express = require('express')
const path = require('path');
const cookieParser = require("cookie-parser");
const { port }=require('./config/env')
const connectDB = require('./config/db');
const limiter=require('./config/ratelimit')

const app = express()
connectDB();

const AuthRoutes=require('./routes/auth.routes')
const FileRoutes=require('./routes/files.routes')
const ShareRoutes=require('./routes/share.routes')

app.use(express.json());
app.use(cookieParser());
app.use(limiter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/upload',(req, res) => res.render('upload'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/auth',AuthRoutes)
app.use('/file',FileRoutes)
app.use('/share',ShareRoutes)
