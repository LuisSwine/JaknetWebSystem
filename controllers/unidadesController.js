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

//CRUD PARA LA GESTION DE MEDICIONES
exports.selectUnits = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat023_unidades", (error, filas)=>{
            if(error){
                throw error;
            }else{
                req.unidades = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectUnit = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat023_unidades WHERE folio = ?", [req.params.folio], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.unidad = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.createUnit = async(req, res, next) =>{
    try {
        let data = {
            nombre: req.body.nombre,
            abreviatura: req.body.abreviatura,
            codigo_sat: req.body.codigo_sat
        }
        let insert = "INSERT INTO cat023_unidades SET ?"
        conexion.query(insert, data, function(error, results){
            if(error){
                throw error
            }else{
                res.redirect('/adminunidades')
                return next()    
            }
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editUnit = async(req, res, next) =>{
    try {
        let folio       = req.body.folio
        let nombre      = req.body.nombre
        let abreviatura = req.body.abreviatura
        let codigo_sat  = req.body.codigo_sat

        let sql = "UPDATE cat023_unidades SET nombre = ?, abreviatura = ?, codigo_sat = ? WHERE folio = ?"

        conexion.query(sql, [nombre, abreviatura, codigo_sat, folio], function(error, results){
            if(error){
                throw error
            }else{
                res.redirect('/adminunidades')
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteUnit = async(req, res, next) =>{
    try {
        //Primero verificamos que la unidad no este siendo utilizada en algun producto
        let folio = req.params.folio
        conexion.query("SELECT folio FROM cat020_inventario WHERE unidades = ?", [folio], (e, f)=>{
            if(e){
                throw e
            }else{
                if(f.length === 0){
                    conexion.query("SELECT folio FROM op010_compras WHERE unidades = ?", [folio], (e2, f2)=>{
                        if(e2){
                            throw e2
                        }else{
                            if(f2.length === 0){
                                conexion.query("SELECT folio FROM op011_material_proyecto WHERE unidades = ?", [folio], (e3, f3)=>{
                                    if(e3){
                                        throw e3
                                    }else{
                                        if(f3.length === 0){ 
                                            conexion.query("SELECT folio FROM op013_material_usuario WHERE unidades = ?", [folio], (e4, f4)=>{
                                                if(e4){
                                                    throw e4
                                                }else{
                                                    if(f4.length === 0){ 
                                                        conexion.query("DELETE FROM cat023_unidades WHERE folio = ?", [folio], function(error, filas){
                                                            if(error){
                                                                throw error
                                                            }else{ 
                                                                res.redirect('/adminunidades')
                                                                return next() 
                                                            }
                                                        })    
                                                    }else{
                                                        showError(res, 'No se ha podido eliminar la unidad', `La unidad ${folio} esta siendo utilizada`, 'adminunidades')
                                                        return next()
                                                    }
                                                }
                                            })
                                        }else{
                                            showError(res, 'No se ha podido eliminar la unidad', `La unidad ${folio} esta siendo utilizada`, 'adminunidades')
                                            return next()
                                        }
                                    }
                                })
                            }else{
                                showError(res, 'No se ha podido eliminar la unidad', `La unidad ${folio} esta siendo utilizada`, 'adminunidades')
                                return next()
                            }
                        }
                    })
                }else{
                    showError(res, 'No se ha podido eliminar la unidad', `La unidad ${folio} esta siendo utilizada`, 'adminunidades')
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
//FIN DEL CRUD DE MEDICIONES