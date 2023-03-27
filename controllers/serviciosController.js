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

//CRUD DE SERVICIOS
exports.selectServicios = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM servicios_view001", (error, filas)=>{
            if(error){
                throw error;
            }else{
                req.servicios = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectServicio = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM cat019_servicios WHERE folio = ?", [req.params.folio], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.servicio = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.createServicio = async(req, res, next)=>{
    try {
        let data = {
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            precio: req.body.precio
        }
        let insert = "INSERT INTO cat019_servicios SET ?"
        conexion.query(insert, data, function(error, results){
            if(error){
                throw error
            }else{
                res.redirect('/adminservicios')
                return next()    
            }
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editServicio = async(req, res, next)=>{
    try {
        let folio       = req.body.folio
        let descripcion = req.body.descripcion
        let categoria   = req.body.categoria
        let precio      = req.body.precio

        let sql = "UPDATE cat019_servicios SET descripcion = ?, categoria = ?, precio = ? WHERE folio = ?"

        conexion.query(sql, [descripcion, categoria, precio, folio], function(error, results){
            if(error){
                throw error
            }else{
                res.redirect('/adminservicios')
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteServicio = async(req, res, next)=>{
    try {
        let servicio = req.params.folio
        //Antes de eliminar validamos que el servicio no este cotizado
        conexion.query("SELECT folio FROM op009_lista_servicios WHERE servicio = ?", [servicio], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    conexion.query("DELETE FROM cat019_servicios WHERE folio = ?", [servicio], function(error2, filas){
                        if(error2){
                            throw error2
                        }else{
                            res.redirect('/adminservicios')
                            return next()
                        }
                    })
                }else{
                    showError(res, 'No se puede eliminar este servicio', 'Este servicio cotiza en algun proyecto, no puede eliminarse', 'adminservicios')
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
//FIN DEL CRUD DE SERVICIOS