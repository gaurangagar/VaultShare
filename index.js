const express = require('express')
const app = express()
const { port }=require('./config/env')
const connectDB = require('./config/db');

connectDB();

const AuthRoutes=require('./routes/auth.routes')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/auth',AuthRoutes)
