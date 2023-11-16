import { registrar_marca, seleccionar_marca_por_nombre } from "../models/Marca.js";
import { registrar_categoria, registrar_producto, registrar_tipo, seleccionar_categoria_por_nombre, seleccionar_categorias_productos, seleccionar_productos, seleccionar_tipo_por_nombre, seleccionar_tipos_productos, seleccionar_producto, editar_producto } from "../models/Producto.js";
import { registrar_relacion_marca_proveedor, validar_relacion_marca_proveedor } from "../models/Proveedor.js";

const selectCategoriasProductos = async(req, _, next) =>{
    try {
        await seleccionar_categorias_productos().then(resultado=>{
            req.categorias = resultado;
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las categorias: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectTipoProducto = async(req, _, next) =>{
    try {
        await seleccionar_tipos_productos().then(resultado=>{
            req.tipos = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los tipos de producto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setProductoProveedor = async(req, res, next) =>{
    try {
        const registro = {
            sku: req.body.sku,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            tipo: req.body.tipo,
            marca: req.body.marca,
            precio: req.body.precio,
            enlace: req.body.enlace
        }

        const proveedor = req.body.proveedor;
        const ruta = `/proveedores/perfil?proveedor=${proveedor}` 

        if (registro.marca == 'other'){
            const n_marca = req.body.nueva_marca
            await registrar_marca(n_marca).catch(error=>{
                throw('Ha ocurrido un error al registrar la marca: ', error)
            })
            await seleccionar_marca_por_nombre(n_marca).then(resultado => {
                registro.marca = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la marca: ', error)
            })
        }

        if (registro.tipo == 'other'){
            const n_tipo = req.body.nuevo_tipo
            await registrar_tipo(n_tipo).catch(error=>{
                throw('Ha ocurrido un error al registrar el nuevo tipo: ', error)
            })
            await seleccionar_tipo_por_nombre(n_tipo).then(resultado => {
                registro.tipo = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el tipo: ', error)
            })
        }

        if (registro.categoria == 'other'){
            const n_categoria = req.body.nueva_categoria
            await registrar_categoria(n_categoria).catch(error=>{
                throw('Ha ocurrido un error al registrar la categoria: ', error)
            })
            await seleccionar_categoria_por_nombre(n_categoria).then(resultado => {
                registro.categoria = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la categoria: ', error)
            })
        }

        const relacion = {
            marca: registro.marca,
            proveedor: proveedor
        }

        let does_match_exist = false
        await validar_relacion_marca_proveedor(relacion.marca, relacion.proveedor).then(resultado=>{
            does_match_exist = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar la relación entre la marca y el proveedor: ', error)
        })
        if(!does_match_exist){
            await registrar_relacion_marca_proveedor(relacion).catch(error=>{
                throw('Error al registrar la relación entre la marca y el proveedor: ', error)
            })
        }
        
        await registrar_producto(registro).then(_=>{
            res.redirect(ruta)
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar el nuevo producto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectProductos = async(req, _, next) =>{
    try {
        await seleccionar_productos().then(resultado=>{
            req.productos = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los productos: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectProducto = async(req, _, next) =>{
    try {
        await seleccionar_producto(req.query.producto).then(resultado=>{
            req.producto = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el productoi: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createProducto = async(req, res, next) =>{
    try {
        const producto = {
            sku: req.body.sku,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            tipo: req.body.tipo,
            marca: req.body.marca,
            precio: req.body.precio,
            enlace: req.body.enlace
        }

        if (producto.marca == 'other'){
            const n_marca = req.body.nueva_marca
            await registrar_marca(n_marca).catch(error=>{
                throw('Ha ocurrido un error al registar la marca: ', error)
            })
            await seleccionar_marca_por_nombre(n_marca).then(resultado=>{
                producto.marca = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la marca registrada: ', error)
            })
            const relacion = {
                marca: producto.marca,
                proveedor: req.body.proveedor
            }
            await registrar_relacion_marca_proveedor(relacion).catch(error=>{
                throw('Ha ocurrido un error al registrar la relación entre la marca y el proveedor: ', error)
            })
        }

        if (producto.tipo == 'other'){
            const n_tipo = req.body.nuevo_tipo
            await registrar_tipo(n_tipo).catch(error=>{
                throw('Ha ocurrido un error al registar el nuevo tipo de producto: ', error)
            })
            await seleccionar_tipo_por_nombre(n_tipo).then(resultado=>{
                producto.tipo = resultado;
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el tipo del producto registrado: ', error);
            })
        }

        if (producto.categoria == 'other'){
            const n_categoria = req.body.nueva_categoria
            await registrar_categoria(n_categoria).catch(error=>{
                throw ('Ha ocurrido un error al registrar una nueva categoría', error)
            })
            await seleccionar_categoria_por_nombre(n_categoria).then(resultado=>{
                producto.categoria = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la categoria registrada: ', error)
            })
        }

        await registrar_producto(producto).then(_=>{
            res.redirect('/productos/administrar')
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar el producto: ', error)
        })   
    } catch (error) {
        console.log(error)
        return next()
    }
}
const editProducto = async(req, res, next) =>{
    try {
        const folio       = req.body.folio
        const descripcion = req.body.descripcion
        const categoria   = req.body.categoria
        const tipo        = req.body.tipo
        const marca       = req.body.marca
        const precio      = req.body.precio
        const enlace      = req.body.enlace

        await editar_producto(descripcion, categoria, tipo, marca, precio, enlace, folio).then(_=>{
            res.redirect('/productos/administrar')
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al editar el producto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
export {
    selectCategoriasProductos,
    selectTipoProducto,
    setProductoProveedor,
    selectProductos,
    selectProducto,
    createProducto,
    editProducto
}


/* const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')
const { rejects } = require('assert')
const { resolve } = require('path')

function showError(res, titulo, mensaje, ruta){
    res.render('Error/showInfo', {
        title: titulo,
        alert: true,
        alertTitle: 'INFORMACION',
        alertMessage: mensaje,
        alertIcon: 'info',
        showConfirmButton: true,
        timer: 8000,
        ruta: ruta
    })
}

function registrar_marca(marca){
    return new Promise((resolve, reject)=>{
        let brand = {
            nombre: marca
        };
        const insert = "INSERT INTO cat015_marcas SET ?";
        conexion.query(insert, brand, (error, result)=>{
            if(error){
                throw error;
            }else{
                conexion.query('SELECT folio FROM cat015_marcas WHERE nombre = ?', marca, (error2, results2)=>{
                    if(error2){
                        throw error2;
                    }else{
                        let folio = results2[0].folio;
                        resolve(folio)
                    }
                }) 
            }
        })
    });
}
function registrar_tipo(tipo){
    return new Promise((resolve, reject)=>{
        let type = {
            nombre: tipo
        };
        const insert = "INSERT INTO cat018_tipo_producto SET ?";
        conexion.query(insert, type, (error, result)=>{
            if(error){
                throw error;
            }else{
                conexion.query('SELECT folio FROM cat018_tipo_producto WHERE nombre = ?', tipo, (error2, results2)=>{
                    if(error2){
                        throw error2;
                    }else{
                        let folio = results2[0].folio;
                        resolve(folio)
                    }
                }) 
            }
        })
    });
}
function registrar_categoria(categoria){
    return new Promise((resolve, reject)=>{
        let category = {
            nombre: categoria
        };
        const insert = "INSERT INTO cat017_categoria_producto SET ?";
        conexion.query(insert, category, (error, result)=>{
            if(error){
                throw error;
            }else{
                conexion.query('SELECT folio FROM cat017_categoria_producto WHERE nombre = ?', categoria, (error2, results2)=>{
                    if(error2){
                        throw error2;
                    }else{
                        let folio = results2[0].folio;
                        resolve(folio)
                    }
                }) 
            }
        })
    });
}
function registrar_producto(producto){
    return new Promise((resolve, reject)=>{
        let insert = "INSERT INTO cat016_productos SET ?"
        conexion.query(insert, producto, function(error3, results3){
            if(error3){
                throw error3
            }else{
                resolve()   
            }
        })
    });
}
function crear_relacion_marca_proveedor(marca, proveedor){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op007_marca_proveedor WHERE proveedor = ? AND marca = ?", [proveedor, marca], (error, fila)=>{
            if(error){
                throw error;
            }else{
                if(fila.length === 0){
                    let data = {
                        marca: marca,
                        proveedor: proveedor
                    };
                    //No hay relacion asi que registramos
                    conexion.query("INSERT INTO op007_marca_proveedor SET ?", data, (error2, fila2)=>{if(error2) throw error2;})
                }
                resolve();
            }
        })
    })
}
function producto_en_inventario(producto){
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT folio FROM cat020_inventario WHERE producto = ?", [producto], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //No hay existencia en el inventario y se puede proceder
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function producto_en_proyecto(producto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op011_material_proyecto WHERE producto = ?", [producto], (error, fila)=>{
            if(error){
                throw error
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
function producto_con_usuario(producto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op013_material_usuario WHERE producto = ?", [producto], (error, fila)=>{
            if(error){
                throw error
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


exports.deleteProduct = async(req, res, next) =>{
    try {
        let producto = req.query.producto
        
        //Primero verificamos si hay existencias en el inventario
        let its_in_invent = producto_en_inventario(producto)
        if(its_in_invent){
            showError(res, 'No se ha podido eliminar el producto', 'Este producto tiene existencias en el inventario, no es posible eliminarlo, primero elimine sus existencias del inventario', 'productos/administrar')
            return next()
        } 

        //Ahora validamos su presencia en algun proyecto
        let its_in_project = producto_en_proyecto(producto)
        if(its_in_project){
            showError(res, 'No se ha podido eliminar el producto', 'Parte de las existencias del producto estan en algun proyecto, primero elimine el producto del proyecto', 'productos/administrar')
            return next()
        }

        //Ahora validamos el inventario de los usuarios
        let its_w_user = producto_con_usuario(producto)
        if(its_w_user){
            showError(res, 'No se ha podido eliminar el producto', 'Parte de las existencias del producto las tiene un usuario, primero elimine el producto del inventario de los usuarios', 'productos/administrar')
            return next()
        }

        //Ahora sí, podemos eliminar el producto
        conexion.query("DELETE FROM cat016_productos WHERE folio = ?", [producto], function(error, fila){
            if(error){
                throw error
            }else{
                res.redirect('/productos/administrar')
                return next()
            }
        })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//CRUD DE PRODUCTOS
    //Registrar un tipo de producto
    exports.createTipoProducto = async(req, res, next) =>{
        try {
            let data = {
                nombre: req.params.nombre
            }
            let insert = "INSERT INTO cat018_tipo_producto SET ?"
            conexion.query(insert, data, function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect('/adminproductos')
                    return next()    
                }
            })    
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    
    //Registrar una categoria de producto
    exports.createCategoriaProducto = async(req, res, next) =>{
        try {
            let data = {
                nombre: req.params.nombre
            }
            let insert = "INSERT INTO cat017_categoria_producto SET ?"
            conexion.query(insert, data, function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect('/adminproductos')
                    return next()    
                }
            })    
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    
    //Registrar producto
    
    
    
    
//FIN DEL CRUD DE PRODUCTOS

//INVENTARIO PERSONAL
    
    

*/