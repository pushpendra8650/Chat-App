const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')
// const path = require('path')

// const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(request,response)=>{
    response.json({
        message : "Server running at " + PORT
    })
})



//api endpoints
app.use('/api',router)

// deployement code
// app.get('/',(req,res)=>{
//     app.use(express.static(path.resolve(__dirname, "client", "build")));
//     res.sendFile(path.resolve(__dirname,"client", "build", "index.html"));

// });
connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})


