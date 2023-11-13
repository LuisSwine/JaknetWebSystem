import conexion from '../database/db.js'
import bcryptjs from 'bcryptjs'

import { 
    seleccionar_usuarios, 
    crear_usuario, 
    cambiar_nombre, 
    cambiar_telefono, 
    cambiar_email, 
    get_password, 
    cambiar_contra, 
    seleccionar_usuario
} from '../models/Usuario.js'
import { mostrar_error } from '../helpers/funciones_simples.js'

const proyectosAsistencia = async(req, _, next)=>{
    try {
        conexion.query("SELECT * FROM proyectos_asistencia_view001 WHERE folio_usuario = ? AND (folio_estatus <> 4 OR folio_estatus <> 6)", [req.query.folio], (error, filas)=>{
            if(error){
                throw error
            }else{
                req.proyectosAsist = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

const getUsuarios = async(req, _, next)=>{
    try {
        await seleccionar_usuarios().then(resultado =>{
            req.usuarios = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener los usuarios: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getUsuario = async(req, _, next)=>{
    try {
        await seleccionar_usuario(req.query.usuario).then(resultado=>{
            req.usuario = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createUser = async(req, res, next)=>{
    try {
        const passHash = await bcryptjs.hash(req.body.pass, 8)

        let data = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            usuario: req.body.usuario,
            pass: passHash,
            telefono: req.body.telefono,
            email: req.body.email,
            documentacion: req.body.linkDoc,
            tipo_usuario: req.body.tipoUser    
        }
        await crear_usuario(data).then(_ =>{
            res.redirect('/usuarios/adminusers')
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al registrar usuario: ', error)
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}

//MI PERFIL
const updateNombreUsuario = async(req, res, next)=>{
    try {
        const folio = req.query.folio
        const nombre = req.query.nombre
        const apellido = req.query.apellido

        await cambiar_nombre(folio, nombre, apellido).then(_ =>{
            res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        }) 
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateTelefonoUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let telefono = req.query.telefono

        await cambiar_telefono(folio, telefono).then(_ =>{
            res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateEmailUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let email = req.query.email

        await cambiar_email(folio, email).then(_ =>{
            res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updatePassUsuario = async(req, res, next)=>{
    try {
        const folio = req.query.folio
        const actual = req.query.actual
        const nueva = req.query.nueva

        let contra_consultada = ''

        await get_password(folio).then(result =>{
            contra_consultada = result
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        })
        
        if(!(await bcryptjs.compare(actual, contra_consultada))){
            mostrar_error(res, 'Error al cambiar', 'Contraseñas Actuales no coinciden', `/miPerfil?usuario=${folio}`)
            return next()
        }else{
            const nuevaPass = await bcryptjs.hash(nueva, 8)
            await cambiar_contra(folio, nuevaPass).then(_ =>{
                res.redirect( `/usuarios/miPerfil?usuario=${folio}`)
                return next()
            })
            .catch(error=>{
                //TODO: MEJORAR LA GESTION DE LOS ERRORES
                throw new Error('Error al editar usuario: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    proyectosAsistencia,
    getUsuarios,
    getUsuario,
    createUser,
    updateNombreUsuario,
    updateTelefonoUsuario,
    updateEmailUsuario,
    updatePassUsuario
}

/* 

export asyncfunction resgistrarAsistencia(req, res, next){
    try {
        let data = {
            usuario: req.query.usuario,
            proyecto: req.query.proyecto,
            fecha: new Date(),
            hora: new Date()
        }
        conexion.query('INSERT INTO op006_asistencia SET ?', data, (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/?folio=${data.usuario}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}


//Inventario

export asyncfunction returnAll2Invent(req, res, next){
    try {
        const registro = req.query.registro
        const producto = req.query.producto
        const cantidad = req.query.cantidad
        const usuario_registra = req.query.usuario_registra
        const usuario_afectado = req.query.usuario_afectado
        const unidades =  req.query.unidades4
        const flag =  req.query.flag

        let bitacora = {
            usuario_registra: usuario_registra,
            producto: producto,
            cantidad: cantidad, 
            fecha: new Date(),
            usuario_afectado: usuario_afectado
        }

        let ruta_regreso = (flag == 1) ? `/miInventario?usuario=${usuario_afectado}&flag=${flag}` : `/miInventario?usuario=${usuario_afectado}`

        //Elinamos el registro
        conexion.query("DELETE FROM op013_material_usuario WHERE folio = ?", [registro], (error, fila)=>{
            if(error){
                throw error
            }else{
                //Registramos el movimiento en la bitacora
                conexion.query("INSERT INTO op016_movimientos_inventario SET ?", bitacora, (error2, fila2)=>{
                    if(error2){
                        throw error2
                    }else{
                        //Verficamos si existe el registro en el inventario
                        conexion.query("SELECT folio, cantidad FROM cat020_inventario WHERE producto = ?", [producto], (error3, fila3)=>{
                            if(error3){
                                throw error3
                            }else{
                                if(fila3[0].length === 0){
                                    //Si no existe, entonces lo registramos en el inventario
                                    let inventario = {
                                        producto: producto,
                                        cantidad: cantidad,
                                        unidades: unidades
                                    }
                                    conexion.query("INSERT INTO cat020_inventario SET ?", inventario, (error4, fila4)=>{
                                        if(error4){
                                            throw error4
                                        }else{
                                            res.redirect(ruta_regreso)
                                            return next()
                                        }
                                    })
                                }else{
                                    //Si ya existe entonces solo modificamos la cantidad
                                    let nuevaCantidad = parseInt(fila3[0].cantidad) + parseInt(cantidad)
                                    conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [nuevaCantidad, fila3[0].folio], (error4, fila4)=>{
                                        if(error4){
                                            throw error4
                                        }else{
                                            res.redirect(ruta_regreso)
                                            return next()
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

function getExistenciasAlmacen(producto, almacen){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio, cantidad FROM cat020_inventario WHERE producto = ? AND almacen = ?", [producto, almacen], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve(fila[0])
            }
        })
    })
}




//Funciones del modulo de mi perfil

export asyncfunction changeTelUsuario(req, res, next){
    try {
        let folio = req.query.folio
        let telefono = req.query.telefono

        conexion.query("UPDATE cat001_usuarios SET telefono = ? WHERE folio = ?", [telefono, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
export asyncfunction changeMailUsuario(req, res, next){
    try {
        let folio = req.query.folio
        let email = req.query.email

        conexion.query("UPDATE cat001_usuarios SET email = ? WHERE folio = ?", [email, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

export asyncfunction changePassUser(req, res, next){
    try {
        let folio = req.query.folio
        let actual = req.query.actual
        let nueva = req.query.nueva

        //Primero consultamos la contraseña ya registrada
        conexion.query("SELECT pass FROM cat001_usuarios WHERE folio = ?", [folio], async(error, fila)=>{
            if(error){
                throw error
            }else{
                let contra = fila[0].pass
                if(!(await compare(actual, contra))){
                    showError(res, 'Error al cambiar', 'Contraseñas Actuales no coinciden', `/miPerfil?usuario=${folio}`)
                    return next()
                }else{
                    let nuevaPass = await hash(nueva, 8)
                    conexion.query("UPDATE cat001_usuarios SET pass = ? WHERE folio = ?", [nuevaPass, folio], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            res.redirect( `/usuarios/miPerfil?usuario=${folio}`)
                            return next()
                        }
                    })
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

export asyncfunction changePassUserAdmin(req, res, next){
    try {
        let folioUser = req.query.folioUser
        let folioAdmin = req.query.folioAdmin
        let admin = req.query.admin
        let nueva = req.query.nueva

        //Primero consultamos la contraseña ya registrada
        conexion.query("SELECT pass FROM cat001_usuarios WHERE folio = ?", [folioAdmin], async(error, fila)=>{
            if(error){
                throw error
            }else{
                let contraAdmin = fila[0].pass
                if(!(await compare(admin, contraAdmin))){
                    showError(res, 'Error al cambiar', 'Contraseñas de Administrador Incorrecta', `/adminusers`)
                    return next()
                }else{
                    let nuevaPass = await hash(nueva, 8)
                    conexion.query("UPDATE cat001_usuarios SET pass = ? WHERE folio = ?", [nuevaPass, folioUser], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            res.redirect( `/usuarios/adminusers`)
                            return next()
                        }
                    })
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
} */