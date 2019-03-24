const serverConfig = require('./config/config')
    //console.log(serverConfig.mongoConnectOptions)

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const bodyParser = require('body-parser')
require('body-parser-xml-json')(bodyParser);

// NPM FHIR library
//-------------------------------------------
// https://www.npmjs.com/package/fhir
//-------------------------------------------
const ParseConformance = require('fhir').ParseConformance;
const FhirVersions = require('fhir').Versions;
const Fhir = require('fhir').Fhir;
//-------------------------------------------

/* let resource = {
    "resourceType": "Patient",
    "id": "1001",
    "identifier": [
            {
                    "type": {
                            "text": "NHC"
                    },
                    "system": "xHis",
                    "value": "HC1001"
            }
    ],
    "name": [
            {
                    "text": "ADLER, REBECCA JANE",
                    "family": "ADLER",
                    "given": [
                            "REBECCA JANE"
                    ]
            }
    ],
    "gender": "male",
    "birthDate": "1977-08-21"
}

let fhir = new Fhir()
let xml = fhir.objToXml(resource);
let json = fhir.xmlToJson(xml);
let obj = fhir.xmlToObj(xml);
let results = fhir.validate(xml, { errorOnUnexpected: true });
results = fhir.validate(obj, {});
console.log(xml)
console.log(json)
console.log(obj)
console.log(results) */




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// parse application/xml
app.use(bodyParser.xml())


// Global configuration of "routes"
//-------------------------------------
app.use(require('./routes/index'))
    //-------------------------------------

mongoose.connect(serverConfig.mongoBaseUrl, serverConfig.mongoConnectOptions, (error, res) => {
    if (error) {
        throw error
    }

    console.log('The Database is READY, the connection was successfuly :) ')
})


//console.log(module)

app.listen(process.env.PORT, () => {
    console.log('The RESTfulServer PORT enabled on: ', process.env.PORT, )
})