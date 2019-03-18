# RESTfulServer
> Server 

1. Execute the next command in the root folder (at the same level of "server" folder), in order to install all the npm libraries (node_modules) needed for using this RESTful server in your backend.

```
npm install
npm update
```

2. Go to the folder "server" and execute the server.js file with the tool nodemon (https://www.npmjs.com/package/nodemon).

```
cd server
npm i -g nodemon
nodemon server.js
```

or

```
  npm start --> This command executes "start": "node server/server.js" of package.json. This one must exist to deploy the App in "Heroku Application Platform".
  npm run nodemon --> This command executes "nodemon server/server.js" of package.json
  
```


## Remote Environment
> * Heroku: Cloud Application Platform --> Public Environment deployed
>     * CURRENT deployed Server (baseUrl) --> https://hoysiquepuedes-restfulserver.herokuapp.com
>     * Supported requests:
>          * HTTP GET byId TypeI --> {{baseUrl}}/usuario/{{id}}
>          * HTTP GET bySearchQuery TypeII --> {{baseUrl}}/usuario?fromPaging=0&resultLimit=10  ||  {{baseUrl}}/usuario?fromPaging=0&_count=10

>          * HTTP POST for creating "usuario" --> {{baseUrl}}/usuario
>               * Body request e.g. 
                        {
                            "nombre":"Leonardo",
                            "edad": 32,
                            "email":"test1@gmail.com",
                            "password":"12345",
                            "role" : "USER_ROLE"
                        }

>          * HTTP DELETE byId --> {{baseUrl}}/usuario/{{id}}



## Changelog
> Detailed changes for each release are documented in the [release notes](https://github.com/leomartinjimenez/RESTfulServer/releases).
