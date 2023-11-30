import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import conexion from '../database/db.js'
import { formatear_fecha, mostrar_error, mostrar_mensaje_inicio } from '../helpers/funciones_simples.js'

//MODULO #0 - INICIO DE SESION
const login = async(req, res)=>{
    try {
        //Recibimos los valores del formulario y los almacenamos en constantes
        const user = req.body.user
        const pass = req.body.pass

        if(!user || !pass) mostrar_mensaje_inicio(res, 'No puede dejar campos en blanco', 'login')
        else{
            conexion.query('SELECT * FROM cat001_usuarios WHERE usuario = ?', user, async(error, results)=>{
                if(error) {
                    console.log(error)
                }else{
                    if(results.length == 0 || !(await bcrypt.compare(pass, results[0].pass))) mostrar_mensaje_inicio(res, 'Usuario y/o contraseña incorrecta', 'login', 'error')
                    else{
                        const id = results[0].folio

                        const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, { expiresIn: process.env.JWT_TIEMPO_EXPIRA }) 
                            
                        const cookiesOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookiesOptions)

                        mostrar_mensaje_inicio(res, '¡INICIO DE SESION EXITOSO!', `?folio=${id}`, 'success')
                    }
                }
                    
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const isAuthenticated = async(req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM cat001_usuarios WHERE folio = ?', [decode.id], (error, results)=>{
                if(error){
                    mostrar_mensaje_inicio(res, 'Debe iniciar sesion', 'login', 'info')
                }
                else{    
                    if(!results){return next()}
                    req.user = results[0]
                    return next()
                }
            })
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // El token ha expirado
                mostrar_mensaje_inicio(res, 'El token ha expirado, inicie sesión nuevamente', 'login', 'info');
            }else{
                return next()
            }
        } 
    }else{
        mostrar_mensaje_inicio(res, 'Debe iniciar sesion', 'login', 'info')
    }
}
const logout = (_, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}

export {
    login,
    isAuthenticated,
    logout
}