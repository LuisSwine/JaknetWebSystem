const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

function calculateRutaProy(cliente, ubicacion, proyecto, flag, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `/proyectosInvent?proyecto=${proyecto}&flag=0`; break;
        case 1: ruta = `/proyectosInvent?proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 2: ruta = `/proyectosInvent?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 3: ruta = `/proyectosInvent?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 4: ruta = `/proyectosInvent?proyecto=${proyecto}&flag=4&permisos=${permisos}`; break;
    }
    return ruta;
}
function formatoFecha(fecha, formato) {
    const map = {
        ss: fecha.getSeconds(),
        nn: fecha.getMinutes(),
        hh: fecha.getHours(),
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
    }

    return formato.replace(/ss|nn|hh|dd|mm|yy|yyy/gi, matched => map[matched])
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

//INVENTARIO PROYECTOS
exports.addProduct2Proyecto = async(req, res, next)=>{
    try {
        let data = {
            producto: req.body.producto,
            proyecto: req.body.proyecto,
            cantidad: req.body.cantidad,
            unidades: req.body.unidad
        }
        let bitacora = {
            usuario: req.body.usuario,
            producto: data.producto,
            cantidad: (-1) * parseFloat(data.cantidad),
            fecha: new Date()
        }

        //Definimos la ruta
        const ruta = calculateRutaProy(req.body.cliente, req.body.ubicacion, data.proyecto, req.body.flag, req.body.permisos)

        //Primero validamos la cantidad
        const cantidad_existente = req.body.cantidad_existente
        const folioInvent = req.body.folioInvent

        if(parseInt(data.cantidad) > parseInt(cantidad_existente)){
            showError(res, 'Error al mover el material', 'No hay suficientes existencias en el inventario', ruta)
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
                                //Validamos si en el proyecto ya hay una parte del producto en cuestion
                                conexion.query("SELECT folio, cantidad FROM op011_material_proyecto WHERE proyecto = ? AND producto = ?", [data.proyecto, data.producto], (error3, fila3)=>{
                                    if(error){
                                        throw error
                                    }else{
                                        if(fila3.length === 0){
                                            //Si no lo hay registramos 
                                            conexion.query("INSERT INTO op011_material_proyecto SET ?", data, (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(ruta)
                                                    return next
                                                }
                                            })
                                        }else{
                                            //Si lo hay lo modificamos
                                            let nuevaCantidad = parseInt(data.cantidad) + parseInt(fila3[0].cantidad)
                                            conexion.query("UPDATE op011_material_proyecto SET cantidad = ? WHERE folio = ?", [nuevaCantidad, fila3[0].folio], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(ruta)
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
                                //Validamos si en el proyecto ya hay existencias del producto en cuestion
                                conexion.query("SELECT folio, cantidad FROM op011_material_proyecto WHERE proyecto = ? AND producto = ?", [data.proyecto, data.producto], (error3, fila3)=>{
                                    if(error){
                                        throw error
                                    }else{
                                        if(fila3.length === 0){
                                            //Si no lo hay registramos 
                                            conexion.query("INSERT INTO op011_material_proyecto SET ?", data, (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(ruta)
                                                    return next
                                                }
                                            })
                                        }else{
                                            //Si lo hay lo modificamos
                                            let nuevaCantidad = parseInt(data.cantidad) + parseInt(fila3[0].cantidad)
                                            conexion.query("UPDATE op011_material_proyecto SET cantidad = ? WHERE folio = ?", [nuevaCantidad, fila3[0].folio], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(ruta)
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
        const registro = req.query.registro //op011_material_proyecto.folio
        const producto = req.query.producto //folio_producto
        const cantidad = req.query.cantidad //cantidad
        const proyecto = req.query.proyecto //proyecto
        const unidades = req.query.unidades //unidades
        const usuario  = req.query.usuario  //usuario

        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, proyecto, req.query.flag, req.query.permisos)

        let bitacora = {
            usuario: usuario,
            producto: producto,
            cantidad: cantidad, 
            fecha: new Date()
        }

        //Elinamos el registro
        conexion.query("DELETE FROM op011_material_proyecto WHERE folio = ?", [registro], (error, fila)=>{
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
                                            res.redirect(ruta)
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
                                            res.redirect(ruta)
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
exports.modificarInventProy = async(req, res, next)=>{
    try {
        const cantidadActual = parseInt(req.query.cantidadActual)
        const nuevaCantidad  = parseInt(req.query.nuevaCantidad)
        const producto       = req.query.producto
        const usuario        = req.query.usuario
        const registro       = req.query.registro
        const unidades       = req.query.unidades
        const proyecto       = req.query.proyecto

        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, proyecto, req.query.flag, req.query.permisos)

        let bitacora = {
            usuario: usuario,
            producto: producto,
            cantidad: 0,
            fecha: new Date()
        }
        //Primero analizamos si es aumento o drecrento
        if(cantidadActual === nuevaCantidad){
            //No hacemos nada
            res.redirect(ruta)
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
                                //Modificamos la cantidad en el Inventario del Proyecto
                                conexion.query("UPDATE op011_material_proyecto SET cantidad = ? WHERE folio = ?", [nuevaCantidad, registro], (error3, fila3)=>{
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
                                                    res.redirect(ruta)
                                                    return next()
                                                }
                                            })
                                        }else{
                                            let difInvent = existencias - diferencia
                                            conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [difInvent, folioInvent], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    res.redirect(ruta)
                                                    return next()
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }else if(existencias < diferencia){
                        showError(res, 'Imposible mover Inventario', `No fue posible mover el inventario pues no hay suficientes existencias en Bodega`, ruta)
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
                    conexion.query("UPDATE op011_material_proyecto SET cantidad = ? WHERE folio = ?", [nuevaCantidad, registro], (error2, fila2)=>{
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
                                                res.redirect(ruta)
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
                                                res.redirect(ruta)
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
exports.editFromInvent = async(req, res, next)=>{
    try {
        //Calculamos el movimiento
        let registro = req.query.registro
        let actual = req.query.cantidadActual
        let nueva = req.query.nuevaCantidad
        //Recibimos los datos
        let movimiento = {
            usuario: req.query.usuario,
            producto: req.query.producto,
            cantidad: nueva - actual,
            fecha: new Date()
        }
        if(actual == nueva){
            res.redirect(`/admininventario`)
            return next()
        }else{
            //Primero registramos el movimiento
            conexion.query('INSERT INTO op016_movimientos_inventario SET ?', movimiento, (error, fila)=>{
                if(error){
                    throw error
                }else{
                    //Hacemos el update en el inventario
                    conexion.query('UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?', [nueva, registro], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            res.redirect(`/admininventario`)
                            return next()
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
exports.deleteFromInvent = async(req, res, next)=>{
    try {
        //Calculamos el movimiento
        let registro = req.query.registro
        //Recibimos los datos
        let movimiento = {
            usuario: req.query.usuario,
            producto: req.query.producto,
            cantidad: -1 * req.query.cantidad,
            fecha: new Date()
        }
        
        //Primero registramos el movimiento
        conexion.query('INSERT INTO op016_movimientos_inventario SET ?', movimiento, (error, fila)=>{
            if(error){
                throw error
            }else{
                //Hacemos el update en el inventario
                conexion.query('DELETE FROM cat020_inventario WHERE folio = ?', [registro], (error2, fila2)=>{
                    if(error2){
                        throw error2
                    }else{
                        res.redirect(`/admininventario`)
                        return next()
                    }
                })
            }
        }) 
    } catch (error) {
        console.log(error)
        return next()
    }
}