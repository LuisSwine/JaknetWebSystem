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
        //Data es el movimiento del material
        let data = {
            usuario: req.body.usuario_afectado, //Usuario a quien se le asigna el material
            producto: req.body.producto,        //El producto que esta siendo asignado
            cantidad: req.body.cantidad,        //La cantidad de producto que esta siendo asiganada
            unidades: req.body.unidad           //La unidad con la que se mide cierto producto
        }
        let bitacora = {
            usuario_registra: req.body.usuario,            //Usuario que registra el movimiento
            producto: data.producto,                       //Producto que se esta asignando
            cantidad: (-1) * parseFloat(data.cantidad),    //Cantidad que se esta movilizando
            fecha: new Date(),                             //Datos de la fecha del movimiento
            usuario_afectado: data.usuario,                 //Folio del usuario afectado
            almacen: req.body.almacen
        }

        let ruta_regreso = (req.body.flag == 1) ? `moverInventUser?usuario=${data.usuario}&flag=${req.body.flag}` : `moverInventUser?usuario=${data.usuario}`;
        let ruta_back = (req.body.flag == 1) ? `/inventario/mi_inventario?usuario=${data.usuario}&flag=${req.body.flag}` : `/inventario/mi_inventario?usuario=${data.usuario}`;


        //Primero validamos la cantidad
        const cantidad_existente = req.body.cantidad_existente //Obtenemos la cantidad actual en bodega para saber si hay suficientes existencias
        const folioInvent = req.body.folioInvent               //Obtenemso el folio de inventario del producto que es diferente a su folio como producto 

        //Si la cantidad que se quiere mover es mayor a la cantidad existente, rechazamos el movimiento
        if(parseInt(data.cantidad) > parseInt(cantidad_existente)){
            showError(res, 'Error al mover el material', 'No hay suficientes existencias en el inventario', ruta_regreso)
        }else{
            //Primero registramos el movimiento en la bitacora
            conexion.query("INSERT INTO op016_movimientos_inventario SET ?", bitacora, (error, fila)=>{
                if(error){
                    throw error //EN CASO DE UN ERROR MOSTRAMOS ESTE POR CONSOLA
                }else{
                    //Verificamos si la cantidad es la misma que en la bodega es decir, se queda sin material la bodega
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
                                                    res.redirect(`${ruta_back}`)
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
                                                    res.redirect(`${ruta_back}`)
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
                                                    res.redirect(`${ruta_back}`)
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
                                                    res.redirect(`${ruta_back}`)
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
exports.changeNombreUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let nombre = req.query.nombre
        let apellido = req.query.apellido

        conexion.query("UPDATE cat001_usuarios SET nombres = ?, apellidos = ? WHERE folio = ?", [nombre, apellido, folio], (error, fila)=>{
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
exports.changeTelUsuario = async(req, res, next)=>{
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
exports.changeMailUsuario = async(req, res, next)=>{
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
}