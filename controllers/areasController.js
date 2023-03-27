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

//CRUD PARA LA GESTION DE AREAS
exports.selectAreas = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM areas_view001 WHERE folio_planta = ?", [req.query.ubicacion], (error, filas)=>{
            if(error){
                throw error;
            }else{
                req.areas = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectArea = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat008_areas WHERE folio = ?", [req.query.area], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.area = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editArea = async(req, res, next) =>{
    try {
        let folio         = req.body.folio
        let nombre        = req.body.nombre
        let documentacion = req.body.documentacion
        let planta        = req.body.planta

        let sql = "UPDATE cat008_areas SET nombre = ?, documentacion = ?, planta = ? WHERE folio = ?"

        let ruta = ''
        if(req.body.flag == 1){ ruta = `/perfilUbicacion?ubicacion=${planta}&cliente=${req.body.cliente}&flag=${req.body.flag}`}
        else if(req.body.flag == 0){ ruta = `/perfilUbicacion?ubicacion=${planta}&flag=${req.body.flag}`}

        conexion.query(sql, [nombre, documentacion, planta, folio], function(error, results){
            if(error){
                throw error
            }else{
                res.redirect(ruta)
                return next() 
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.createArea = async(req, res, next) =>{
    try {
        let data = {
            nombre:        req.body.nombre,
            documentacion: req.body.documentacion,
            planta:        req.body.planta
        }

        let ruta = ''
        if(req.body.flag == 1){ruta = `/perfilUbicacion?ubicacion=${data.planta}&cliente=${req.body.cliente}&flag=${req.body.flag}`}
        else if(req.body.flag == 0){ruta = `/perfilUbicacion?ubicacion=${data.planta}&flag=${req.body.flag}`}

        let insert = "INSERT INTO cat008_areas SET ?"
        conexion.query(insert, data, function(error, results){
            if(error){
                throw error
            }else{
                res.redirect(ruta)
                return next() 
            }
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteArea = async(req, res, next) =>{
    try {
        //Primero validamos que no haya una etapa que la utilice
        conexion.query("SELECT * FROM op002_etapas WHERE area = ?", [req.query.area], (err, fila)=>{
            if(err){
                throw err
            }else{
                let ruta = ''
                if(req.query.flag == 1){ruta = `/perfilUbicacion?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=${req.query.flag}`}
                else if(req.query.flag == 0){ruta = `/perfilUbicacion?ubicacion=${req.query.ubicacion}&flag=${req.query.flag}`}
                
                if(fila.length === 0){
                    conexion.query("DELETE FROM cat008_areas WHERE folio = ?", [req.query.area], function(err2, fila2){
                        if(err2){
                            throw err2
                        }else{
                            res.redirect(ruta)
                            return next()   
                        }
                    })
                }else{
                    showError(res, 'Area involucrada en alguna(s) etapa(s) de algun proyecto', `El area ${req.query.area} esta involucrada en algun proyecto`, ruta.replace('/',''))
                    return next()
                }
            }
        })         
    } catch (error) {
        console.log(error)
        return next()
    }
}
//FIN DEL CRUD DE GESTION DE AREAS