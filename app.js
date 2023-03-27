//Invocamos los modulos a utilizar
//Primero invocamos express
const express = require('express')
//Despues invocamos a env
const dotenv = require('dotenv')
//Despues invocamos a cookie-parser
const cookieParser = require('cookie-parser')

//Invocamos la clase de express
const app = express()

//Inicializamos el motor de plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


//Inicializamos la carpeta public para los archivos estaticos
app.use(express.static('public'))

//Configuramos node para el procesamiento de datos
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Inicialziamos las variables de entorno
dotenv.config({path: './env/.env'})

//Inicializamos las cookies
app.use(cookieParser())

//Llamamos al enrutador
app.use('/', require('./routes/router'))

//Fragmento de codigo para eliminar el cache
app.use(function(req, res, next){
    if(!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})  

//Accedemos a los metodos de express
//Utilizamos listen para levantar el servidor
app.listen(3000, ()=>{
    console.log('SERVER UP running in http://localhost:3000') 
})