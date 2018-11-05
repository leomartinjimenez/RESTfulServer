require('./config/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// HTTP Methods of the SERVER
//-------------------------------------------
app.get('/usuario', function(req, res) {
    res.json('get usuario')
})

app.post('/usuario', function(req, res) {
    let body = req.body

    if (body.nombre === undefined || body.nombre === null) {
        res.status(400).json({
            error: true,
            description: 'The nombre is mandatory'
        })
    } else {
        res.json({
            usuario: body
        })
    }

})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    res.json({
        id
    })
})

app.delete('/usuario', function(req, res) {
    res.json('delete usuario')
})

//-------------------------------------------

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT, )
})