import conexion from '../database/db.js'

const seleccionar_usuarios = ()=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM cat001_usuarios", (error, filas)=>{
            if(error){
                reject(error);
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_usuario = (usuario)=>{
    return new Promise ((resolve , reject ) => {
        conexion.query("SELECT * FROM cat001_usuarios WHERE folio = ?", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_usuario_by_user = (usuario)=>{
    return new Promise ((resolve , reject ) => {
        conexion.query("SELECT * FROM cat001_usuarios WHERE usuario = ?", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const crear_usuario = (usuario)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("INSERT INTO cat001_usuarios SET ?", usuario, (error, _)=>{
            if(error){
                reject(error);
            }else{
                resolve()
            }
        })
    })
}
const registrar_inicio_sesion = (registro)=>{
    return new Promise((resolve,reject)=> {
        conexion.query("INSERT INTO op001_registro_login SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_cierre_sesion = (registro)=>{
    return new Promise((resolve,reject)=> {
        conexion.query("INSERT INTO op021_registro_logout SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_nombre = (folio, nombre, apellido)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("UPDATE cat001_usuarios SET nombres = ?, apellidos = ? WHERE folio = ?", [nombre, apellido, folio], (error, _)=>{
            if(error){
                reject(error);
            }else{
                resolve()
            }
        })
    })
}
const cambiar_telefono = (folio, telefono)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("UPDATE cat001_usuarios SET telefono = ? WHERE folio = ?", [telefono, folio], (error, _)=>{
            if(error){
                reject(error);
            }else{
                resolve()
            }
        })
    })
}
const cambiar_email = (folio, email)=>{
    return new Promise((resolve,reject)=>{
        conexion.query("UPDATE cat001_usuarios SET email = ? WHERE folio = ?", [email, folio], (error, _)=>{
            if(error){
                reject(error);
            }else{
                resolve()
            }
        })
    })
}
const get_password = (folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT pass FROM cat001_usuarios WHERE folio = ?", folio, async(error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].pass)
            }
        })
    })
}
const eliminar_usuario = (folio) => {
    return new Promise ((resolve, reject)=> {
        conexion.query('DELETE FROM cat001_usuarios WHERE folio = ?', folio, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_contra = (folio, contra)=>{
    return new Promise ((resolve , reject)=>{
        conexion.query("UPDATE cat001_usuarios SET pass = ? WHERE folio = ?", [contra, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const cambiar_saldo = (folio, saldo)=>{
    return new Promise ((resolve , reject)=>{
        conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [saldo, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_usuario = (nombres, apellidos, telefono, email, documentacion, folio) =>{
    return new Promise ((resolve, reject)=>{
        conexion.query("UPDATE cat001_usuarios SET nombres = ?, apellidos = ?, telefono = ?, email = ?, documentacion = ? WHERE folio = ?", [nombres, apellidos, telefono, email, documentacion, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const checkViaticos = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM cat021_claves_seguimiento WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const checkOperaciones = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM cat022_operaciones WHERE id_bene = ? OR emisor = ?', [usuario, usuario], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const checkReportes = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM op004_reporte WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const checkRoles = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM op005_roles WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const checkAsistencias = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM op006_asistencia WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const checkMaterial = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM op013_material_usuario WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const checkTareas = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM op014_tarea_usuario WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const checkMovimientos = (usuario) => {
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM op016_movimientos_inventario WHERE usuario_registra = ?', usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
const bloquearUsuario = (folio_usuario) => {
    return new Promise((resolve,reject)=> {
        conexion.query('UPDATE cat001_usuarios SET estatus = 1 WHERE folio = ?', folio_usuario, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const desbloquearUsuario = (folio_usuario) => {
    return new Promise((resolve,reject)=> {
        conexion.query('UPDATE cat001_usuarios SET estatus = 0 WHERE folio = ?', folio_usuario, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
export {
    seleccionar_usuarios,
    seleccionar_usuario,
    seleccionar_usuario_by_user,
    crear_usuario,
    registrar_inicio_sesion,
    registrar_cierre_sesion,
    cambiar_nombre,
    cambiar_telefono,
    cambiar_email,
    get_password,
    eliminar_usuario,
    cambiar_contra,
    cambiar_saldo,
    editar_usuario,
    checkAsistencias,
    checkMaterial,
    checkMovimientos,
    checkOperaciones,
    checkReportes,
    checkRoles,
    checkTareas,
    checkViaticos,
    bloquearUsuario,
    desbloquearUsuario
}


