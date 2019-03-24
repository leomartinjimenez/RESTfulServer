const jwt = require('jsonwebtoken')

//=======================
// VALIDATE Token 
//=======================

let validateToken = (req, res, next) => {

    let accessToken = req.get('Authorization') // HTTP Header

    // Delete the Bearer token prefix
    if (accessToken) {
        accessToken = accessToken.split('Bearer ')[1] || accessToken
    }
    console.log('*** Incoming HTTP Header--> Authorization:' + accessToken)

    jwt.verify(accessToken, process.env.TOKEN_SEED, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'AccessToken is NOT valid'
                }
            })
        }

        req.usuario = decoded.usuario

        /* next (It MUST be called this function)--> Continue with the program execution */
        // It's similar to RequestReply
        next();
    })



}

//=======================
// VALIDATE AdminRole
//=======================

let validateAdmin_Role = (req, res, next) => {
    let usuario = req.usuario

    if (usuario.role === 'ADMIN_ROLE') {
        next()
    } else {
        return res.json({
            ok: false,
            error: {
                message: 'The user is NOT Administrator'
            }

        })
    }
}


module.exports = {
    validateToken,
    validateAdmin_Role
}