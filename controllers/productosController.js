const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

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
            let insert = "INSERT INTO cat016_productos SET ?"
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
            conexion.query("SELECT * FROM cat016_productos WHERE folio = ?", [req.params.folio], (error, fila)=>{
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
                    res.redirect('/adminproductos')
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteProduct = async(req, res, next) =>{
        try {
            //Tenemos que hacer varias validaciones para poder eliminar correctamente un producto
            let producto = req.params.folio
            //Primero validamos que no haya existencias en inventario
            conexion.query("SELECT folio FROM cat020_inventario WHERE producto = ?", [producto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    if(fila.length === 0){
                        //Procedemos a la validacion en cotizaciones
                        conexion.query("SELECT folio FROM op008_lista_productos WHERE producto = ?", [producto], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                if(fila2.length === 0){
                                    //ahora validamos la lista de compras
                                    conexion.query("SELECT folio FROM op010_compras WHERE producto = ?", [producto], (error3, fila3)=>{
                                        if(error3){
                                            throw error3
                                        }else{
                                            if(fila3.length === 0){
                                                //Ahora validamos los proyectos
                                                conexion.query("SELECT folio FROM op011_material_proyecto WHERE producto = ?", [producto], (error4, fila4)=>{
                                                    if(error4){
                                                        throw error4
                                                    }else{
                                                        if(fila4.length === 0){
                                                            //Por ultimo validamos el material de usuario
                                                            conexion.query("SELECT folio FROM op013_material_usuario WHERE producto = ?", [producto], (error5, fila5)=>{
                                                                if(error5){
                                                                    throw error5
                                                                }else{
                                                                    if(fila5.length === 0){
                                                                        //Podemos eliminar sin problemas
                                                                        conexion.query("DELETE FROM cat016_productos WHERE folio = ?", [producto], function(error6, filas){
                                                                            if(error6){
                                                                                throw error6
                                                                            }else{
                                                                                res.redirect('/adminproductos')
                                                                                return next()
                                                                            }
                                                                        })
                                                                    }else{
                                                                        showError(res, 'No se ha podido eliminar el producto', 'Parte de las existencias del producto las tiene un usuario, no es posible eliminarlo', 'adminproductos')
                                                                        return next()
                                                                    }
                                                                }
                                                            })
                                                        }else{
                                                            showError(res, 'No se ha podido eliminar el producto', 'Parte de las existencias del producto estan en algun proyecto, no es posible eliminarlo', 'adminproductos')
                                                            return next()
                                                        }
                                                    }
                                                })
                                            }else{
                                                showError(res, 'No se ha podido eliminar el producto', 'Hay una compra pendiente de este producto, no es posible eliminarlo', 'adminproductos')
                                                return next()
                                            }
                                        }
                                    })
                                }else{
                                    showError(res, 'No se ha podido eliminar el producto', 'Este producto se encuentra cotizado para algun proyecto, no es posible eliminarlo', 'adminproductos')
                                    return next()
                                }
                            }
                        })
                    }else{
                        showError(res, 'No se ha podido eliminar el producto', 'Este producto tiene existencias en el inventario, no es posible eliminarlo', 'adminproductos')
                        return next()
                    }
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
                conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_usuario = ? AND (fecha BETWEEN ? AND ?)", [usuario, inicio, termino], (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.movimientos = filas
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM movimientos_invent_view001 WHERE folio_usuario = ?", [usuario], (error, filas)=>{
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