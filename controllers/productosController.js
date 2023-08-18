const conexion = require('../database/db')
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
    exports.selectTipoProducto = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM cat018_tipo_producto", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.tipos = filas
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
    exports.selectCategoriasProduct = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM cat017_categoria_producto", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.categorias = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Registrar producto
    exports.createProduct = async(req, res, next) =>{
        try {
            let data = {
                sku: req.body.sku,
                descripcion: req.body.descripcion,
                categoria: req.body.categoria,
                tipo: req.body.tipo,
                marca: req.body.marca,
                precio: req.body.precio,
                enlace: req.body.enlace
            }

            if (data.marca == 'other'){
                let folio = await registrar_marca(req.body.nueva_marca);
                data.marca = folio;
                let proveedor = req.body.proveedor
                await crear_relacion_marca_proveedor(folio, proveedor);
                
            }

            if (data.tipo == 'other'){
                let folio = await registrar_tipo(req.body.nuevo_tipo);
                data.tipo = folio;
            }

            if (data.categoria == 'other'){
                let folio = await registrar_categoria(req.body.nueva_categoria);
                data.categoria = folio;
            }

            await registrar_producto(data); 
            res.redirect('/productos/administrar')
            return next()
               
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectProducts = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM productos_view001", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.productos = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectProduct = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM cat016_productos WHERE folio = ?", [req.query.producto], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.producto = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.editProduct = async(req, res, next) =>{
        try {
            let folio       = req.body.folio
            let descripcion = req.body.descripcion
            let categoria   = req.body.categoria
            let tipo        = req.body.tipo
            let marca       = req.body.marca
            let precio      = req.body.precio
            let enlace      = req.body.enlace

            let sql = "UPDATE cat016_productos SET descripcion = ?, categoria = ?, tipo = ?, marca = ?, precio = ?, enlace = ? WHERE folio = ?"

            conexion.query(sql, [descripcion, categoria, tipo, marca, precio, enlace, folio], function(error, results){
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
//FIN DEL CRUD DE PRODUCTOS

//INVENTARIO PERSONAL
    exports.selectInventarioUser = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM material_usuario_view001 WHERE folio_usuario = ?", [req.query.usuario], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.productos = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.reportePersonalInvent = async(req, res, next)=>{
        try {
            let usuario = req.query.usuario
            if(req.query.inicio && req.query.termino){
                let inicio = new Date(req.query.inicio)
                let termino = new Date(req.query.termino)
                conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_usuario_afectado = ? AND (fecha BETWEEN ? AND ?)", [usuario, inicio, termino], (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.movimientos = filas
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_usuario_afectado = ?", [usuario], (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.movimientos = filas
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }

//INVENTARIO POR PROYECTO
    exports.selectInventProyecto = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM material_proyecto_view001 WHERE folio_proyecto = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.inventario = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }