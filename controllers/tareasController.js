import conexion from "../database/db.js";
import { seleccionar_usuarios_asignados } from "../models/Rol.js";
import { actualizar_asignacion, actualizar_estatus_tarea, actualizar_reporte_tarea, asignar_estatus_tarea, asignar_tarea, crear_tarea, editar_tarea, eliminar_asignacion, eliminar_tarea, entregar_tarea, obtener_detalles_tarea, registrar_reporte_tarea, seleccionar_asignacion_tarea, seleccionar_asignaciones_usuario, seleccionar_asignaciones_usuario_tablero, seleccionar_tarea, seleccionar_tareas_etapa, seleccionar_tipos_tarea, validar_asignacion, validar_reportes_tarea } from "../models/Tarea.js";

function calculateRuta(flag, etapa, proyecto, ubicacion, cliente, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `tareas/etapa?etapa=${etapa}&proyecto=${proyecto}&cliente=${cliente}&flag=0`;/* `tareas/etapa?etapa=${etapa}&proyecto=${proyecto}&flag=0`; */ break;
        case 2: ruta = `tareas/etapa?etapa=${etapa}&proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 1: ruta = `tareas/etapa?etapa=${etapa}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 3: ruta = `tareas/etapa?etapa=${etapa}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 4: ruta = `tareas/etapa?etapa=${etapa}&proyecto=${proyecto}&flag=${flag}&permisos=${permisos}`; break;
        //case 5: ruta = `tareasetapa?etapa=${etapa}&ubicacion=${ubicacion}&cliente=${cliente}&flag=5`; break;
        //case 6: ruta = `tareasetapa?etapa=${etapa}&cliente=${cliente}&flag=6`;break;
        default: ruta = 'adminubicaciones'; break;
    }
    return ruta;
}

const selectTareasEtapa = async(req, _, next)=>{
    try {
        await seleccionar_tareas_etapa(req.query.etapa).then(resultado=>{
            req.tareas = resultado
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al obtener las tareas de la etapa: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectTiposTarea = async(req, _, next)=>{
    try {
        await seleccionar_tipos_tarea().then(resultado=>{
            req.tipos = resultado
            return next()
        })
        .catch(error=>{
            throw("Error al obtener los tipos de tarea: ", error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectTarea = async(req, _, next)=>{
    try {
        await seleccionar_tarea(req.query.tarea).then(resultado=>{
            req.tarea = resultado
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al obtener la informacion de la tarea: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectInfoTareasUsuario = async(req, res, next)=>{
    try {

        const usuario = req.query.folio

        await seleccionar_asignaciones_usuario(usuario).then(resultado=>{
            req.tareas = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las asignaciones del usuario: ', error)
        })
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createTarea = async(req, res, next)=>{
    try {
        let tarea = {
            descripcion: req.body.descripcion,
            etapa: req.body.etapa,
            fecha_entrega: req.body.fecha_entrega,
            estatus: req.body.estatus,
            tipo: req.body.tipo
        }
        let ruta = calculateRuta(req.body.flag, tarea.etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

        await crear_tarea(tarea).then(_=>{
            res.redirect(`/${ruta}`)
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al registrar la tarea: ', error)
        })  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectInfoTareasUserDashboard = async(req, _, next)=>{
    try {
        const usuario = req.query.folio

        await seleccionar_asignaciones_usuario_tablero(usuario).then(resultado=>{
            req.tareas = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los registros del tablero: ', error)
        })

        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const obtenerReportes = async(req, _, next)=>{
    try {
        const usuario = req.query.folio
        conexion.query("SELECT * FROM op004_reporte WHERE usuario = ?", usuario, (error,fila)=>{
            if(error){
                throw error
            }else{
                req.reportes = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateTarea = async(req, res, next)=>{
    try {
        const folio         = req.body.tarea
        const descripcion   = req.body.descripcion
        const etapa         = req.body.etapa
        const fecha_entrega = req.body.fecha_entrega
        const tipo          = req.body.tipo
        const ruta = calculateRuta(req.body.flag, etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

        await editar_tarea(descripcion, fecha_entrega, tipo, folio).then(_=>{
            res.redirect(`/${ruta}`)
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al actualizar la tarea: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateAsignacion = async(req, res, next)=>{
    try {
        const usuario = req.body.usuario
        const prev = req.body.previo
        const tarea = req.body.tarea
        const asignacion = req.body.asignacion
        const etapa = req.body.etapa

        const ruta = calculateRuta(req.body.flag, etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

        if(usuario == prev){
            res.redirect(`/${ruta}`)
            return next()
        }else if(usuario == 0){

            await eliminar_asignacion(asignacion).catch(error=>{
                throw('Ha ocurrido un error al elimnar la asiganción de la tarea: ', error)
            })
            await asignar_estatus_tarea(tarea).then(_=>{
                res.render('Error/showInfo', {
                    title: 'Tarea sin Asignar',
                    alert: true,
                    alertTitle: 'INFORMACION',
                    alertMessage: `Se ha eliminado la asignacion de la tarea ${tarea}`,
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 8000,
                    ruta: `${ruta}` 
                })
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al actualizar el estatus de la tarea: ', error)
            })
        }else{
            await actualizar_asignacion(usuario, asignacion).then(_=>{
                res.redirect(`/${ruta}`)
                return next()  
            }).catch(error=>{
                throw('Ha ocurrido un error al editar la asignación: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const validateTarea = async(req, res, next)=>{
    try {
        const tarea = req.query.tarea
        let asignacion_validada = false

        await validar_asignacion(tarea).then(resultado=>{
            asignacion_validada = resultado
        })
        .catch(error=>{
            throw('Ha ocurrido un error al validar la asignación de la tarea: ', error)
        })

        if(!asignacion_validada){
            await seleccionar_tarea(tarea).then(resultado=>{
                req.tarea = resultado
                return next()
            })
            .catch(error=>{
                throw('Ha ocurrido un error al buscar la información de la tarea: ', error)
            })
        }else{
            res.render('Error/redirect', {
                alert: true,
                alertTitle: 'ERROR',
                alertMessage: 'Esta tarea ya esta asignada',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 8000,
                ruta: `tareasetapa/${result[0].folio_etapa}` 
            })
            return next()
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getUsuariosAsignados = async(req, _, next)=>{
    try {
        await seleccionar_usuarios_asignados(req.query.proyecto).then(resultado=>{
            req.usuarios = resultado
            return next()
        })
        .catch(error=>{
            throw(`Ha ocurrido un error al obtener los usuarios asignados a este proyecto ${req.query.proyecto}: `, error);
        })         
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getTareaAsignada = async(req, _, next)=>{
    try {
        await seleccionar_asignacion_tarea(req.query.tarea).then(resultado=>{
            req.asignacion = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la asignación de la tarea: ', error)
        })
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const assignTarea = async(req, res, next)=>{
    try {
        let data ={
            usuario: req.body.usuario,
            tarea: req.body.tarea
        }
        let ruta = calculateRuta(req.body.flag, req.body.etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)
        
        await asignar_tarea(data).catch(error=>{
            throw('Ha ocurrido un error al asignar la tarea al usuario: ', error)
        })
        
        await actualizar_estatus_tarea(1, data.tarea).then(_=>{
            res.redirect(`/${ruta}`)
            return next() 
        })
        .catch(error=>{
            throw('Ha ocurrido un error al actualizar el estatus de la tarea: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const showDetailsTarea = async(req, res, next)=>{
    try {
        const ruta = calculateRuta(req.query.flag, req.query.etapa, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos)
        await obtener_detalles_tarea(req.query.tarea).then(resultado=>{
            res.render('Error/showInfo', {
                title: 'Usuario Asignado',
                alert: true,
                alertTitle: 'INFORMACION',
                alertMessage: `Tarea ${resultado.folio_tarea} esta asignada a ${resultado.nombres} ${resultado.apellidos} que en el proyecto tiene el cargo de ${resultado.rol_usuario}`,
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 8000,
                ruta: `${ruta}` 
            })
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los detalles de la tarea: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteTarea = async(req, res, next)=>{
    try {
        const tarea = req.query.tarea
        const ruta = calculateRuta(req.query.flag, req.query.etapa, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos)
        
        let isAsigned = true

        await validar_asignacion(tarea).then(resultado=>{
            isAsigned = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los datos de la tarea: ', error)
        })
        
        if(isAsigned){
            res.render('Error/showInfo', {
                title: 'Tarea Asignada',
                alert: true,
                alertTitle: 'INFORMACION',
                alertMessage: `La tarea ${tarea} se encuentra asignada, debe eliminar la asignacion antes de eliminar la tarea`,
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 8000,
                ruta: `${ruta}` 
            })
            return next()
        }

        await eliminar_tarea(tarea).catch(error=>{
            throw('Ha ocurrido un error al eliminar la tarea: ', error)
        })

        res.redirect(`/${ruta}`)
        return next() 

    }catch (error) {
        console.log(error)
        return next()
    }
}
const deliverTarea = async(req, _, next)=>{
    try {
        let ruta = ''
        if(req.query.flag == 1){
            ruta = `/misTareas?folio=${req.query.usuario}`
        }else if(req.query.flag == 0){
            ruta = `/?folio=${req.query.usuario}`
        }

        await entregar_tarea(req.query.tarea).catch(error=>{
            throw('Ha ocurrido un error al marcar como completada la asiganción: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const loadTareaReporte = async(req, res, next)=>{
    try {
        const data = {
            enlace: req.query.url,
            tarea: req.query.tarea,
            usuario:  req.query.usuario,
            fecha: new Date(),
            hora: new Date()
        }
        let ruta = ''
        if(req.query.flag == 1){
            ruta = `/tareas/mis_tareas?folio=${data.usuario}`
        }else if(req.query.flag == 0){
            ruta = `/?folio=${data.usuario}`
        }

        let has_report = null
        await validar_reportes_tarea(data.tarea, data.usuario).then(resultado=>{
            has_report = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar los reportes de la tarea: ', error)
        })

        if(!has_report){
            await registrar_reporte_tarea(data).catch(error=>{
                throw('Ha ocurrido un error al registrar el reporte de la tarea: ', error)
            })
        }else{
            let folio = has_report[0].folio
            await actualizar_reporte_tarea(data.enlace, data.fecha, data.hora, folio).catch(error=>{
                throw('Ha ocurrido un error al actualizar el reporte de la tarea: ', error)
            })
        }

        await entregar_tarea(data.tarea).catch(error=>{
            throw('Ha ocurrido un error al completar la entrega de la tarea: ', error)
        })
        res.redirect(ruta)
        return next() 
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    selectTareasEtapa,
    selectInfoTareasUserDashboard,
    selectTiposTarea,
    selectTarea,
    selectInfoTareasUsuario,
    obtenerReportes,
    createTarea,
    updateTarea,
    validateTarea,
    getUsuariosAsignados,
    getTareaAsignada,
    assignTarea,
    showDetailsTarea,
    updateAsignacion,
    deleteTarea,
    deliverTarea,
    loadTareaReporte
}
