import conexion from '../database/db.js'

const seleccionar_unidades = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM cat023_unidades", (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const seleccionar_unidad = (unidad)=>{
    return new Promise ((resolve ,reject ) => {
        conexion.query("SELECT * FROM cat023_unidades WHERE folio = ?", unidad, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const crear_unidad = (unidad) =>{
    return new Promise ((resolve ,reject)=> {
        conexion.query("INSERT INTO cat023_unidades SET ?", unidad, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()  
            }
        }) 
    })
}
const editar_unidad = (nombre, abreviatura, codigo_sat, folio)=>{
    return new Promise ((resolve ,reject)=> {
        conexion.query("UPDATE cat023_unidades SET nombre = ?, abreviatura = ?, codigo_sat = ? WHERE folio = ?", [nombre, abreviatura, codigo_sat, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const eliminar_unidad = (unidad)=>{
    return new Promise ((resolve ,reject)=> {
        conexion.query("DELETE FROM cat023_unidades WHERE folio = ?", unidad, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}

const validar_unidades_inventario = (unidad)=>{
    return new Promise ((resolve ,reject)=> {
        conexion.query('SELECT folio FROM cat020_inventario WHERE unidades = ?', unidad, (error, filas)=>{
            if(error){
                reject(error)
            }else{
                if(filas.length === 0){
                    resolve(false)
                }else{
                    resolve(true)   
                }
            }
        })
    })
}
const validar_unidades_compra = (unidad)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op010_compras WHERE unidades = ?", unidad, (error, filas)=>{
            if(error){
                reject(error)
            }else{
                if(filas.length === 0){
                    resolve(false)
                }else{
                    resolve(true)   
                }
            }
        })
    })
}
const validar_unidades_proyecto = (unidad)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op011_material_proyecto WHERE unidades = ?", unidad, (error, filas)=>{
            if(error){
                reject(error)
            }else{
                if(filas.length === 0){
                    resolve(false)
                }else{
                    resolve(true)   
                }
            }
        })
    })
}
const validar_unidades_usuario = (unidad)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op013_material_usuario WHERE unidades = ?", unidad, (error, filas)=>{
            if(error){
                reject(error)
            }else{
                if(filas.length === 0){
                    resolve(false)
                }else{
                    resolve(true)   
                }
            }
        })
    })
}

export {
    seleccionar_unidades,
    seleccionar_unidad,
    crear_unidad,
    editar_unidad,
    eliminar_unidad,
    validar_unidades_inventario,
    validar_unidades_compra,
    validar_unidades_proyecto,
    validar_unidades_usuario
}