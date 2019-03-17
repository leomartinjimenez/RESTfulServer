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
 

mongoose.connect(serverConfig.mongoBaseUrl+serverConfig.mongoDbName, serverConfig.mongoConnectOptions,(error, res)=>{
    if (error) {
        throw error
    }    

    console.log('Base de Datos ONLINE, conexion satisfactoria :) ')
 }
)

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT, )
}) 

//console.log(module)
