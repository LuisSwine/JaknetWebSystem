import { agregar_etapa, editar_etapa, eliminar_etapa, seleccionar_etapa, seleccionar_etapas_proyecto } from "../models/Etapas.js";
import { seleccionar_tareas_etapa } from "../models/Tarea.js";

function calculateRuta(flag, ubicacion, cliente, proyecto, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=0`;
            //ruta = `/proyectos/perfil?proyecto=${proyecto}&flag=0`;
            break;
        case 1:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=1`;
            //ruta = `/proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=1`;
            break;
        case 2:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=2`;
            break;
        case 3:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=3`;
            break;
        case 4:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&flag=4&permisos=${permisos}`;
            break;
    }
    return ruta
}

const getEtapasProyecto = async(req, _, next)=>{
    try {
        const proyecto = req.query.proyecto
        await seleccionar_etapas_proyecto(proyecto).then(resultado=>{
            req.etapas = resultado
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al obtener las etapas del proyecto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getEtapa = async(req, _, next) =>{
    try {
        await seleccionar_etapa(req.query.etapa).then(resultado=>{
            req.etapa = resultado
            return next()
        })
        .catch(error=>{
            throw(`Error al buscar obtener la informacion de la etapa: `, error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const addEtapa = async(req, res, next)=>{
    try {
        let etapa = {
            nombre: req.body.nombre,
            area: req.body.area,
            proyecto: req.body.proyecto
        }

        let ruta = calculateRuta(req.body.flag, req.body.ubicacion, req.body.cliente, etapa.proyecto, req.body.permisos)

        await agregar_etapa(etapa).then(_=>{
            res.redirect(ruta)
            return next()  
        })
        .catch(error=>{
            throw('Ha ocurrido un error al intentar registrar la etapa: ', error)
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateEtapa = async(req, res, next)=>{
    try {
        const etapa    = req.body.folio
        const nombre   = req.body.nombre
        const area     = req.body.area
        const proyecto = req.body.proyecto

        const ruta =  calculateRuta(req.body.flag, req.body.ubicacion, req.body.cliente, proyecto, req.body.permisos)

        await editar_etapa(nombre, area, etapa).catch(error=>{
            throw('Ha ocurrido un error al editar la etapa: ', error)
        })

        res.redirect(ruta)
        return next() 

    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteEtapa = async(req, res, next)=>{
    try {
        const etapa = req.query.etapa
        const ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto, req.query.permisos)
        
        let hasTasks = true

        await seleccionar_tareas_etapa(etapa).then(resultado=>{
            if(resultado.length === 0){
                hasTasks = false
            }
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las tareas de la etapa: ', error)
        })

        if(hasTasks){
            res.render('Error/showInfo', {
                title: 'Etapa con tareas creadas',
                alert: true,
                alertTitle: 'INFORMACION',
                alertMessage: `La etapa ${etapa} aun tiene tareas creadas, debe eliminarlas antes de eliminar la etapa del proyecto`,
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 8000,
                ruta: `${ruta.replace('/', '')}` 
            })
            return next()
        }

        await eliminar_etapa(etapa).catch(error=>{
            throw('Ha ocurrido un error al eliminar la etapa: ', error)
        })
        res.redirect(ruta)
        return next()  
    }catch (error) {
        console.log(error)
        return next()
    }
}


export {
    getEtapasProyecto,
    getEtapa,
    updateEtapa,
    addEtapa,
    deleteEtapa
}