const serverConfig = require('./config/config')
    //console.log(serverConfig.mongoConnectOptions)

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// import usuario.js
app.use(require('./routes/usuario'))

mongoose.connect(serverConfig.mongoBaseUrl, serverConfig.mongoConnectOptions, (error, res) => {
    if (error) {
        throw error
    }

    console.log('The Database is READY, the connection was successfuly :) ')
})

app.listen(process.env.PORT, () => {
    console.log('The RESTfulServer PORT enabled on: ', process.env.PORT, )
})

//console.log(module)