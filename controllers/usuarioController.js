const conexion = require('../database/db')
const bcryptjs = require('bcryptjs')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')
const { parse } = require('path')

exports.proyectosAsistencia = async(req, res, next)=>{
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
exports.resgistrarAsistencia = async(req, res, next)=>{
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
function showError(res, titulo, mensaje, ruta){
    res.render('Error/showInfo', {
        title: titulo,
        alert: true,
        alertTitle: 'INFORMACION',
        alertMessage: mensaje,
        alertIcon: 'info',
        showConfirmButton: true,
        timer: 8000,
        ruta: ruta
    })
}

//Inventario
exports.addInvent2User = async(req, res, next)=>{
    try {
        let data = {
            usuario: req.body.usuario,
            producto: req.body.producto,
            cantidad: req.body.cantidad,
            unidades: req.body.unidad
        }
        let bitacora = {
            usuario: data.usuario,
            producto: data.producto,
            cantidad: (-1) * parseFloat(data.cantidad),
            fecha: new Date()
        }
        //Primero validamos la cantidad
        const cantidad_existente = req.body.cantidad_existente
        const folioInvent = req.body.folioInvent

        if(parseInt(data.cantidad) > parseInt(cantidad_existente)){
            showError(res, 'Error al mover el material', 'No hay suficientes existencias en el inventario', `moverInventUser?usuario=${data.usuario}`)
        }else{
            //Primero registramos el movimiento en la bitacora
            conexion.query("INSERT INTO op016_movimientos_inventario SET ?", bitacora, (error, fila)=>{
                if(error){
                    throw error
                }else{
                    if(data.cantidad == cantidad_existente){
                        //Eliminamos el registro del inventario
                        conexion.query("DELETE FROM cat020_inventario WHERE folio = ?", [folioInvent], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                //Validamos si el usuario ya tiene una parte del producto en posesion
                                conexion.query("SELECT folio, cantidad FROM op013_material_usuario WHERE usuario = ? AND producto = ?", [data.usuario, data.producto], (error3, fila3)=>{
                                    if(error){
                                        throw error
                                    }else{
                                        if(fila3.length === 0){
                                            //Si no lo hay registramos 
                                            conexion.query("INSERT INTO op013_material_usuario SET ?", data, (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(`/miInventario?usuario=${data.usuario}`)
                                                    return next
                                                }
                                            })
                                        }else{
                                            //Si lo hay lo modificamos
                                            let nuevaCantidad = parseInt(data.cantidad) + parseInt(fila3[0].cantidad)
                                            conexion.query("UPDATE op013_material_usuario SET cantidad = ? WHERE folio = ?", [nuevaCantidad, fila3[0].folio], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(`/miInventario?usuario=${data.usuario}`)
                                                    return next
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }else{
                        //Modificamos la cantidad en el inventario
                        let inventCant = parseInt(cantidad_existente) - parseInt(data.cantidad)
                        conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [inventCant, folioInvent], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                //Validamos si el usuario ya tiene una parte del producto en posesion
                                conexion.query("SELECT folio, cantidad FROM op013_material_usuario WHERE usuario = ? AND producto = ?", [data.usuario, data.producto], (error3, fila3)=>{
                                    if(error){
                                        throw error
                                    }else{
                                        if(fila3.length === 0){
                                            //Si no lo hay registramos 
                                            conexion.query("INSERT INTO op013_material_usuario SET ?", data, (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(`/miInventario?usuario=${data.usuario}`)
                                                    return next
                                                }
                                            })
                                        }else{
                                            //Si lo hay lo modificamos
                                            let nuevaCantidad = parseInt(data.cantidad) + parseInt(fila3[0].cantidad)
                                            conexion.query("UPDATE op013_material_usuario SET cantidad = ? WHERE folio = ?", [nuevaCantidad, fila3[0].folio], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(`/miInventario?usuario=${data.usuario}`)
                                                    return next
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }) 
                    }
                    
                        
                }
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.returnAll2Invent = async(req, res, next)=>{
    try {
        const registro = req.query.registro
        const producto = req.query.producto
        const cantidad = req.query.cantidad
        const usuario = req.query.usuario
        const unidades =  req.query.unidades

        let bitacora = {
            usuario: usuario,
            producto: producto,
            cantidad: cantidad, 
            fecha: new Date()
        }

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
                                            res.redirect(`/miInventario?usuario=${usuario}`)
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
                                            res.redirect(`/miInventario?usuario=${usuario}`)
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
exports.modificarInventPersonal = async(req, res, next)=>{
    try {
        const cantidadActual = parseInt(req.query.cantidadActual)
        const nuevaCantidad = parseInt(req.query.nuevaCantidad)
        const producto = req.query.producto
        const usuario = req.query.usuario
        const registro = req.query.registro
        const unidades = req.query.unidades

        let bitacora = {
            usuario: usuario,
            producto: producto,
            cantidad: 0,
            fecha: new Date()
        }
        //Primero analizamos si es aumento o drecrento
        if(cantidadActual === nuevaCantidad){
            //No hacemos nada
            res.redirect(`/miInventario?usuario=${usuario}`)
            return next()
        }else if(cantidadActual < nuevaCantidad){
            //Calculamos la diferencia
            let diferencia = nuevaCantidad - cantidadActual
            //Validamos que haya suficiente existencia en el inventario
            conexion.query("SELECT folio, cantidad FROM cat020_inventario WHERE producto = ?", [producto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    let existencias = parseInt(fila[0].cantidad)
                    const folioInvent = fila[0].folio
                    if(existencias >= diferencia){
                        //Podemos hacer el movimiento (Primero registramos en la bitacora)
                        bitacora.cantidad = (-1) * diferencia
                        conexion.query("INSERT INTO op016_movimientos_inventario SET ?", bitacora, (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                //Modificamos la cantidad en el Inventario del Usuario
                                conexion.query("UPDATE op013_material_usuario SET cantidad = ? WHERE folio = ?", [nuevaCantidad, registro], (error3, fila3)=>{
                                    if(error3){
                                        throw error3
                                    }else{
                                        //Modificamos el inventario
                                        if(existencias == diferencia){
                                            //Eliminamos el registro del inventario
                                            conexion.query("DELETE FROM cat020_inventario WHERE folio = ?", [folioInvent], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(`/miInventario?usuario=${usuario}`)
                                                    return next()
                                                }
                                            })
                                        }else{
                                            let difInvent = existencias - diferencia
                                            conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [difInvent, folioInvent], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(`/miInventario?usuario=${usuario}`)
                                                    return next()
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }else if(existencias < diferencia){
                        showError(res, 'Imposible mover Inventario', `No fue posible mover el inventario pues no hay suficientes existencias en Bodega`, `/miInventario?usuario=${usuario}`)
                        return next()
                    }
                }
            })
        }else if(cantidadActual > nuevaCantidad){
            //Quiere decir que devolveremos existencias al inventario
            //Primero registramos el movimiento 
            let diferencia = cantidadActual - nuevaCantidad
            bitacora.cantidad = diferencia
            conexion.query("INSERT INTO op016_movimientos_inventario SET ?", bitacora, (error, fila)=>{
                if(error){
                    throw error
                }else{
                    //Modificamos las existencias en el inventario
                    conexion.query("UPDATE op013_material_usuario SET cantidad = ? WHERE folio = ?", [nuevaCantidad, registro], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            //Consultamos las existencias del inventario
                            conexion.query("SELECT folio, cantidad FROM cat020_inventario WHERE producto = ?", [producto], (error3, fila3)=>{
                                if(error3){
                                    throw error3
                                }else{
                                    if(fila3[0].cantidad === 0){
                                        //Si no hay registro en el inventario, entonces lo agregamos
                                        let inventario = {
                                            producto: producto,
                                            cantidad: diferencia,
                                            unidades: unidades
                                        }
                                        conexion.query("INSERT INTO cat020_inventario SET ?", inventario, (error4, fila4)=>{
                                            if(error4){
                                                throw error4
                                            }else{
                                                res.redirect(`/miInventario?usuario=${usuario}`)
                                                return next()
                                            }
                                        })
                                    }else{
                                        //Lo modificamos
                                        let folioInvent = fila3[0].folio
                                        let cantidadInvent = parseInt(fila3[0].cantidad) + diferencia
                                        conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [cantidadInvent, folioInvent], (error4, fila4)=>{
                                            if(error4){
                                                throw error4
                                            }else{
                                                res.redirect(`/miInventario?usuario=${usuario}`)
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
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}

//Funciones del perfil
exports.changeNombreUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let nombre = req.query.nombre
        let apellido = req.query.apellido

        conexion.query("UPDATE cat001_usuarios SET nombres = ?, apellidos = ? WHERE folio = ?", [nombre, apellido, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/miPerfil?usuario=${folio}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.changeTelUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let telefono = req.query.telefono

        conexion.query("UPDATE cat001_usuarios SET telefono = ? WHERE folio = ?", [telefono, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/miPerfil?usuario=${folio}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.changeMailUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let email = req.query.email

        conexion.query("UPDATE cat001_usuarios SET email = ? WHERE folio = ?", [email, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/miPerfil?usuario=${folio}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.changePassUser = async(req, res, next)=>{
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
                if(!(await bcryptjs.compare(actual, contra))){
                    showError(res, 'Error al cambiar', 'Contraseñas Actuales no coinciden', `/miPerfil?usuario=${folio}`)
                    return next()
                }else{
                    let nuevaPass = await bcryptjs.hash(nueva, 8)
                    conexion.query("UPDATE cat001_usuarios SET pass = ? WHERE folio = ?", [nuevaPass, folio], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            res.redirect( `/miPerfil?usuario=${folio}`)
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

exports.changePassUserAdmin = async(req, res, next)=>{
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
                if(!(await bcryptjs.compare(admin, contraAdmin))){
                    showError(res, 'Error al cambiar', 'Contraseñas de Administrador Incorrecta', `/adminusers`)
                    return next()
                }else{
                    let nuevaPass = await bcryptjs.hash(nueva, 8)
                    conexion.query("UPDATE cat001_usuarios SET pass = ? WHERE folio = ?", [nuevaPass, folioUser], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            res.redirect( `/adminusers`)
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