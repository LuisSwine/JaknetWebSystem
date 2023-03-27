const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

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
        let ruta = `/perfilProveedor?proveedor=${data.proveedor}` 
        //Primero validamos que no exista previamente la relacion
        conexion.query("SELECT * FROM op007_marca_proveedor WHERE proveedor = ? AND marca = ?", [data.proveedor, data.marca], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //No hay relacion asi que registramos
                    conexion.query("INSERT INTO op007_marca_proveedor SET ?", data, (error2, fila2)=>{if(error2) throw error2;})
                }
                res.redirect(ruta)
                return next()
            }
        })
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
                let ruta = `/perfilProveedor?proveedor=${proveedor}`
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
                res.redirect('/adminproveedores')
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
                res.redirect('/adminproveedores')
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
        let proveedor = req.params.folio

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
                            res.redirect('/adminproveedores')
                            return next()
                        }
                    })
                }else{
                    showError(res, 'No se puede eliminar al proveedor', 'Este proveedor provee algunas marcas que se encuentran registradas, edite esta información antes de eliminar al proveedor', 'adminproveedores')
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