import conexion from '../database/db.js'

const seleccionar_inventario = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM inventario_view001", (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_inventario_en_almacen = (almacen)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT * FROM inventario_view001 WHERE folio_almacen = ?', almacen, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_inventario_usuario = (usuario)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM material_usuario_view001 WHERE folio_usuario = ?", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_producto_usuario = (usuario, producto)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM op013_material_usuario WHERE usuario = ? AND producto = ?", [usuario, producto], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_registros_inventario = (producto)=>{
    return new Promise ((resolve,reject) => {
        conexion.query('SELECT * FROM cat020_inventario WHERE producto = ?', producto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_primer_almacen = ()=>{
    return new Promise ((resolve,reject)=> {
        conexion.query('SELECT folio FROM cat027_almacenes ORDER BY folio ASC LIMIT 1', (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].folio)
            }
        })
    })
}
const obtener_existencias_inventario = (producto)=>{
    return new Promise ((resolve,reject ) =>{
        conexion.query('SELECT SUM(cantidad) as suma FROM cat020_inventario WHERE producto = ?', producto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].suma)
            }
        })
    })
}
const validar_existencia_inventario = (producto, almacen)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT * FROM cat020_inventario WHERE producto = ? AND almacen = ?', [producto, almacen], (error, registro)=>{
            if(error){
                reject(error)
            }else{
                if(registro.length === 0){
                    resolve(false)
                }else{
                    resolve(registro[0])
                }
            }
        })
    })
}
const validar_posesion_inventario_usuario = (usuario, producto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio, cantidad FROM op013_material_usuario WHERE usuario = ? AND producto = ?", [usuario, producto], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
const validar_cantidad_proyecto =  (producto, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio, cantidad FROM op011_material_proyecto WHERE proyecto = ? AND producto = ?", [proyecto, producto], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true);
                }else{
                    resolve(fila)
                }
            }
        });    
    })
}
const registrar_producto_en_almacen = (data)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat020_inventario SET ?', data, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_producto_en_usuario = (registro)=>{
    return new Promise ((resolve, reject)=>{
        conexion.query("INSERT INTO op013_material_usuario SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_movimiento_inventario_proyecto = (bitacora)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO op018_movs_invent_proy SET ?', bitacora, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve();
            }
        })
    })
}
const registrar_producto_proyecto = (registrar)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op011_material_proyecto SET ?", registrar, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const modificar_cantidad_almacen = (cantidad, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [cantidad, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const modificar_cantidad_usuario = (cantidad, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op013_material_usuario SET cantidad = ? WHERE folio = ?", [cantidad, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const modificar_cantidad_proyecto = (cantidad, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op011_material_proyecto SET cantidad = ? WHERE folio = ?", [cantidad, folio], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve();
            }
        })
    })
}
const eliminar_del_inventario = (registro)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM cat020_inventario WHERE folio = ?', registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const eliminar_del_inventario_usuario = (registro)=>{
    return new Promise((resolve,reject)=>{
        conexion.query('DELETE FROM op013_material_usuario WHERE folio = ?', registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const eliminar_del_inventario_proyecto = (registro)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM op011_material_proyecto WHERE folio = ?', registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const reporte_general_inventario_definido = (inicio, fin)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM movimientos_invent_view001 WHERE (fecha BETWEEN ? AND ?)", [inicio, fin], (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const reporte_general_inventario = ()=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM movimientos_invent_view001", (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const reporte_usuario_inventario_definido = (inicio, fin, usuario)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_usuario_afectado = ? AND (fecha BETWEEN ? AND ?)", [usuario, inicio, fin], (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const reporte_usuario_inventario = (usuario)=>{
    return new Promise ((resolve,reject ) =>{
        conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_usuario_afectado = ?", [usuario], (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const vaciar_almacen = (folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM cat020_inventario WHERE folio = ?', folio, (error, _)=>{
            if(error){
                reject(error);
            }else{
                resolve();
            }
        })
    })
}
export {
    seleccionar_inventario,
    seleccionar_inventario_en_almacen,
    seleccionar_inventario_usuario,
    seleccionar_producto_usuario,
    seleccionar_registros_inventario,
    seleccionar_primer_almacen,
    obtener_existencias_inventario,
    validar_existencia_inventario,
    validar_cantidad_proyecto,
    validar_posesion_inventario_usuario,
    registrar_producto_en_almacen,
    registrar_producto_en_usuario,
    registrar_movimiento_inventario_proyecto,
    registrar_producto_proyecto,
    modificar_cantidad_almacen,
    modificar_cantidad_usuario,
    modificar_cantidad_proyecto,
    eliminar_del_inventario,
    eliminar_del_inventario_usuario,
    eliminar_del_inventario_proyecto,
    reporte_general_inventario_definido,
    reporte_general_inventario,
    reporte_usuario_inventario_definido,
    reporte_usuario_inventario,
    vaciar_almacen
}