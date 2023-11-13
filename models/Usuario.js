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

export {
    seleccionar_usuarios,
    seleccionar_usuario,
    crear_usuario,
    cambiar_nombre,
    cambiar_telefono,
    cambiar_email,
    get_password,
    cambiar_contra
}


