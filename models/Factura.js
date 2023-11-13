import conexion from "../database/db.js";

const seleccionar_facturas_proyecto = (proyecto)=>{
    return new Promise((resolve,reject) => {
        conexion.query('SELECT * FROM facturas_view001 WHERE folio_proyecto = ?', proyecto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}

export {
    seleccionar_facturas_proyecto
}