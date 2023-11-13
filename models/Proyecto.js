import conexion from "../database/db.js";

const seleccionar_proyectos = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM proyectos_view001", (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_proyectos_ubicacion = (ubicacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM proyectos_view001 WHERE folio_ubicacion = ?", ubicacion, (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_proyectos_cliente = (cliente)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM proyectos_view001 WHERE folio_cliente = ?", cliente, (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_proyecto = (proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM proyectos_view001 WHERE folio = ?", proyecto, (error, fila)=>{
            if(error){
                reject(error);
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_roles_proyecto = (proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM roles_view001 WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_ubicacion_proyecto = (proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT ubicacion FROM cat009_proyectos WHERE folio = ?", proyecto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_mis_proyectos = (usuario)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT * FROM roles_proyecto_view001 WHERE folio_usuario = ?", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const crear_proyecto = (proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO cat009_proyectos SET ?", proyecto, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_nombre_proyecto = (nombre, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat009_proyectos SET nombre = ? WHERE folio = ?", [nombre, proyecto], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_documentacion_proyecto = (documentacion, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat009_proyectos SET documentacion = ? WHERE folio = ?", [documentacion, proyecto], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_galeria_proyecto = (galeria, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat009_proyectos SET galeria = ? WHERE folio = ?", [galeria, proyecto], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
export {
    seleccionar_proyectos,
    seleccionar_proyectos_ubicacion,
    seleccionar_proyectos_cliente, 
    seleccionar_proyecto,
    seleccionar_roles_proyecto,
    seleccionar_ubicacion_proyecto,
    seleccionar_mis_proyectos,
    crear_proyecto,
    cambiar_nombre_proyecto,
    cambiar_documentacion_proyecto,
    cambiar_galeria_proyecto
}