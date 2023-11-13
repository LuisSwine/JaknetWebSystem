import conexion from '../database/db.js'

const seleccionar_contactos_cliente = (cliente)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM contactos_view001 WHERE folio_cliente = ?", cliente, (error, filas)=>{
            if(error){
                reject('Error')
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_contactos_ubicaciones = (ubicacion)=>{
    return new Promise ((resolve ,reject )=>{
        conexion.query("SELECT * FROM contactos_ubicacion_view001 WHERE folio_ubicacion = ?", ubicacion, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_contacto = (contacto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM cat006_contactos WHERE folio = ?", contacto,  (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const crear_contacto = (contacto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO cat006_contactos SET ?", contacto, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_contacto = (nombre, email, telefono, descripcion, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat006_contactos SET nombre = ?, email = ?, telefono = ?, descripcion = ? WHERE folio = ?", [nombre, email, telefono, descripcion, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const verificar_contacto_ubicacion = (ubicacion, contacto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op015_contacto_ubicacion WHERE ubicacion = ? AND contacto = ?", [ubicacion, contacto], (error, fila)=>{
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
const asignar_contacto_a_ubicacion = (registro)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("INSERT INTO op015_contacto_ubicacion SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const eliminar_relacion_contacto_ubicacion = (relacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM op015_contacto_ubicacion WHERE folio = ?", relacion, (error,_)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}

export {
    seleccionar_contactos_cliente,
    seleccionar_contactos_ubicaciones,
    seleccionar_contacto,
    crear_contacto,
    editar_contacto,
    verificar_contacto_ubicacion,
    asignar_contacto_a_ubicacion,
    eliminar_relacion_contacto_ubicacion
}