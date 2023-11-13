import conexion from '../database/db.js'

const seleccionar_marcas = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM cat015_marcas", (error, fila) => {
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }   
        })
    })
}
const seleccionar_marca_por_nombre = (marca)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query('SELECT folio FROM cat015_marcas WHERE nombre = ?', marca, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].folio)
            }
        })
    })
}
const registrar_marca = (marca)=>{
    return new Promise ((resolve ,reject ) =>{
        const registro = {
            nombre: marca
        }
        conexion.query("INSERT INTO cat015_marcas SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}

export{
    seleccionar_marcas,
    seleccionar_marca_por_nombre,
    registrar_marca
}