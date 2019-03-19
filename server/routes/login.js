const express = require('express')
const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()



app.post('/login', (req, res) => {
    
    let body = req.body

    let searchCondition = {
        email: body.email  /* if email = body.email */
    }
    
    Usuario.findOne(searchCondition, (error, usuarioDB) =>{
        if (error) {
            // 400 - Bad request
            return res.status(400).json({
                ok: false,
                error
            })
        }

       
        if (!usuarioDB) {
            /* if the usuarioDB does NOT exist */
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'The user is WRONG' /* ONLY in DEV, Don't say anything in PROD */
                }
            })
        }

        if ( !bcrypt.compareSync(body.password, usuarioDB.password) ){
            /* if the Password is wrong */
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'The password is WRONG' /* ONLY in DEV, Don't say anything in PROD */
                }
            })
        }

        /* Generating the TOKEN depends on a SECRET seed */
        //-------------------------------------------------
        // It expires in 1 month = 24 * 30
        let generatedToken = jwt.sign({
            usuario: usuarioDB
          }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXPIRATION });
        //-------------------------------------------------

        res.json({
            ok : true,
            usuario : usuarioDB,
            token: {
                expiration: process.env.TOKEN_EXPIRATION,
                type: 'Bearer',
                accessToken: generatedToken
            }
            
            /* See the https://jwt.io/ to DECODED the TOKEN */
            /* This token should persist in the "Local Storage" by the FrontEnd client */
        })

    })
  
})




module.exports = app
