//Aqui realizamos la conexion a la base de datos
import { createConnection } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({path: 'env/.env'})

//Creamos la conexion
const conexion = createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

//Ahora realizamos la conexion
conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error)
        return
    }
    console.log('CONEXION EXITOSA A BASE DE DATOS')
})

export default conexion