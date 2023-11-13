import { registrar_almacen, seleccionar_almacenes, seleccionar_almacen, editar_nombre_almacen, editar_ubicacion_almacen, validar_existencias_almacen, registrar_en_almacen, actualizar_cantidad_almacen, registrar_en_bitacora_almacen, seleccionar_movimientos_usuario_durante, seleccionar_movimientos_usuario, seleccionar_movimientos_proyecto_durante, seleccionar_movimientos_proyecto, editar_cantidad_almacen, eliminar_del_almacen } from "../models/Almacen.js"



const getAlmacenes = async(req, _, next)=>{
    try {
        await seleccionar_almacenes().then(resultado=>{
            req.almacenes = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la lista de almacenes: ', error)
        })
    } catch (error) {
        throw(error)
        return next()
    }
}
const getAlmacen = async (req, _, next)=>{
    try {
        
        const almacen = req.query.almacen;

        await seleccionar_almacen(almacen).then(resultado=>{
            req.almacen = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtenr los datos del almacen: ', error)
        })


    } catch (error) {
        console.log(error);
        return next();
    }
}
const getMovimientosUsuario = async(req, _, next)=>{
    try {
        const almacen = req.query.almacen

        if(req.query.inicio && req.query.termino){
            await seleccionar_movimientos_usuario_durante(req.query.inicio, req.query.termino, almacen).then(resultado=>{
                req.movimientos_usuario = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los movimientos del almacen por parte de los usuarios: ', error)
            })
        }else{
            await seleccionar_movimientos_usuario(almacen).then(resultado=>{
                req.movimientos_usuario = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la los movmientos del almacen por parte de los usuarios: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getMovimientosProyecto = async(req, _, next)=>{
    try {
        const almacen = req.query.almacen
        if(req.query.inicio && req.query.termino){
            await seleccionar_movimientos_proyecto_durante(req.query.inicio, req.query.termino, almacen).then(resultado=>{
                req.movimientos_proyecto = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un errro al obtener los movimientos: ', error)
            })
        }else{
            await seleccionar_movimientos_proyecto(almacen).then(resultado=>{
                req.movimientos_proyecto = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un errro al obtener los movimientos: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setAlmacen = async (req, res, next)=>{
    try {
        const almacen = {
            nombre: req.body.nombre,
            ubicacion: req.body.ubicacion,
        };
        await registrar_almacen(almacen).then(_=>{
            res.redirect('/almacenes/admin')
            return next();
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar el almacen: ', error)
        })
    } catch (error) {
        console.log(error);
        return next();
    }
};
const updateNombreAlmacen = async (req, res, next)=>{
    try {
        
        const nombre = req.query.nombre
        const folio =  req.query.folio

        await editar_nombre_almacen(nombre, folio).then(_=>{
            res.redirect(`/almacenes/gestionar_almacen?almacen=${folio}`);
            return next();
        }).catch(error=>{
            throw('Ha ocurrido un error al actualizar el nombre del almacen: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateUbicacionAlmacen = async (req, res, next)=>{
    try {
        
        const ubicacion = req.query.ubicacion
        const folio =  req.query.folio

        await editar_ubicacion_almacen(ubicacion, folio).then(_=>{
            res.redirect(`/almacenes/gestionar_almacen?almacen=${folio}`);
            return next();
        }).catch(error=>{
            throw('Ha ocurrdio un error al actualizar la ubicación del almacen: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateCantidadAlmacen = async(req, res, next)=>{
    try {
        //Calculamos el movimiento
        const registro = req.query.registro
        const actual = req.query.cantidadActual
        const nueva = req.query.nuevaCantidad

        //Recibimos los datos
        const movimiento = {
            usuario_registra: req.query.usuario,
            producto: req.query.producto,
            cantidad: nueva - actual,
            fecha: new Date(),
            usuario_afectado: req.query.usuario,
            almacen: req.query.almacen
        }
        if(actual != nueva){
            //Primero registramos el movimiento
            await registrar_en_bitacora_almacen(movimiento).catch(error=>{
                throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
            })
            await editar_cantidad_almacen(nueva, registro).catch(error=>{
                throw('Ha ocurrido un error al editar la cantidad en el almacen: ', error)
            })
        }

        res.redirect(`/almacenes/gestionar_almacen?almacen=${movimiento.almacen}`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const moverInventario = async(req, res, next) =>{
    try {
        const data = {
            producto: req.body.producto,
            cantidad: req.body.cantidad,
            unidades: req.body.unidades,
            almacen: req.body.almacen
        }

        let isExists = false

        await validar_existencias_almacen(data.producto, data.almacen).then(resultado=>{
            isExists = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las existencias en el almacen: ', error)
        })


        if(!isExists){
            await registrar_en_almacen(data).catch(error=>{
                throw('Ha ocurrido un error al registrar en el almacen: ', error)
            })
        }else{
            data.cantidad += isExists;
            await actualizar_cantidad_almacen(data).catch(error=>{
                throw('Ha ocurrido un error al actualizar las existencias: ', error)
            })
        }

        //Ahora registramos el movimiento
        let valores = {
            usuario_registra: req.body.usuario,
            producto: data.producto,
            cantidad: data.cantidad,
            fecha: new Date(),
            usuario_afectado: req.body.usuario,
            almacen: data.almacen
        }

        await registrar_en_bitacora_almacen(valores).then(_=>{
            res.redirect(`/almacenes/gestionar_almacen?almacen=${data.almacen}`);
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar el movimiento en la bitacora: ', error)
        })   
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteDeAlmacen = async (req, res, next)=>{
    try {
        const registro = req.query.registro

        const movimiento = {
            usuario_registra: req.query.usuario,
            producto: req.query.producto,
            cantidad: -1 * req.query.cantidad,
            fecha: new Date(),
            usuario_afectado: req.query.usuario,
            almacen: req.query.almacen
        }

        await registrar_en_bitacora_almacen(movimiento).catch(error=>{
            throw('Ha ocurrido un error al registrar el movmiento en la bitacora: ', error)
        })
        await eliminar_del_almacen(registro).catch(error=>{
            throw('Ha ocurrido un error al eliminar el registro del almacen: ', error)
        })

        res.redirect(`/almacenes/gestionar_almacen?almacen=${movimiento.almacen}`);
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}


export {
    getAlmacenes,
    getAlmacen,
    getMovimientosUsuario,
    getMovimientosProyecto,
    setAlmacen,
    updateNombreAlmacen,
    updateUbicacionAlmacen,
    updateCantidadAlmacen,
    moverInventario,
    deleteDeAlmacen
}
