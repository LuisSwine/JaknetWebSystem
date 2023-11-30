import conexion from '../database/db.js'

const seleccionar_clientes = ()=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM clientes_view001", (error, filas)=>{
            if(error){
                reject('Error')
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_cliente = (cliente)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM clientes_view001 WHERE folio = ?", cliente, (error, fila)=>{
            if(error){
                reject('Error')
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_servicios = ()=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM cat005_tipo_servicio", (error, filas)=>{
            if(error){
                reject('Error')
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_tipos_cliente = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM cat012_tipo_cliente", (error, filas)=>{
            if(error){
                reject(error);
            }else{
                resolve(filas)
            }
        })
    })
}
const crear_cliente = (cliente)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("INSERT INTO cat003_clientes SET ?", cliente, (error, _)=>{
            if(error){
                reject('Error')
            }else{
                resolve()
            }
        })
    })
}
const actualizar_tipo = (tipo, cliente)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat003_clientes SET tipo_cliente = ? WHERE folio = ?", [tipo, cliente], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const actualizar_servicio = (servicio, cliente)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat003_clientes SET tipo_servicio = ? WHERE folio = ?", [servicio, cliente], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const actualizar_nombre = (nombre, cliente)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat003_clientes SET nombre = ? WHERE folio = ?", [nombre, cliente], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const validar_contactos_cliente = (cliente)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM cat006_contactos WHERE cliente = ?", cliente, (error, fila)=>{
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
const validar_ubicaciones_cliente = (cliente)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM cat007_ubicaciones WHERE cliente = ?", cliente, (error, fila)=>{
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
const eliminar_cliente = (cliente)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM cat003_clientes WHERE folio = ?", cliente, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}


export {
    seleccionar_clientes,
    seleccionar_cliente,
    seleccionar_servicios,
    seleccionar_tipos_cliente,
    crear_cliente,
    actualizar_tipo,
    actualizar_servicio,
    actualizar_nombre,
    validar_contactos_cliente,
    validar_ubicaciones_cliente,
    eliminar_cliente
}