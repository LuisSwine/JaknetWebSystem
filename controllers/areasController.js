import { seleccionar_areas, seleccionar_area, crear_area, editar_area, validar_area_etapas, eliminar_area } from "../models/Areas.js";
import { seleccionar_ubicacion_proyecto } from "../models/Proyecto.js";

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
const updateArea = async(req, res, next) =>{
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
const deleteArea = async(req, res, next) =>{
    try {
        const area = req.query.area

        let ruta = ''
        if(req.query.flag == 1){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=${req.query.flag}`}
        else if(req.query.flag == 0){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=${req.query.flag}`}
                
        //Primero validamos que no haya una etapa que la utilice
        let is_in_etapa = true

        //Esperamos a obtener respuesta del modelo
        await validar_area_etapas(area).then(resultado=>{
            is_in_etapa = resultado
        }).catch(error=>{
            throw('Error al validar el área en las etapas de los proyectos: ', error)
        })

        //Si existe en alguna etapa abortamos el proceso
        if(is_in_etapa){
            showError(res, 'Area involucrada en alguna(s) etapa(s) de algun proyecto', `El area ${area} esta involucrada en algun proyecto`, ruta.replace('/',''))
            return next()
        }

        //Caso contrario eliminamos la etapa
        await eliminar_area(area).catch(error=>{
            throw('Ha ocurrido un error al eliminar el área seleccionada: ', error)
        })

        res.redirect(ruta)   
    } catch (error) {
        console.log(error)
    }
    return next()
}

export {
    getArea,
    getAreas,
    getAreasProyecto,
    createArea,
    updateArea,
    deleteArea
}