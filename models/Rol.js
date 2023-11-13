import conexion from '../database/db.js'

const seleccionar_usuarios_asignados = (proyecto)=>{
    return new Promise((resolve,reject) => {
        conexion.query("SELECT * FROM roles_view001 WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_roles = ()=>{
    return new Promise ((resolve , reject)=> {
        conexion.query('SELECT * FROM cat011_roles_proyecto', (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const asignar_rol_en_proyecto = (registro) =>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op005_roles SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const validar_rol_usuario = (usuario, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op005_roles WHERE proyecto = ? AND usuario = ?", [proyecto, usuario], (error, fila)=>{
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
const verificar_participacion = (usuario, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM roles_view001 WHERE proyecto = ? AND folio_usuario = ?", [proyecto, usuario], (error, fila)=>{
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
const eliminar_rol = (rol)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM op005_roles WHERE folio = ?", [rol], (error, _)=>{
            if(error){
                reject(error)
            }else{ 
                resolve()
            }
        }) 
    })
}

export {
    seleccionar_usuarios_asignados,
    seleccionar_roles,
    asignar_rol_en_proyecto,
    validar_rol_usuario,
    verificar_participacion,
    eliminar_rol
}
