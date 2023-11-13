import conexion from '../database/db.js'

const seleccionar_almacenes = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM cat027_almacenes", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_almacen = (almacen)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT * FROM cat027_almacenes WHERE folio = ?', almacen, (error, fila)=>{
            if(error){
                reject(error);
            }else{
                resolve(fila[0])
            }
        })
    })
}
const seleccionar_movimientos_usuario_durante = (inicio, termino, almacen)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM movimientos_invent_view001 WHERE (fecha BETWEEN ? AND ?) AND folio_almacen = ? ORDER BY fecha DESC", [inicio, termino, almacen], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_movimientos_usuario = (almacen)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_almacen = ?", almacen, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_movimientos_proyecto_durante = (inicio, termino, almacen)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM movs_invent_proys_view001 WHERE (fecha BETWEEN ? AND ?) AND folio_almacen = ? ORDER BY fecha DESC", [inicio, termino, almacen], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_movimientos_proyecto = (almacen)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM movs_invent_proys_view001 WHERE folio_almacen = ?", almacen, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const registrar_almacen = (almacen)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO cat027_almacenes SET ?", almacen, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve() 
            }
        })
    });
}
const editar_nombre_almacen = (nombre, folio)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query('UPDATE cat027_almacenes SET nombre = ? WHERE folio = ?', [nombre, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_ubicacion_almacen = (ubicacion, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('UPDATE cat027_almacenes SET ubicacion = ? WHERE folio = ?', [ubicacion, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_cantidad_almacen = (cantidad, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?', [cantidad, folio], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const validar_existencias_almacen = (producto, almacen)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT * FROM cat020_inventario WHERE producto = ? AND almacen = ?', [producto, almacen], (error, fila)=>{
            if(error){
                reject(error)
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
const registrar_en_almacen = (registro)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat020_inventario SET ?', registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve();
            }
        })
    })
}
const actualizar_cantidad_almacen = (data)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('UPDATE cat020_inventario SET cantidad = ? WHERE producto = ? AND almacen = ?', [data.cantidad, data.producto, data.almacen], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_en_bitacora_almacen = (data)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op016_movimientos_inventario SET ?", data, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        }) 
    })
}
const eliminar_del_almacen = (folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM cat020_inventario WHERE folio = ?', folio, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}


export {
    seleccionar_almacenes,
    seleccionar_almacen,
    seleccionar_movimientos_usuario_durante,
    seleccionar_movimientos_usuario,
    seleccionar_movimientos_proyecto_durante,
    seleccionar_movimientos_proyecto,
    registrar_almacen,
    editar_nombre_almacen,
    editar_ubicacion_almacen,
    editar_cantidad_almacen,
    validar_existencias_almacen,
    registrar_en_almacen,
    actualizar_cantidad_almacen,
    registrar_en_bitacora_almacen,
    eliminar_del_almacen
}