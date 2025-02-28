import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import router from './routes/router.js'

//Invocamos la clase de express
const app = express()

//Inicializamos el motor de plantillas
app.set('view engine', 'ejs')
app.set('views', './views')

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
app.use('/', router)

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