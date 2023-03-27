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

//CRUD PARA LA GESTION DE MARCAS
exports.selectBrands = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat015_marcas", (error, filas)=>{
            if(error){
                throw error;
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
exports.selectBrand = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat015_marcas WHERE folio = ?", [req.query.marca], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.marca = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectProveedoresMarca = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM marca_proveedor_view001 WHERE folio_marca = ?", [req.query.marca], (error, filas)=>{
            if(error){
                throw error
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
exports.selectProductosMarca = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM productos_view001 WHERE folio_marca = ?", [req.query.marca], (error, fila)=>{
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
exports.relateProveedorMarca = async(req, res, next)=>{
    try {
        let data = {
            marca: req.body.marca,
            proveedor: req.body.proveedor
        }
        let ruta = `/perfilMarca?marca=${data.marca}` 
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
exports.deleteProveedorMarca = async(req, res, next)=>{
    try {
        let registro = req.query.registro
        let marca = req.query.marca

        conexion.query("DELETE FROM op007_marca_proveedor WHERE folio = ?", [registro], (error, fila)=>{
            if(error){throw error;}
            else{
                let ruta = `/perfilMarca?marca=${marca}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editNombreMarca = async(req, res, next)=>{
    try {
        let marca = req.query.marca
        let nombre = req.query.nombre

        conexion.query("UPDATE cat015_marcas SET nombre = ? WHERE folio = ?", [nombre, marca], (error, fila)=>{
            if(error){throw error}
            else{
                let ruta = `/perfilMarca?marca=${marca}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.createBrand = async(req, res, next) =>{
    try {
        let data = {
            nombre: req.body.nombre
        }
        let insert = "INSERT INTO cat015_marcas SET ?"
        conexion.query(insert, data, function(error, results){
            if(error){
                throw error
            }else{
                res.redirect('/adminmarcas')
                return next()    
            }
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteBrand = async(req, res, next) =>{
    try {
        let marca = req.params.folio
        //Para eliminar las marcas de manera segura es necesario verificar proveedores y productos
        conexion.query("SELECT folio FROM cat016_productos WHERE marca = ?", [marca], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //Verificamos ahora los proveedores
                    conexion.query("SELECT folio FROM op007_marca_proveedor WHERE marca = ?", [marca], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            if(fila2.length === 0){
                                //Podemos eliminar de manera segura
                                conexion.query("DELETE FROM cat015_marcas WHERE folio = ?", [marca], function(error3, filas){
                                    if(error3){
                                        throw error3
                                    }else{
                                        res.redirect('/adminmarcas')
                                        return next()
                                    }
                                })
                            }else{
                                showError(res, 'No se puede eliminar esta marca', 'Hay registrados proveedores de esta marca y eliminarla causaría errores en el sistema, primero elimine los proveedores desde el perfil de marca', 'adminmarcas')
                                return next()
                            }
                        }
                    })
                }else{
                    showError(res, 'No se puede eliminar esta marca', 'Hay registrados productos de esta marca y eliminarla causaría errores en el sistema, primero elimine los productos', 'adminmarcas')
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
//FIN DEL CRUD PARA LAS MARCAS