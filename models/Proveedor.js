import conexion from '../database/db.js'

const seleccionar_proveedores = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM cat014_proveedores", (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })

    })
}
const seleccionar_proveedor = (proveedor)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query("SELECT * FROM cat014_proveedores WHERE folio = ?", proveedor, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_marcas_proveedor = (proveedor)=>{
    return  new Promise ((resolve ,reject ) => {
        conexion.query("SELECT * FROM marca_proveedor_view001 WHERE folio_proveedor = ?", proveedor, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_productos_proveedor = (proveedor)=>{
    return   new Promise ((resolve ,reject )=>{
        conexion.query("SELECT * FROM productos_proveedor_view001 WHERE folio_proveedor = ?", proveedor, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const registrar_proveedor = (proveedor)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO cat014_proveedores SET ?", proveedor, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_relacion_marca_proveedor = (registro)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("INSERT INTO op007_marca_proveedor SET ?", registro, (error,_)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_proveedor = (folio, nombre, web)=>{
    return 	new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat014_proveedores SET nombre = ?, web = ? WHERE folio = ?", [nombre, web, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const validar_relacion_marca_proveedor = (marca, proveedor)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op007_marca_proveedor WHERE proveedor = ? AND marca = ?", [proveedor, marca], (error, fila)=>{
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

export{
    seleccionar_proveedores,
    seleccionar_proveedor,
    seleccionar_marcas_proveedor,
    seleccionar_productos_proveedor,
    registrar_proveedor,
    registrar_relacion_marca_proveedor,
    editar_proveedor,
    validar_relacion_marca_proveedor
}