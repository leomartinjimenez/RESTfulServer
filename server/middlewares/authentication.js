const jwt = require('jsonwebtoken')

//=======================
// VALIDATE Token 
//=======================

let validateToken = (req, res, next) =>{

    let incomingAuthorization = req.get('Authorization') // Header

    // Delete the Bearer token prefix
    let incomingToken = incomingAuthorization.split('Bearer ')[1] || incomingAuthorization
    console.log('*** Incoming HTTP Header--> Authorization:' + incomingAuthorization)

    jwt.verify(incomingToken, process.env.TOKEN_SEED, (error, decoded) => {
        if (error){
            return res.status(401).json({
                ok: false,
                error
            })
        }

        req.usuario = decoded.usuario

        /* next (It MUST be called this function)--> Continue with the program execution */ 
        // It's similar to RequestReply
        next();
    })

   

}


module.exports = {
    validateToken
}