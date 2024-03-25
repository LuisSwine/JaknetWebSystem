import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { mostrar_mensaje_inicio } from '../helpers/funciones_simples.js'
import { bloquearUsuario, registrar_cierre_sesion, registrar_inicio_sesion, seleccionar_usuario, seleccionar_usuario_by_user } from '../models/Usuario.js'

//Definimos la variable global para los intentos de inicio de sesión
let loginAttempts = {}

// Función para incrementar el contador de intentos
function incrementLoginAttempts(username) {
    loginAttempts[username] = (loginAttempts[username] || 0) + 1;
    return loginAttempts[username];
}
  
  // Función para restablecer el contador de intentos
function resetLoginAttempts(username) {
    loginAttempts[username] = 0;
}

//MODULO #0 - INICIO DE SESION
const login = async(req, res)=>{
    try {
        //Recibimos los valores del formulario y los almacenamos en constantes
        const user = req.body.user
        const pass = req.body.pass

        //Verificamos que no existan campos en blanco
        if(!user || !pass) mostrar_mensaje_inicio(res, 'No puede dejar campos en blanco', 'login')
        else{

            let usuario

            await seleccionar_usuario_by_user(user).then(resultado=>{
                usuario = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la información del usuario: ', error)
            })

            //Verificamos si el usuario ingresado existe
            if(usuario.length == 0){
                //El usuario no existe
                mostrar_mensaje_inicio(res,'El usuario ingresado no existe', 'login')
                return
            }

            //Verificamos si el usuario no esta bloqueado
            if(usuario[0].estatus == 1){
                //El usuario esta bloqueado
                mostrar_mensaje_inicio(res,'Lo sentimos el usuario se encuentra bloqueado', 'login')
                return
            }

            //Verificamos que las contraseñas coincidan
            if(!(await bcrypt.compare(pass, usuario[0].pass))){
                const attempts = incrementLoginAttempts(usuario[0].usuario);
                if (attempts >= 3) {
                    await bloquearUsuario(usuario[0].folio).catch(error=>{
                        throw('Ha ocurrido un error al bloquear al usuario: ', error)
                    })
                    mostrar_mensaje_inicio(res, 'Demasiados intentos. Tu cuenta está bloqueada.', 'login', 'error')
                    return
                } else {
                    let texto = 'Contraseña incorrecta. Intentos restantes: ' + (3 - attempts)
                    mostrar_mensaje_inicio(res, texto, 'login', 'error')
                    return
                }
            }else{
                //Reseteamos el contador de intentos de inicio de sesion del usuario
                resetLoginAttempts(usuario[0].usuario);

                const id = usuario[0].folio
                const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, { expiresIn: process.env.JWT_TIEMPO_EXPIRA }) 
                            
                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Solo se enviará en conexiones HTTPS en producción
                    sameSite: 'Strict' // O 'Lax' dependiendo de tus necesidades
                }
                res.cookie('jwt', token, cookiesOptions)

                // Obtener la fecha y la hora actual
                const fechaActual = new Date();

                //Antes de este mensaje debemos registrar el inicio de sesion en la base de datos
                const registro = {
                    usuario: id,
                    fecha: fechaActual.toISOString().split('T')[0],
                    hora: fechaActual.toTimeString().split(' ')[0]
                }

                await registrar_inicio_sesion(registro).catch(error=>{
                    throw('Ha ocurrido un error al registrar la información de incio de sesión en la bitacora: ', error)
                })

                mostrar_mensaje_inicio(res, '¡INICIO DE SESION EXITOSO!', `?folio=${id}`, 'success')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const isAuthenticated = async(req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRETO)
            await seleccionar_usuario(decode.id).then(usuario =>{
                req.user = usuario[0]
            }).catch(error=>{
                mostrar_mensaje_inicio(res, 'Debe iniciar sesion', 'login', 'info')
                throw('Ha ocurrido un error al obtener la información del usuario: ', error)
            })
            return next()
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // El token ha expirado
                mostrar_mensaje_inicio(res, 'El token ha expirado, inicie sesión nuevamente', 'login', 'info');
            }else{
                mostrar_mensaje_inicio(res, 'Ha ocurrido un error y debe volver a iniciar sesión', 'login', 'info');
            }
        } 
    }else{
        mostrar_mensaje_inicio(res, 'Debe iniciar sesion', 'login', 'info')
    }
    return next()
}
const logout = async(req, res)=>{

    // Obtener la fecha y la hora actual
    const fechaActual = new Date();

    //Antes de este mensaje debemos registrar el inicio de sesion en la base de datos
    const registro = {
        usuario: req.query.usuario,
        fecha: fechaActual.toISOString().split('T')[0],
        hora: fechaActual.toTimeString().split(' ')[0]
    }

    await registrar_cierre_sesion(registro).catch(error=>{
        throw('Ha ocurrido un error al registrar la información de cierre de sesión en la bitacora: ', error)
    })

    res.clearCookie('jwt')
    return res.redirect('/')
}

export {
    login,
    isAuthenticated,
    logout
}