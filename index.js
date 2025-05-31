const express = require('express')
const app = express()
const { port }=require('./config/env')
const connectDB = require('./config/db');
const limiter=require('./config/ratelimit')

connectDB();

const AuthRoutes=require('./routes/auth.routes')
const FileRoutes=require('./routes/files.routes')

app.use(express.json());
app.use(limiter)
app.set("viewengine","ejs")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/auth',AuthRoutes)
app.use('/file',FileRoutes)
