
const express = require('express')

const app = express()


// Import all the "routes"
//-------------------------------------
app.use(require('./usuario'))
app.use(require('./login'))
//-------------------------------------





module.exports = app
