import conexion from '../database/db.js'

const seleccionar_tareas_etapa = (etapa)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM tareas_view001 WHERE folio_etapa = ?", etapa, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_tipos_tarea = ()=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM cat010_tipo_tareas", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_tarea = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM tareas_view002 WHERE folio = ?", tarea, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_asignacion_tarea = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM tarea_asignada_view001 WHERE folio_tarea = ?", [tarea], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_asignaciones_usuario = (usuario)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM asignacion_usuario_view001 WHERE folio_usuario = ? ORDER BY folio_asignacion DESC", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_asignaciones_usuario_tablero = (usuario)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM asignacion_usuario_view001 WHERE folio_usuario = ? ORDER BY folio_asignacion DESC LIMIT 10", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_ultima_tarea = ()=>{
    return new Promise ((resolve,reject)=> {
        conexion.query("SELECT folio FROM op003_tareas ORDER BY folio DESC LIMIT 1", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].folio)
            }
        })
    })
}
const seleccionar_asignador_tarea = (tarea)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT * FROM cat001_usuarios WHERE folio IN (SELECT administrador FROM op023_acciones_tarea WHERE tarea = ? AND accion = 0)", tarea, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0])
            }
        })
    })
}
const seleccionar_encargado_tarea = (tarea)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT * FROM cat001_usuarios WHERE folio IN (SELECT encargado FROM op023_acciones_tarea WHERE tarea = ? AND accion = 0)", tarea, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0])
            }
        })
    })
}
const seleccionar_reporte_tarea = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op004_reporte WHERE tarea = ?", tarea, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0])
            }
        })
    })
}
const validar_asignacion = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op014_tarea_usuario WHERE tarea = ?", tarea, (error, fila)=>{
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
const validar_tareas_usuario = (usuario, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM validar_tarea_view001 WHERE usuario = ? AND proyecto = ?", [usuario, proyecto], (error, fila)=>{
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
const validar_reportes_tarea = (tarea, usuario)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op004_reporte WHERE tarea = ? AND usuario = ?", [tarea, usuario], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(fila)
                }
            }
        })
    })
}
const crear_tarea = (tarea)=>{
    return  new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op003_tareas SET ?", tarea, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_tarea = (descripcion, fecha_entrega, tipo, folio) => {
    return new Promise((resolve, reject)=> {
        conexion.query("UPDATE op003_tareas SET descripcion = ?, fecha_entrega = ?, tipo = ? WHERE folio = ?", [descripcion, fecha_entrega, tipo, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const asignar_tarea = (asignacion)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("INSERT INTO op014_tarea_usuario SET ?", asignacion, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const actualizar_estatus_tarea = (estatus, tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op003_tareas SET estatus = ? WHERE folio = ?", [estatus, tarea], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const actualizar_reporte_tarea = (enlace, fecha, hora, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op004_reporte SET enlace = ?, fecha = ?, hora = ? WHERE folio = ?", [enlace, fecha, hora, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const obtener_detalles_tarea = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM tarea_asignada_view001 WHERE folio_tarea = ?", tarea, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0])
            }
        })
    })
}
const eliminar_asignacion = (asignacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM op014_tarea_usuario WHERE folio = ?", [asignacion], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const asignar_estatus_tarea = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op003_tareas SET estatus = 7 WHERE folio = ?", [tarea], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const actualizar_asignacion = (usuario, asignacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op014_tarea_usuario SET usuario = ? WHERE folio = ?", [usuario, asignacion], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const eliminar_tarea = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM op003_tareas WHERE folio = ?", [tarea], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const entregar_tarea = (tarea)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('UPDATE op003_tareas SET estatus = 2 WHERE folio = ?', tarea, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_reporte_tarea = (data)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO op004_reporte SET ?', data, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_accion_tarea = (bitacora)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op022_historial_tareas SET ?", bitacora, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_suceso_tarea = (bitacora)=>{
    return new Promise((resolve, reject)=>{    
        conexion.query("INSERT INTO op023_acciones_tarea SET ?", bitacora, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
export {
    seleccionar_tareas_etapa,
    seleccionar_tipos_tarea,
    seleccionar_tarea,
    seleccionar_asignacion_tarea,
    seleccionar_asignaciones_usuario,
    seleccionar_asignaciones_usuario_tablero,
    seleccionar_ultima_tarea,
    seleccionar_asignador_tarea,
    seleccionar_reporte_tarea,
    seleccionar_encargado_tarea,
    validar_asignacion,
    validar_tareas_usuario,
    validar_reportes_tarea,
    crear_tarea,
    editar_tarea,
    asignar_tarea,
    actualizar_estatus_tarea,
    actualizar_reporte_tarea,
    obtener_detalles_tarea,
    eliminar_asignacion,
    eliminar_tarea,
    asignar_estatus_tarea,
    actualizar_asignacion,
    entregar_tarea,
    registrar_reporte_tarea,
    registrar_accion_tarea,
    registrar_suceso_tarea
}