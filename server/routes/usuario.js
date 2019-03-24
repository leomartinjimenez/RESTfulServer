const express = require('express')

const bcrypt = require('bcrypt')
const _ = require('underscore')

const Usuario = require('../models/usuario')
const { validateToken, validateAdmin_Role } = require('../middlewares/authentication')

const app = express()


// HTTP Methods of the SERVER
//-------------------------------------------

// GetById - TypeI
//-----------------------------
app.get('/usuario/:id', [validateToken], (req, res) => {
    /* validateToken is the MIDDLEWARE which is going to trigger ç
       when the current route is executed */

    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    // delete body.password
    // delete body.google


    Usuario.findById(id, body, { new: true, runValidators: true }, (error, usuarioDB) => {
        if (error) {
            // 400 - Bad request
            return res.status(400).json({
                ok: false,
                error
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })


})

// GetBySearchQuery - TypeII
//-----------------------------
app.get('/usuario', [validateToken], function(req, res) {

    // Paging  
    //--------------------------------------
    // {{url}}/usuario?fromPaging=1&resultLimit=4
    // {{url}}/usuario?fromPaging=0&_count=2
    let fromPaging = req.query.fromPaging || 0
    fromPaging = Number(fromPaging)

    let resultLimit = req.query.resultLimit || req.query._count || 0
    resultLimit = Number(resultLimit)
        //--------------------------------------

    let queryCondition = {
        status: true
    }

    Usuario.find(queryCondition, 'nombre email role status google imag')
        .skip(fromPaging)
        .limit(resultLimit)
        .exec((error, usuarios) => {
            if (error) {
                // 400 - Bad request
                return res.status(400).json({
                    ok: false,
                    error
                })
            }
            Usuario.countDocuments(queryCondition, (error, totalEntries) => {
                res.status(200).json({
                    ok: true,
                    usuarios,
                    totalEntries: totalEntries

                })
            })



        })


})

app.post('/usuario', [validateToken, validateAdmin_Role], function(req, res) {
    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((error, usuarioDB) => {
        if (error) {
            // 400 - Bad request
            return res.status(400).json({
                ok: false,
                error
            })
        }

        //usuarioDB.password = null
        res.status(201).json({
            ok: true,
            usuario: usuarioDB
        })

    })

    /*
    if (body.nombre === undefined || body.nombre === null) {
        res.status(400).json({
            error: true,
            description: 'The nombre is mandatory'
        })
    } else {
        res.status(201).json({
            usuario: body
        })
    }
    */

})

app.put('/usuario/:id', [validateToken, validateAdmin_Role], function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    // delete body.password
    // delete body.google


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioDB) => {
        if (error) {
            // 400 - Bad request
            return res.status(400).json({
                ok: false,
                error
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })


})

app.delete('/usuario/:id', [validateToken, validateAdmin_Role], function(req, res) {
    let id = req.params.id

    // To DELETE completely the PHYSICAL element from the Database
    //-----------------------------------------------------
    /*
    Usuario.findByIdAndRemove(id, { new: true, runValidators: true }, (error, deletedUsuario) => {
            if (error) {
                // 400 - Bad request
                return res.status(400).json({
                    ok: false,
                    error
                })
            }
            if (!deletedUsuario) // (deletedUsuario === null) 
            {
                // 404 - Not Found
                return res.status(404).json({
                    ok: false,
                    error: {
                        message: 'Usuario Not Found'
                    }
                })
            }
            return res.status(200).json({
                ok: true,
                usuario: deletedUsuario
            })

        })
    */
    //-----------------------------------------------------


    // To make a LOGIC delete - usuario.STATUS = FALSE
    //-----------------------------------------------------
    let updatedFields = {
        status: false
    }

    Usuario.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true }, (error, logicDeletedUsuario) => {
            if (error) {
                // 400 - Bad request
                return res.status(400).json({
                    ok: false,
                    error
                })
            }
            if (!logicDeletedUsuario) // (deletedUsuario === null) 
            {
                // 404 - Not Found
                return res.status(404).json({
                    ok: false,
                    error: {
                        message: 'Usuario Not Found'
                    }
                })
            }
            return res.status(200).json({
                ok: true,
                usuario: logicDeletedUsuario
            })

        })
        //-----------------------------------------------------

})

//-------------------------------------------

module.exports = app