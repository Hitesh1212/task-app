const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express()
app.use(cookieParser())
require('./db/connection')
 app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, UPDATE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie')
    next()
})

const router = require('./router/route')

app.use('/api',router)



const PORT = 1337;

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})