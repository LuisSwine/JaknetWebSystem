const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process');
const { resolve } = require('path');
const { rejects } = require('assert');

function registrar_almacen(almacen){
    return new Promise((resolve, reject)=>{
        const insert = "INSERT INTO cat027_almacenes SET ?";
        conexion.query(insert, almacen, (error, result)=>{
            if(error){
                throw error;
            }else{
                resolve(); 
            }
        })
    });
}

function validar_existencias(producto, almacen){
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT * FROM cat020_inventario WHERE producto = ? AND almacen = ?', [producto, almacen], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(fila[0].cantidad)
                }
            }
        })
    })
}

function add_2_storage(data){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat020_inventario SET ?', data, (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}

function update_cant(data){
    return new Promise((resolve, reject)=>{
        conexion.query('UPDATE cat020_inventario SET cantidad = ? WHERE producto = ? AND almacen = ?', [data.cantidad, data.producto, data.almacen], (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}

function update_cant_by_folio(cantidad, folio){
    return new Promise((resolve, reject)=>{
        conexion.query('UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?', [cantidad, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}

function add_2_bitacora(data){
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op016_movimientos_inventario SET ?", data, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        }) 
    })
}

function delete_from_storage(folio){
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM cat020_inventario WHERE folio = ?', folio, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}

exports.getStorages = async (req, res, next)=>{
    try{
        conexion.query("SELECT * FROM cat027_almacenes", (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.almacenes = fila
                return next()
            }
        })
    }catch(e){
        console.log(e);
        return next()
    }
};

exports.addStorage = async (req, res, next)=>{
    try {
        let storage = {
            nombre: req.body.nombre,
            ubicacion: req.body.ubicacion,
        };
        await registrar_almacen(storage);
        res.redirect('/almacenes/admin')
        return next();

    } catch (error) {
        console.log(error);
        return next();
    }
};

exports.getAlmacenById = async (req, res, next)=>{
    try {
        
        let folio = req.query.almacen;

        conexion.query('SELECT * FROM cat027_almacenes WHERE folio = ?', folio, (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.almacen = fila[0];
                return next()
            }
        })


    } catch (error) {
        console.log(error);
        return next();
    }
};

exports.changeName = async (req, res, next)=>{
    try {
        
        let nombre = req.query.nombre
        let folio =  req.query.folio

        conexion.query('UPDATE cat027_almacenes SET nombre = ? WHERE folio = ?', [nombre, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/almacenes/gestionar_almacen?almacen=${folio}`);
                return next();
            }
        })

    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.changeUbicacion = async (req, res, next)=>{
    try {
        
        let ubicacion = req.query.ubicacion
        let folio =  req.query.folio

        conexion.query('UPDATE cat027_almacenes SET ubicacion = ? WHERE folio = ?', [ubicacion, folio], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(`/almacenes/gestionar_almacen?almacen=${folio}`);
                return next();
            }
        })

    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.moverInventario = async(req, res, next) =>{
    try {
        let data = {
            producto: req.body.producto,
            cantidad: req.body.cantidad,
            unidades: req.body.unidades,
            almacen: req.body.almacen
        }

        let isExists = await validar_existencias(data.producto, data.almacen);

        if(!isExists){
            await add_2_storage(data);
        }else{
            data.cantidad += isExists;
            update_cant(data)
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
        await add_2_bitacora(valores);
        res.redirect(`/almacenes/gestionar_almacen?almacen=${data.almacen}`);
        return next()
             
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.deleteFrom = async (req, res, next)=>{
    try {
        
        let registro = req.query.registro

        let movimiento = {
            usuario_registra: req.query.usuario,
            producto: req.query.producto,
            cantidad: -1 * req.query.cantidad,
            fecha: new Date(),
            usuario_afectado: req.query.usuario,
            almacen: req.query.almacen
        }

        await add_2_bitacora(movimiento);
        await delete_from_storage(registro);

        res.redirect(`/almacenes/gestionar_almacen?almacen=${movimiento.almacen}`);
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.editFrom = async(req, res, next)=>{
    try {
        //Calculamos el movimiento
        let registro = req.query.registro
        let actual = req.query.cantidadActual
        let nueva = req.query.nuevaCantidad
        //Recibimos los datos
        let movimiento = {
            usuario_registra: req.query.usuario,
            producto: req.query.producto,
            cantidad: nueva - actual,
            fecha: new Date(),
            usuario_afectado: req.query.usuario,
            almacen: req.query.almacen
        }
        if(actual != nueva){
            //Primero registramos el movimiento
            await add_2_bitacora(movimiento);
            //Hacemos el update en el inventario
            await update_cant_by_folio(nueva, registro)
        }

        res.redirect(`/almacenes/gestionar_almacen?almacen=${movimiento.almacen}`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.getMovimientosUsuario = async(req, res, next)=>{
    try {
        const almacen = req.query.almacen
        if(req.query.inicio && req.query.termino){
            conexion.query("SELECT * FROM movimientos_invent_view001 WHERE (fecha BETWEEN ? AND ?) AND folio_almacen = ? ORDER BY fecha DESC", [req.query.inicio, req.query.termino, almacen], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.movimientos_usuario = fila
                    return next()
                }
            })
        }else{
            conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_almacen = ?", almacen, (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.movimientos_usuario = fila
                    return next()
                }
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.getMovimientosProyecto = async(req, res, next)=>{
    try {
        const almacen = req.query.almacen
        if(req.query.inicio && req.query.termino){
            conexion.query("SELECT * FROM movs_invent_proys_view001 WHERE (fecha BETWEEN ? AND ?) AND folio_almacen = ? ORDER BY fecha DESC", [req.query.inicio, req.query.termino, almacen], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.movimientos_proyecto = fila
                    return next()
                }
            })
        }else{
            conexion.query("SELECT * FROM movs_invent_proys_view001 WHERE folio_almacen = ?", almacen, (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.movimientos_proyecto = fila
                    return next()
                }
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}