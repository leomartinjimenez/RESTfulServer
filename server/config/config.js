//==========================================
//  Gateway Server PORT
//==========================================
process.env.PORT = process.env.PORT || 3001

//==========================================
//  Environment
//==========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'prod' // 'dev'


//==========================================
//  Database Connection - MongoDB
//==========================================

let mongoBaseUrl;

if (process.env.NODE_ENV === 'dev') {
    mongoBaseUrl = 'mongodb://localhost:27017/coffeeShop';
} else {
    //mongoBaseUrl = 'mongodb+srv://crackmagic:nvbCryuZ1rWJbR6d@cluster0-pzplf.mongodb.net/coffeeShop';
    
    // Environment Heroku variable
    mongoBaseUrl = process.env.MONGO_DB_URI
}

const mongoConnectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
//==========================================



module.exports = {
    mongoBaseUrl,
    mongoConnectOptions
}