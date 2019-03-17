
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is NOT a VALID role'
}

let Schema = mongoose.Schema


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es MANDATORY']
    },
    email: {
        type: String,
        unique: true,
        required : [true, 'El email es MANDATORY']
    },
    password: {
        type: String,
        required : [true, 'La password es MANDATORY']
    },
    img: {
        type: String,
        required : [false, 'La imagen es OPTIONAL']
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: validRoles,
        required : [false, 'El role es OPTIONAL']
    },
    status: {
        type: Boolean,
        default: true,
        required : [true, 'El status es MANDATORY']
    },
    google: { 
        type: Boolean,
        default: false,
        required : [false, 'El googleApi es MANDATORY']
    }
 }
)

// To Delete the password in the Response
//--------------------------------------------
usuarioSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}
//--------------------------------------------

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} MUST be unique' } )

module.exports = mongoose.model('Usuario', usuarioSchema)
