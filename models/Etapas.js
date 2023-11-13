import conexion from "../database/db.js";

const seleccionar_etapas_proyecto = (proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM etapas_view001 WHERE folio_proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_etapa = (etapa=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM etapas_view001 WHERE folio = ?", etapa, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
})
const agregar_etapa = (etapa)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op002_etapas SET ?", etapa, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_etapa = (nombre, area, etapa)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op002_etapas SET nombre = ?, area = ? WHERE folio = ?", [nombre, area, etapa], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve() 
            }
        })
    })
}
const eliminar_etapa = (etapa)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM op002_etapas WHERE folio = ?", [etapa], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}


export {
    seleccionar_etapas_proyecto,
    seleccionar_etapa,
    agregar_etapa,
    editar_etapa,
    eliminar_etapa
}