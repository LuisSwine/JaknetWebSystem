import conexion from "../database/db.js";
import { seleccionar_usuarios_asignados } from "../models/Rol.js";
import { actualizar_asignacion, actualizar_estatus_tarea, asignar_estatus_tarea, asignar_tarea, crear_tarea, editar_tarea, eliminar_asignacion, eliminar_tarea, obtener_detalles_tarea, seleccionar_asignacion_tarea, seleccionar_tarea, seleccionar_tareas_etapa, seleccionar_tipos_tarea, validar_asignacion } from "../models/Tarea.js";

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
        conexion.query("SELECT * FROM asignacion_usuario_view001 WHERE folio_usuario = ? ORDER BY folio_asignacion DESC LIMIT 10", usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                req.tareas = fila
                return next()
            }
        })
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

export {
    selectTareasEtapa,
    selectInfoTareasUserDashboard,
    selectTiposTarea,
    selectTarea,
    obtenerReportes,
    createTarea,
    updateTarea,
    validateTarea,
    getUsuariosAsignados,
    getTareaAsignada,
    assignTarea,
    showDetailsTarea,
    updateAsignacion,
    deleteTarea
}

/* 

//TAREAS
   
    
    
    export asyncfunction     createTareaAdmin(req, res, next){
        try {
            let data = {
                descripcion: req.body.descripcion,
                etapa: req.body.etapa,
                fecha_entrega: req.body.fecha_entrega,
                estatus: req.body.estatus,
                tipo: req.body.tipo
            }
            let ruta = 'admintareas'

            _query("INSERT INTO op003_tareas SET ?", data, (error, results)=>{
                if(error){
                    throw error
                }else{
                    res.redirect(`/${ruta}`)
                    return next()    
                }
            })    
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    
    
    
    
    export asyncfunction     selectTareasAdmin(req, res, next){
        try {
            _query("SELECT * FROM tareas_view002", (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.tareas = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }

    
    
    
    
    //FIN DE TAREAS

//DASHBOARD DE PERFIL
    
    export asyncfunction     obtenerReportesAdmin(req, res, next){
        try {
            _query("SELECT * FROM op004_reporte", (error,fila)=>{
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
    export asyncfunction     asignarTareaAdmin(req, res, next){
        try {
            let data ={
                usuario: req.body.usuario,
                tarea: req.body.tarea
            }
            _query("INSERT INTO op014_tarea_usuario SET ?", data, function(error, results){
                if(error){
                    throw error
                }else{
                    _query("UPDATE op003_tareas SET estatus = 1 WHERE folio = ?", [data.tarea], (miss, good)=>{
                        if(miss){
                            throw miss
                        }else{
                            res.redirect('/admintareas')
                            return next()
                        }
                    })  
                }
            }) 
        } catch (error) {
            console.log(error)
            return next()
        }
    }

//SECCION DE "MIS TAREAS"
    export asyncfunction     selectInfoTareasUser(req, res, next){
        try {
            _query("SELECT * FROM asignacion_usuario_view001 WHERE folio_usuario = ? ORDER BY folio_asignacion DESC", [req.query.folio], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.tareas = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }

//FUNCIONES GENERALES "MIS TAREAS" & DASHBOARD DE PERFIL
    export asyncfunction     entregarTarea(req, res, next){
        try {
            let ruta = ''
            if(req.query.flag == 1){
                ruta = `/misTareas?folio=${req.query.usuario}`
            }else if(req.query.flag == 0){
                ruta = `/?folio=${req.query.usuario}`
            }
            _query('UPDATE op003_tareas SET estatus = 2 WHERE folio = ?', [req.query.tarea], (error2, fila2)=>{
                if(error2){
                    throw error2
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
    export asyncfunction     subirReporteTarea(req, res, next){
        try {
            let data = {
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

            //Validamos si ya existe un reporte
            _query("SELECT * FROM op004_reporte WHERE tarea = ? AND usuario = ?", [data.tarea, data.usuario], (err, fil)=>{
                if(err){
                    throw err
                }else{
                    if(fil.length === 0){
                        //No existe, simplemente agregamos
                        _query('INSERT INTO op004_reporte SET ?', data, (error, fila)=>{
                            if(error){
                                throw error
                            }else{
                                _query('UPDATE op003_tareas SET estatus = 2 WHERE folio = ?', [data.tarea], (error2, fila2)=>{
                                    if(error2){
                                        throw error2
                                    }else{
                                        res.redirect(ruta)
                                        return next()
                                    }
                                })
                            }
                        })
                    }else{
                        //Hacemos un update primero
                        let folio = fil[0].folio
                        _query("UPDATE op004_reporte SET enlace = ?, fecha = ?, hora = ? WHERE folio = ?", [data.enlace, data.fecha, data.hora, folio], (error3, fila3)=>{
                            if(error3){
                                throw error3
                            }else{
                                _query('UPDATE op003_tareas SET estatus = 2 WHERE folio = ?', [data.tarea], (error2, fila2)=>{
                                    if(error2){
                                        throw error2
                                    }else{
                                        res.redirect(ruta)
                                        return next()
                                    }
                                })
                            }
                        })
                    }
                }
            })

            
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//ADMINISTRADOR
    export asyncfunction     declineReportAdmin(req, res, next){
        try {
            let tarea = req.query.tarea

            //Primero eliminamos el reporte
            _query("DELETE FROM op004_reporte WHERE tarea = ?", [tarea], (error1, fila1)=>{
                if(error1){
                    throw error1
                }else{
                    _query("UPDATE op003_tareas SET estatus = 6 WHERE folio = ?", [tarea], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            res.redirect('/admintareas')
                            return next()
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    export asyncfunction     checkAsIncAdmin(req, res, next){
        try {
            let tarea = req.query.tarea

            _query("UPDATE op003_tareas SET estatus = 5 WHERE folio = ?", [tarea], (error2, fila2)=>{
                if(error2){
                    throw error2
                }else{
                    res.redirect('/admintareas')
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    export asyncfunction     deleteTareaAdmin(req, res, next){
        try {
            let tarea = req.query.tarea

            //Primero validamos y eliminamos el reporte
            _query("DELETE FROM op004_reporte WHERE tarea = ?", [tarea], (error1, fila1)=>{
                if(error1){
                    throw error1
                }else{
                    //Eliminamos la Asignacion 
                    _query("DELETE FROM op014_tarea_usuario WHERE tarea = ?", [tarea], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            //Eliminamos la tarea
                            _query("DELETE FROM op003_tareas WHERE folio = ?", [tarea], (error3, fila3)=>{
                                if(error3){
                                    throw error3
                                }else{
                                    res.redirect('/admintareas')
                                    return next()
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    } */