import conexion from '../database/db.js'


const generar_reporte_general_filtrado = (inicio, termino)=>{
    return new Promise((resolve, reject) => {
        conexion.query("SELECT * FROM reporte_asistencia_view001 WHERE (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [inicio, termino], (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const generar_reporte_general = ()=>{
    return new Promise((resolve, reject) => {
        conexion.query("SELECT * FROM reporte_asistencia_view001 ORDER BY folio DESC", (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const generar_reporte_asisctencia_usuario = (usuario)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM reporte_asistencia_view001 WHERE folio_usuario = ?", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const registrar_asistencia = (data)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO op006_asistencia SET ?', data, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
export {
    generar_reporte_general_filtrado,
    generar_reporte_general,
    generar_reporte_asisctencia_usuario,
    registrar_asistencia
}