const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')
const { resolve } = require('path')

//procedimiento para registrarnos
function formatoFecha(fecha, formato) {
    const map = {
        ss: fecha.getSeconds(),
        nn: fecha.getMinutes(),
        hh: fecha.getHours(),
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
    }

    return formato.replace(/ss|nn|hh|dd|mm|yy|yyy/gi, matched => map[matched])
}
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
function crear_relacion_marca_proveedor(data){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM op007_marca_proveedor WHERE proveedor = ? AND marca = ?", [data.proveedor, data.marca], (error, fila)=>{
            if(error){
                throw error;
            }else{
                if(fila.length === 0){
                    //No hay relacion asi que registramos
                    conexion.query("INSERT INTO op007_marca_proveedor SET ?", data, (error2, fila2)=>{if(error2) throw error2;})
                }
                resolve();
            }
        })
    })
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

//Registrar producto
exports.createProductProveedor = async(req, res, next) =>{
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

        let proveedor = req.body.proveedor;

        if (data.marca == 'other'){
            let folio = await registrar_marca(req.body.nueva_marca);
            data.marca = folio;
        }

        if (data.tipo == 'other'){
            let folio = await registrar_tipo(req.body.nuevo_tipo);
            data.tipo = folio;
        }

        if (data.categoria == 'other'){
            let folio = await registrar_categoria(req.body.nueva_categoria);
            data.categoria = folio;
        }

        let relacion = {
            marca: data.marca,
            proveedor: proveedor
        }

        await crear_relacion_marca_proveedor(relacion);
        await registrar_producto(data);
        let ruta = `/proveedores/perfil?proveedor=${proveedor}` 
        res.redirect(ruta)
        return next()
           
    } catch (error) {
        console.log(error)
        return next()
    }
}

//CRUD PARA LA GESTION DE PROVEEDORES
exports.selectProvs = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat014_proveedores", (error, filas)=>{
            if(error){
                throw error;
            }else{
                req.proveedores = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectProveedor = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat014_proveedores WHERE folio = ?", [req.query.proveedor], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.proveedor = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectMarcasProveedor = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM marca_proveedor_view001 WHERE folio_proveedor = ?", [req.query.proveedor], (error, filas)=>{
            if(error){
                throw error
            }else{
                req.marcas = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectProductosProveedor = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM productos_proveedor_view001 WHERE folio_proveedor = ?", [req.query.proveedor], (error, fila)=>{
            if(error){throw error}
            else{
                req.productos = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.relateMarcaProveedor = async(req, res, next)=>{
    try {
        let data = {
            marca: req.body.marca,
            proveedor: req.body.proveedor
        }

        if(data.marca == 'other'){
            let folio = await registrar_marca(req.body.nueva_marca);
            data.marca = folio;
        }

        let ruta = `/proveedores/perfil?proveedor=${data.proveedor}` 
        
        await crear_relacion_marca_proveedor(data);
        res.redirect(ruta)
        return next()
        
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.deleteMarcaProveedor = async(req, res, next)=>{
    try {
        let registro = req.query.registro
        let proveedor = req.query.proveedor

        conexion.query("DELETE FROM op007_marca_proveedor WHERE folio = ?", [registro], (error, fila)=>{
            if(error){throw error;}
            else{
                let ruta = `/proveedores/perfil?proveedor=${proveedor}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editProv = async(req, res, next) =>{
    try {
        let folio  = req.body.folio
        let nombre = req.body.nombre
        let web    = req.body.web

        let sql = "UPDATE cat014_proveedores SET nombre = ?, web = ? WHERE folio = ?"

        conexion.query(sql, [nombre, web, folio], function(error, results){
            if(error){
                throw error
            }else{
                res.redirect('/proveedores/administrar')
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.createProv = async(req, res, next) =>{
    try {
        let data = {
            nombre: req.body.nombre,
            web:    req.body.web
        }
        let insert = "INSERT INTO cat014_proveedores SET ?"
        conexion.query(insert, data, function(error, results){
            if(error){
                throw error
            }else{
                res.redirect('/proveedores/administrar')
                return next()    
            }
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteProv = async(req, res, next) =>{
    try {
        //para realizar un delete seguro es necesario verificar primero que no tenga marcas relacionadas
        let proveedor = req.query.folio

        conexion.query("SELECT folio FROM op007_marca_proveedor WHERE proveedor = ?", [proveedor], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //Podemos eliminar de manera segura
                    conexion.query("DELETE FROM cat014_proveedores WHERE folio = ?", [proveedor], function(error2, filas){
                        if(error2){
                            throw error2
                        }else{
                            res.redirect('/proveedores/administrar')
                            return next()
                        }
                    })
                }else{
                    showError(res, 'No se puede eliminar al proveedor', 'Este proveedor provee algunas marcas que se encuentran registradas, edite esta información antes de eliminar al proveedor', 'proveedores/administrar')
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
//FIN DEL CRUD DE PROVEEDORES