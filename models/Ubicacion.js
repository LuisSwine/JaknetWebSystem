import conexion from '../database/db.js'


const seleccionar_ubicaciones = ()=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM ubicaciones_view001", (error, filas)=>{
            if(error){
                reject('Error')
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_ubicacion = (ubicacion)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM ubicaciones_view001 WHERE folio = ?", ubicacion, (error, fila)=>{
            if(error){
                reject(error)
            }else{{
                resolve(fila)
            }}
        })
    })
}
const seleccionar_ubicaciones_cliente = (cliente)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM ubicaciones_view001 WHERE folio_cliente = ?", cliente, (error, filas)=>{
            if(error){
                reject('Error')
            }else{
                resolve(filas)
            }
        })
    })
}
const crear_ubicacion = (cliente)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("INSERT INTO cat007_ubicaciones SET ?", cliente, (error,_)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_nombre_ubicacion = (nombre, ubicacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat007_ubicaciones SET nombre = ? WHERE folio = ?", [nombre, ubicacion], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_direccion_ubicacion = (direccion, ubicacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat007_ubicaciones SET direccion = ? WHERE folio = ?", [direccion, ubicacion], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const validar_areas_ubicacion = (ubicacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM cat008_areas WHERE planta = ?', ubicacion, (error, fila)=>{
            if(error){
                reject(error);
            }else{
                if(fila.length === 0){
                    resolve(false);
                }else{
                    resolve(true);
                }
            }
        });
    })
}
const validar_proyectos_ubicacion = (ubicacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM cat009_proyectos WHERE ubicacion = ?", ubicacion, (error, fila)=>{
            if(error){
                reject(error);
            }else{
                if(fila.length === 0){
                    resolve(false);
                }else{
                    resolve(true);
                }
            }
        });
    })
}
const validar_contactos_ubicacion = (ubicacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op015_contacto_ubicacion WHERE ubicacion = ?", ubicacion, (error, fila)=>{
            if(error){
                reject(error);
            }else{
                if(fila.length === 0){
                    resolve(false);
                }else{
                    resolve(true);
                }
            }
        });
    })
}
const eliminar_ubicacion = (ubicacion)=>{
    return new Promise((resolve,reject) => {
        conexion.query("DELETE FROM cat007_ubicaciones WHERE folio = ?", ubicacion, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
export {
    seleccionar_ubicaciones,
    seleccionar_ubicacion,
    seleccionar_ubicaciones_cliente,
    crear_ubicacion,
    cambiar_nombre_ubicacion,
    cambiar_direccion_ubicacion,
    validar_areas_ubicacion,
    validar_contactos_ubicacion,
    validar_proyectos_ubicacion,
    eliminar_ubicacion
}