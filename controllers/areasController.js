
import { seleccionar_areas, seleccionar_area, crear_area, editar_area } from "../models/Areas.js";
import { seleccionar_ubicacion_proyecto } from "../models/Proyecto.js";

const getAreas = async(req, _, next) =>{
    try {
        await seleccionar_areas(req.query.ubicacion).then(resultado =>{
            req.areas = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener las areas de la ubicacion: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getAreasProyecto = async(req, _, next)=>{
    try {
        const proyecto = req.query.proyecto
        let ubicacion = ''
        await seleccionar_ubicacion_proyecto(proyecto).then(resultado=>{
            ubicacion = resultado[0].ubicacion
        })
        .catch(error=>{
            throw('Ha ocurrido un error determinando la ubicacion del proyecto: ', error)
        })

        await seleccionar_areas(ubicacion).then(resultado=>{
            req.areas = resultado
            return next()
        })
        .catch(error=>{
            throw('Ocurrió un error al obtener las areas de la ubicacion del proyecto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getArea = async(req, res, next) =>{
    try {
        const area = req.query.area
        await seleccionar_area(area).then(resultado =>{
            req.area = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener el area especificada: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createArea = async(req, res, next) =>{
    try {
        let area = {
            nombre:        req.body.nombre,
            documentacion: req.body.documentacion,
            planta:        req.body.planta
        }

        let ruta = `/ubicaciones/perfil?ubicacion=${area.planta}&cliente=${req.body.cliente}`

        await crear_area(area).then(_=>{
            res.redirect(ruta)
            return next()
        })
        .catch(error=>{
            throw('Error al registrar la nueva la area: ', error)
        })  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const editArea = async(req, res, next) =>{
    try {
        const folio         = req.body.folio
        const nombre        = req.body.nombre
        const documentacion = req.body.documentacion
        const planta        = req.body.planta

        let ruta = `/ubicaciones/perfil?ubicacion=${planta}&cliente=${req.body.cliente}`

        await editar_area(nombre, documentacion, folio).then(_ =>{
            res.redirect(ruta)
            return next() 
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar el area especificada: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    getArea,
    getAreas,
    getAreasProyecto,
    createArea,
    editArea
}


/* const conexion = require('../database/db')
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


exports.editArea = async(req, res, next) =>{
    try {
        let folio         = req.body.folio
        let nombre        = req.body.nombre
        let documentacion = req.body.documentacion
        let planta        = req.body.planta

        let sql = "UPDATE cat008_areas SET nombre = ?, documentacion = ?, planta = ? WHERE folio = ?"

        let ruta = ''
        if(req.body.flag == 1){ ruta = `/ubicaciones/perfil?ubicacion=${planta}&cliente=${req.body.cliente}&flag=${req.body.flag}`}
        else if(req.body.flag == 0){ ruta = `/ubicaciones/perfil?ubicacion=${planta}&flag=${req.body.flag}`}

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

exports.deleteArea = async(req, res, next) =>{
    try {
        //Primero validamos que no haya una etapa que la utilice
        conexion.query("SELECT * FROM op002_etapas WHERE area = ?", [req.query.area], (err, fila)=>{
            if(err){
                throw err
            }else{
                let ruta = ''
                if(req.query.flag == 1){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=${req.query.flag}`}
                else if(req.query.flag == 0){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=${req.query.flag}`}
                
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
//FIN DEL CRUD DE GESTION DE AREAS */