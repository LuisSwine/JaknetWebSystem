import { eliminar_del_almacen, registrar_en_bitacora_almacen } from "../models/Almacen.js";
import { eliminar_del_inventario, eliminar_del_inventario_proyecto, eliminar_del_inventario_usuario, modificar_cantidad_almacen, modificar_cantidad_proyecto, modificar_cantidad_usuario, obtener_existencias_inventario, registrar_movimiento_inventario_proyecto, registrar_producto_en_almacen, registrar_producto_en_usuario, registrar_producto_proyecto, reporte_general_inventario, reporte_general_inventario_definido, reporte_usuario_inventario, reporte_usuario_inventario_definido, seleccionar_inventario, seleccionar_inventario_en_almacen, seleccionar_inventario_usuario, seleccionar_primer_almacen, seleccionar_producto_usuario, seleccionar_registros_inventario, vaciar_almacen, validar_cantidad_proyecto, validar_existencia_inventario, validar_posesion_inventario_usuario } from "../models/Inventario.js";

function calculateRutaProy(cliente, ubicacion, proyecto, flag, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `/proyectos/inventario?proyecto=${proyecto}&flag=0`; break;
        case 1: ruta = `/proyectos/inventario?proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 2: ruta = `/proyectos/inventario?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 3: ruta = `/proyectos/inventario?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 4: ruta = `/proyectos/inventario?proyecto=${proyecto}&flag=4&permisos=${permisos}`; break;
    }
    return ruta;
}

const getInventario = async(req, _, next)=>{
    try {
        await seleccionar_inventario().then(resultado=>{
            req.inventario = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el inventario general: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getInventarioOn = async (req, _, next)=>{
    try {
        const almacen = req.query.almacen;
        
        await seleccionar_inventario_en_almacen(almacen).then(resultado=>{
            req.inventario = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al seleccionar el inventario del almacen: ', error)
        })
    } catch (error) {
        console.log(error);
        return next();
    }
}
const getReporteGeneral = async (req, _, next)=>{
    try {
        if(req.query.inicio && req.query.termino){
            const inicio = new Date(req.query.inicio)
            const termino = new Date(req.query.termino)

            await reporte_general_inventario_definido(inicio, termino).then(resultado=>{
                req.movimientos = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la información del reporte: ', error)
            })
        }else{
            await reporte_general_inventario().then(resultado=>{
                req.movimientos = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la información del reporte: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getReporteUsuario = async(req, _, next)=>{
    try {
        
        const usuario = req.query.usuario
        
        if(req.query.inicio && req.query.termino){
            const inicio = new Date(req.query.inicio)
            const termino = new Date(req.query.termino)
            
            await reporte_usuario_inventario_definido(inicio, termino, usuario).then(resultado=>{
                req.movimientos = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la informacion del reporte de inventario del usuario seleccionado: ', error)
            })
        }else{
            await reporte_usuario_inventario(usuario).then(resultado=>{
                req.movimientos = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el reporte de inventario del usuario seleccionado: ', error)
            })
        }

        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getInventarioUsuario = async(req, _, next)=>{
    try {

        await seleccionar_inventario_usuario(req.query.usuario).then(resultado=>{
            req.productos = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del inventario del usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setInventario = async(req, res, next) =>{
    try {
        //Recibimos la informacion
        const producto = req.body.producto
        const cantidad = req.body.cantidad
        const unidades = req.body.unidades
        const almacen  = req.body.almacen
        const usuario  = req.body.usuario

        let is_in_storage = false

        await validar_existencia_inventario(producto, almacen).then(resultado=>{
            is_in_storage = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las existencias en el inventario: ', error)
        })

        if(!is_in_storage){
            const registro = {
                producto: producto,
                cantidad: cantidad,
                unidades: unidades,
                almacen: almacen
            }
            await registrar_producto_en_almacen(registro).catch(error=>{
                throw('Ha ocurrido un error al intentar agregar el producto a almacén: ', error)
            })
        }else{
            let nueva_cantidad = parseFloat(cantidad) + parseFloat(is_in_storage.cantidad)
            let folio = is_in_storage.folio
            await modificar_cantidad_almacen(nueva_cantidad, folio).catch(error=>{
                throw('Ha ocurrido un error al actualizar la cantidad en el almacen: ', error)
            })
        }

        let bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: cantidad,
            fecha: new Date(),
            usuario_afectado: usuario,
            almacen: almacen
        }
        await registrar_en_bitacora_almacen(bitacora).catch(error=>{
            throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
        })
        res.redirect('/inventario/inventario_general')
        return next()
               
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setInventarioUsuario = async(req, res, next) => {
    try {
        //Data es el movimiento del material
        const data = {
            usuario: req.body.usuario_afectado, //Usuario a quien se le asigna el material
            producto: req.body.producto,        //El producto que esta siendo asignado
            cantidad: req.body.cantidad,        //La cantidad de producto que esta siendo asiganada
            unidades: req.body.unidad           //La unidad con la que se mide cierto producto
        }
        const bitacora = {
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
            return next()
        }else{

            await registrar_en_bitacora_almacen(bitacora).catch(error=>{
                throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
            })

            if(data.cantidad == cantidad_existente){
                await eliminar_del_inventario(folioInvent).catch(error=>{
                    throw('Ha ocurrido un error al eliminar el producto del inventario: ', error)
                })
            }else{
                let inventCant = parseInt(cantidad_existente) - parseInt(data.cantidad)
                await modificar_cantidad_almacen(inventCant, folioInvent).catch(error=>{
                    throw('Ha ocurrido un error al modificar el registro en el inventario: ', error)
                })
            }

            let does_user_has = false

            await validar_posesion_inventario_usuario(data.usuario, data.producto).then(resultado=>{
                does_user_has = resultado
            }).catch(error=>{
                throw('Error al verificar si el usuario tiene posesión del producto', error)
            })

            if(!does_user_has){
                await registrar_producto_en_usuario(data).catch(error=>{
                    throw('Ha ocurrido un error al registrar el producto al usuario: ', error)
                })
            }else{
                let nueva_cantidad = 0
                let folio = 0
                await seleccionar_producto_usuario(data.usuario, data.producto).then(resultado=>{
                    nueva_cantidad = parseInt(data.cantidad) + parseInt(resultado[0].cantidad)
                    folio = resultado[0].folio
                }).catch(error=>{
                    throw('Ha ocurrido un error al obtener la informacion del producto y el usuario: ', error)
                })

                await modificar_cantidad_usuario(nueva_cantidad, folio).catch(error=>{
                    throw('Ha ocurrido un error al actualizar la cantidad de productos del usuario: ', error)
                })
            }

            res.redirect(`${ruta_back}`)
            return next
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setInventarioProyecto = async(req, res, next)=>{
    try {
        const data = {
            producto: req.body.producto,
            proyecto: req.body.proyecto,
            cantidad: req.body.cantidad,
            unidades: req.body.unidad
        }
        const bitacora = {
            usuario_registra: req.body.usuario,
            producto: data.producto,
            cantidad: (-1) * parseFloat(data.cantidad),
            fecha: new Date(), 
            proyecto: data.proyecto,
            almacen: req.body.almacen
        }

        //Definimos la ruta
        const ruta = calculateRutaProy(req.body.cliente, req.body.ubicacion, data.proyecto, req.body.flag, req.body.permisos)

        //Obtenemos la cantidad total del producto en el inventario
        let cantidad_total_en_inventario = 0
        await obtener_existencias_inventario(data.producto).then(resultado=>{
            cantidad_total_en_inventario = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las existencias del producto en el inventario: ', error)
        })

        //Primero validamos la cantidad
        const cantidad_existente = req.body.cantidad_existente
        const folioInvent = req.body.folioInvent

        if(parseInt(data.cantidad) > parseInt(cantidad_existente)){
            showError(res, 'Error al mover el material', 'No hay suficientes existencias en el inventario', ruta)
            return next();
        }

        //Primero registramos el movimiento en la bitacora
        await registrar_movimiento_inventario_proyecto(bitacora).catch(error=>{
            throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
        })

        //Modificamos la cantidad en el inventario
        if(data.cantidad == cantidad_existente){
            await eliminar_del_almacen(folioInvent).catch(error=>{
                throw('Ha ocurrido un error al eliminar el registro del almacen: ', error)
            })
        }else{
            let cantidad_inventario = parseInt(cantidad_existente) - parseInt(data.cantidad);
            await modificar_cantidad_almacen(cantidad_inventario, folioInvent).catch(error=>{
                throw('Ha ocurrido un error al modificar la cantidad del almacen: ', error)
            });
        }

        let proyecto_has = null
        await validar_cantidad_proyecto(data.producto, data.proyecto).then(resultado=>{
            proyecto_has = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al verificar si hay una relacion entre el producto y el proyecto: ', error)
        })

        if(proyecto_has){
            await registrar_producto_proyecto(data).catch(error=>{
                throw('Ha ocurrido un error al registrar el producto y su relacion con el proyecto: ', error)
            })
        }else{
            let nuevaCantidad = parseInt(data.cantidad) + parseInt(proyecto_has[0].cantidad);
            await modificar_cantidad_proyecto(nuevaCantidad, proyecto_has[0].folio).catch(error=>{
                throw('Ha ocurrido un error al actualizar la cantidad de este producto en este proyecto: ', error)
            })
        }

        res.redirect(ruta)
        return next
        
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateInventario = async(req, res, next)=>{
    try {
        //RECIBIMOS LA INFORMACION POR GET 
        const registro = req.query.registro
        const producto = req.query.producto
        const actual   = req.query.cantidadActual
        const nueva    = req.query.nuevaCantidad
        const usuario  = req.query.usuario
        const almacen  =  req.query.almacen

        if(actual == nueva){
            res.redirect(`/inventario/inventario_general`)
            return next()
        }

        const bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: nueva - actual,
            fecha: new Date(),
            usuario_afectado: usuario,
            almacen: almacen
        }

        await registrar_en_bitacora_almacen(bitacora).catch(error=>{
            throw('Ha ocurrido un error al registrar el movimiento en el inventario: ', error)
        })

        await modificar_cantidad_almacen(nueva, registro).then(_=>{
            res.redirect(`/inventario/inventario_general`)
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al modificar las existencias en el inventario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateInventarioPersonal = async(req, res, next)=>{
    try {
        //Primero recibimos toda la informacion
        const cantidadActual   = parseInt(req.query.cantidadActual)
        const nuevaCantidad    = parseInt(req.query.nuevaCantidad)
        const producto         = req.query.producto
        const usuario_registra = req.query.usuario_registra
        const usuario_afectado = req.query.usuario_afectado
        const registro         = req.query.registro
        const unidades         = req.query.unidades
        const flag             = req.query.flag

        let ruta = (flag == 1) ? `inventario/mi_inventario?usuario=${usuario_afectado}&flag=${flag}` : `inventario/mi_inventario?usuario=${usuario_afectado}`

        if(cantidadActual === nuevaCantidad){
            //No hacemos nada
            res.redirect(`/${ruta}`)
            return next()
        }

        const bitacora = {
            usuario_registra: usuario_registra,
            producto: producto,
            cantidad: 0,
            fecha: new Date(),
            usuario_afectado: usuario_afectado,
            almacen: 0
        }

        //Primero analizamos si es aumento o drecremento
        if(cantidadActual < nuevaCantidad){
            //En caso de un aumento
            //Calculamos la diferencia
            let diferencia = parseFloat(nuevaCantidad) - parseFloat(cantidadActual)

            //Validamos que exista suficientes existencias en el inventario
            let existencias_inventario = 0
            await obtener_existencias_inventario(producto).then(resultado=>{
                existencias_inventario = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener las existencias del inventario: ', error)
            })
            if(existencias_inventario < diferencia){
                showError(res, 'ERROR AL MOVER EL INVENTARIO', 'No hay suficientes existencias en el inventario', ruta)
                return next()
            }
            
            //Ahora obtenemos las existencias
            let existencias = 0
            await seleccionar_registros_inventario(producto).then(resultado=>{
                existencias = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los registros del inventario: ', error)
            })
            let unidades_trasladadas = 0
            let i = 0
            let restante = diferencia

            while(unidades_trasladadas < diferencia){
                if(existencias[i].cantidad <= restante){
                    //Si la cantidad en esa ubicacion es menor entonces trasladamos todo
                    //Primero registramos en la bitacora
                    bitacora.cantidad = (-1) * parseFloat(existencias[i].cantidad)
                    bitacora.almacen = existencias[i].almacen
                    //Segundo eliminamos el registro del inventario
                    await eliminar_del_almacen(existencias[i].folio).catch(error=>{
                        throw('Error al eliminar del inventario: ', error)
                    })
                    //Registramos las unidades
                    unidades_trasladadas += parseFloat(existencias[i].cantidad)
                }
                if(existencias[i].cantidad > restante){
                    //Si hay mas en inventario que solo necesario solo trasladamos una parte
                    //Primero registramos en la bitacora
                    bitacora.cantidad = (-1) * parseFloat(restante)
                    bitacora.almacen = existencias[i].almacen
                    //Retiramos la cantidad del almacen
                    let nCantidad = parseFloat(existencias[i].cantidad) - parseFloat(restante)
                    await modificar_cantidad_almacen(nCantidad, existencias[i].folio).catch(error=>{
                        throw("No se pudo actualizar la cantidad del producto en el almacen: ", error)
                    })
                    unidades_trasladadas += restante
                }
                await registrar_en_bitacora_almacen(bitacora)
                restante = parseFloat(diferencia) - parseFloat(unidades_trasladadas)
                i += 1
            }
        }
        
        if(cantidadActual > nuevaCantidad){
            //Primero determinamos la cantidad a devolver
            let cant_2_return = parseFloat(cantidadActual) - parseFloat(nuevaCantidad)
            //Quiere decir que es un decremento
            //Primero definimos a que almacen enviaremos todo
            let does_exists = 0
            await seleccionar_registros_inventario(producto).then(resultado=>{
                does_exists = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los registros del inventario: ', error)
            })
            if(does_exists.length === 0){
                //Esto quiere decir que no existe en ninguna ubicación del inventario
                let almacen = 0
                await seleccionar_primer_almacen().then(resultado=>{
                    almacen = resultado
                }).catch(error=>{
                    throw('Ha ocurrido un error al obtener el primer almacen: ', error)
                })
                //Añadimos las existencias al primer almacen
                let data = {
                    producto: producto,
                    cantidad: cant_2_return,
                    unidades: unidades,
                    almacen: almacen
                    
                }
                await registrar_producto_en_almacen(data).catch(error=>{
                    throw('Ha ocurrido un error al registrar el producto en el almacen: ', error)
                })
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
                
            }else{
                let almacen = does_exists[0].almacen
                //Modificamos la cantidad en esa ubicacion
                let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cant_2_return)
                await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio).catch(error=>{
                    throw('Ha ocurrido un error al modificar la candidad del almacen: ', error)
                })
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
            }
            bitacora.cantidad = cant_2_return
            await registrar_en_bitacora_almacen(bitacora).catch(error=>{
                throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
            })
        }

        //Modificamos la cantidad en el proyecto
        await modificar_cantidad_usuario(nuevaCantidad, registro).catch(error=>{
            throw('Ha ocurrido un error al modificar la cantidad del usuario: ', error)
        })

        res.redirect(`/${ruta}`)
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateInventarioProyecto = async(req, res, next)=>{
    try {
        const cantidadActual = parseInt(req.query.cantidadActual)
        const nuevaCantidad  = parseInt(req.query.nuevaCantidad)
        const producto       = req.query.producto
        const usuario        = req.query.usuario
        const registro       = req.query.registro
        const unidades       = req.query.unidades
        const proyecto       = req.query.proyecto

        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, proyecto, req.query.flag, req.query.permisos)

        if(cantidadActual === nuevaCantidad){
            //No hacemos nada
            res.redirect(ruta)
            return next()
        }

        const bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: 0,
            fecha: new Date(),
            proyecto: proyecto,
            almacen: 0
        }

        //Primero analizamos si es aumento o drecremento
        if(cantidadActual < nuevaCantidad){
            //En caso de un aumento
            //Calculamos la diferencia
            const diferencia = parseFloat(nuevaCantidad) - parseFloat(cantidadActual)

            //Validamos que exista suficientes existencias en el inventario

            let existencias_inventario = 0
            await obtener_existencias_inventario(producto).then(resultado=>{
                existencias_inventario = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener las existencias del inventario: ', error)
            })

            //En caso de que no haya suficientes existencias en el inventario, no hacemos el movimiento
            if(existencias_inventario < diferencia){
                res.redirect(ruta)
                return next()
            }
            
            //Ahora obtenemos las existencias
            let existencias = null
            await seleccionar_registros_inventario(producto).then(resultado=>{
                existencias = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los registros del inventario: ', error)
            })
            
            let unidades_trasladadas = 0
            let i = 0
            let restante = diferencia

            while(unidades_trasladadas < diferencia){
                if(existencias[i].cantidad <= restante){
                    //Si la cantidad en esa ubicacion es menor entonces trasladamos todo
                    //Primero actualizamos los datos para la bitacora
                    bitacora.cantidad = (-1) * parseFloat(existencias[i].cantidad)
                    bitacora.almacen = existencias[i].almacen
                    //Segundo eliminamos el registro del inventario
                    await vaciar_almacen(existencias[i].folio).catch(error=>{
                        throw('Ha ocurrido un error al vaciar el almacen: ', error)
                    })
                    //Registramos las unidades
                    unidades_trasladadas += parseFloat(existencias[i].cantidad)
                }
                if(existencias[i].cantidad > restante){
                    //Si hay mas en inventario que solo necesario solo trasladamos una parte
                    //Primero actualizamos los datos para la bitacora
                    bitacora.cantidad = (-1) * parseFloat(restante)
                    bitacora.almacen = existencias[i].almacen
                    //Retiramos la cantidad del almacen
                    let nCantidad = parseFloat(existencias[i].cantidad) - parseFloat(restante)
                    await modificar_cantidad_almacen(nCantidad, existencias[i].folio).catch(error=>{
                        throw('Ha ocurrido un error al actualizar el almacen: ', error)
                    })
                    unidades_trasladadas += restante
                }
                await registrar_movimiento_inventario_proyecto(bitacora).catch(error=>{
                    throw('Ha ocurrido un error al registrar el movimiento del inventario: ', error)
                })
                restante = parseFloat(diferencia) - parseFloat(unidades_trasladadas)
                i += 1
            }
        }
        
        if(cantidadActual > nuevaCantidad){
            //Primero determinamos la cantidad a devolver
            let cant_2_return = parseFloat(cantidadActual) - parseFloat(nuevaCantidad)
            //Quiere decir que es un decremento
            //Primero definimos a que almacen enviaremos todo
            let does_exists = null
            await seleccionar_registros_inventario(producto).then(resultado=>{
                does_exists = resultado
            }).catch(error=>{
                throw('Error al buscar el producto: ', error)
            })

            if(does_exists.length === 0){
                //Esto quiere decir que no existe en ninguna ubicación del inventario
                let almacen = null
                await seleccionar_primer_almacen().then(resultado=>{
                    almacen = resultado
                }).catch(error=>{
                    throw('Error al obtener el primer almacén: ', error)
                })
                //Añadimos las existencias al primer almacen
                const data = {
                    producto: producto,
                    cantidad: cant_2_return,
                    unidades: unidades,
                    almacen: almacen
                    
                }
                await registrar_producto_en_almacen(data).catch(error=>{
                    throw('Error al agregar el producto al inventario: ', error)
                })
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
                
            }else{
                let almacen = does_exists[0].almacen
                //Modificamos la cantidad en esa ubicacion
                let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cant_2_return)
                await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio).catch(error=>{
                    throw('Error al actualizar la cantidad del producto en el inventario: ', error)
                })
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
            }
            bitacora.cantidad = cant_2_return
            await registrar_movimiento_inventario_proyecto(bitacora).catch(error=>{
                throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
            })
        }

        //Modificamos la cantidad en el proyecto
        await modificar_cantidad_proyecto(nuevaCantidad, registro).catch(error=>{
            throw('Error al actualizar la cantidad del producto en el proyecto: ', error)
        })

        res.redirect(ruta)
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteFromInventario = async(req, res, next)=>{
    try {
        //Calculamos el movimiento
        const registro = req.query.registro
        
        const bitacora = {
            usuario_registra: req.query.usuario,
            producto: req.query.producto,
            cantidad: -1 * req.query.cantidad,
            fecha: new Date(),
            usuario_afectado: req.query.usuario,
            almacen: req.query.almacen
        }
        
        await registrar_en_bitacora_almacen(bitacora).catch(error=>{
            throw('Ha ocurrido un error al registrar el movimiento en el inventario: ', error)
        })

        await eliminar_del_inventario(registro).then(_=>{
            res.redirect(`/inventario/inventario_general`)
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al eliminar el producto del inventario: ', error)
        })         
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteFromInventarioPersonal = async(req, res, next)=>{
    try {
        const registro         = req.query.registro //op011_material_proyecto.folio
        const producto         = req.query.producto //folio_producto
        const cantidad         = req.query.cantidad //cantidad
        const unidades         = req.query.unidades //unidades
        const usuario_registra = req.query.usuario_registra  //usuario
        const usuario_afectado = req.query.usuario_afectado
        const flag             = req.query.flag

        console.log(usuario_afectado)

        let ruta = (flag == 1) ? `/inventario/mi_inventario?usuario=${usuario_afectado}&flag=${flag}` : `/inventario/mi_inventario?usuario=${usuario_afectado}`

        let bitacora = {
            usuario_registra: usuario_registra,
            producto: producto,
            cantidad: cantidad,
            fecha: new Date(), 
            usuario_afectado: usuario_afectado,
            almacen: 0
        }

        //Primero eliminamos el registro
        await eliminar_del_inventario_usuario(registro).catch(error=>{
            throw('Ha ocurrido un error al eliminar el inventario del usuario: ', error)
        })

        //Determinamos a que almacen enviaremos las existencias
        let does_exists = '' 
        await seleccionar_registros_inventario(producto).then(resultado=>{
            does_exists = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los registros del inventario: ', error)
        })

        if(does_exists.length === 0){
            //Esto quiere decir que no existe en ninguna ubicación del inventario
            let almacen = ''
            await seleccionar_primer_almacen().then(resultado=>{
                almacen = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el primer registro de almacen: ', error)
            })
            //Añadimos las existencias al primer almacen
            let data = {
                producto: producto,
                cantidad: cantidad,
                unidades: unidades,
                almacen: almacen
            }
            await registrar_producto_en_almacen(data).catch(error=>{
                throw('Ha ocurrido un error al registrar el producto en el almacen: ', error)
            })
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
            
        }else{
            let almacen = does_exists[0].almacen
            //Modificamos la cantidad en esa ubicacion
            let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cantidad)
            await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio).catch(error=>{
                throw('Ha ocurrido un error al actualizar la cantidad del almacen: ', error)
            })
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
        }
        await registrar_en_bitacora_almacen(bitacora).catch(error=>{
            throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
        })

        res.redirect(ruta)
        return next()  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteFromInventarioProyecto = async(req, res, next)=>{
    try {
        const registro = req.query.registro //op011_material_proyecto.folio
        const producto = req.query.producto //folio_producto
        const cantidad = req.query.cantidad //cantidad
        const proyecto = req.query.proyecto //proyecto
        const unidades = req.query.unidades //unidades
        const usuario  = req.query.usuario  //usuario

        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, proyecto, req.query.flag, req.query.permisos)

        const bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: cantidad,
            fecha: new Date(), 
            proyecto: proyecto,
            almacen: 0
        }

        //Primero eliminamos el registro
        await eliminar_del_inventario_proyecto(registro).catch(error=>{
            throw('Error al eliminar del inventario de proyectos:', error)
        })

        //Determinamos a que almacen enviaremos las existencias
        let does_exists = null
        await seleccionar_registros_inventario(producto).then(resultado=>{
            does_exists= resultado
        }).catch(error=>{
            throw('Error al buscar los materiales del inventario:', error)
        })

        if(does_exists.length === 0){
            //Esto quiere decir que no existe en ninguna ubicación del inventario
            let almacen = null
            await seleccionar_primer_almacen().then(resultado=>{
                almacen = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el primer almacen: ', error)
            })
            //Añadimos las existencias al primer almacen
            const data = {
                producto: producto,
                cantidad: cantidad,
                unidades: unidades,
                almacen: almacen
            }
            await registrar_producto_en_almacen(data).catch(error=>{
                throw ('Error al agregar la existencia al almacén: ', error)
            })
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
            
        }else{
            let almacen = does_exists[0].almacen
            //Modificamos la cantidad en esa ubicacion
            let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cantidad)
            await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio).catch(error=>{
                throw('Error al actualizar la cantidad del almacen: ', error)
            })
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
        }
        await registrar_movimiento_inventario_proyecto(bitacora).catch(error=>{
            throw('Error al guardar el movimiento del inventario: ', error)
        })

        res.redirect(ruta)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
export {
    getInventario,
    getInventarioOn,
    getReporteGeneral,
    getInventarioUsuario,
    getReporteUsuario,
    setInventario,
    setInventarioUsuario,
    setInventarioProyecto,
    updateInventario,
    updateInventarioPersonal,
    updateInventarioProyecto,
    deleteFromInventario,
    deleteFromInventarioPersonal,
    deleteFromInventarioProyecto
}




/* const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process');


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












function modificar_cantidad_usuario(folio, cantidad){
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op013_material_usuario SET cantidad = ? WHERE folio = ?", [cantidad, folio], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}




 */