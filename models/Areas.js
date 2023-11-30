import conexion from '../database/db.js'

const seleccionar_areas = (ubicacion) =>{
    return new Promise((resolve, reject) => {
        conexion.query("SELECT * FROM areas_view001 WHERE folio_planta = ?", ubicacion, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_area = (area)=>{
    return new Promise ((resolve ,reject )=>{
        conexion.query("SELECT * FROM cat008_areas WHERE folio = ?", area, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const crear_area = (area)=>{
    return new Promise ((resolve ,reject)=>{
        conexion.query("INSERT INTO cat008_areas SET ?", area, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_area = (nombre, documentacion, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat008_areas SET nombre = ?, documentacion = ? WHERE folio = ?", [nombre, documentacion, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve() 
            }
        })
    })
}
const validar_area_etapas = (area)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op002_etapas WHERE area = ?", area, (error, fila)=>{
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
const eliminar_area = (area)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM cat008_areas WHERE folio = ?", area, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
export {
    seleccionar_areas,
    seleccionar_area,
    crear_area,
    editar_area,
    validar_area_etapas,
    eliminar_area
}