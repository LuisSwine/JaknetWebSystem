import conexion from '../database/db.js'

const seleccionar_categorias_productos = ()=>{
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM cat017_categoria_producto", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_tipos_productos = ()=>{
    return new Promise ((resolve , reject ) =>{
        conexion.query("SELECT * FROM cat018_tipo_producto", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_tipo_por_nombre = (tipo)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query('SELECT folio FROM cat018_tipo_producto WHERE nombre = ?', tipo, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].folio)
            }
        })
    })
}
const seleccionar_categoria_por_nombre = (categoria)=>{
    return new Promise ((resolve ,reject ) =>{
        conexion.query('SELECT folio FROM cat017_categoria_producto WHERE nombre = ?', categoria, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].folio)
            }
        })
    })
}
const seleccionar_productos = ()=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM productos_view001", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const seleccionar_producto = (producto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM cat016_productos WHERE folio = ?", producto, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const registrar_tipo = (tipo)=>{
    return new Promise ((resolve ,reject ) =>{
        const registro = {
            nombre: tipo
        }
        conexion.query("INSERT INTO cat018_tipo_producto SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_categoria = (categoria)=>{
    return new Promise ((resolve ,reject ) =>{
        const registro = {
            nombre: categoria
        }
        conexion.query("INSERT INTO cat017_categoria_producto SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const registrar_producto = (registro)=>{
    return new Promise((resolve, reject)=> {
        conexion.query("INSERT INTO cat016_productos SET ?", registro, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const editar_producto = (descripcion, categoria, tipo, marca, precio, enlace, folio)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat016_productos SET descripcion = ?, categoria = ?, tipo = ?, marca = ?, precio = ?, enlace = ? WHERE folio = ?", [descripcion, categoria, tipo, marca, precio, enlace, folio], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
export {
    seleccionar_categorias_productos,
    seleccionar_tipos_productos,
    seleccionar_tipo_por_nombre,
    seleccionar_categoria_por_nombre,
    seleccionar_productos,
    seleccionar_producto,
    registrar_tipo,
    registrar_categoria,
    registrar_producto,
    editar_producto
}