const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

function calculateRuta(flag, etapa, proyecto, ubicacion, cliente, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `tareasetapa?etapa=${etapa}&proyecto=${proyecto}&flag=0`; break;
        case 1: ruta = `tareasetapa?etapa=${etapa}&proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 2: ruta = `tareasetapa?etapa=${etapa}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 3: ruta = `tareasetapa?etapa=${etapa}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 4: ruta = `tareasetapa?etapa=${etapa}&proyecto=${proyecto}&flag=${flag}&permisos=${permisos}`; break;
        //case 5: ruta = `tareasetapa?etapa=${etapa}&ubicacion=${ubicacion}&cliente=${cliente}&flag=5`; break;
        //case 6: ruta = `tareasetapa?etapa=${etapa}&cliente=${cliente}&flag=6`;break;
        default: ruta = 'adminubicaciones'; break;
    }
    return ruta;
}

//TAREAS
    exports.selectTareasEtapa = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM tareas_view001 WHERE folio_etapa = ?", [req.query.etapa], (error, fila)=>{
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
    exports.selectTiposTarea = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM cat010_tipo_tareas", (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.tipos = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.createTarea = async(req, res, next)=>{
        try {
            let data = {
                descripcion: req.body.descripcion,
                etapa: req.body.etapa,
                fecha_entrega: req.body.fecha_entrega,
                estatus: req.body.estatus,
                tipo: req.body.tipo
            }
            let ruta = calculateRuta(req.body.flag, data.etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

            conexion.query("INSERT INTO op003_tareas SET ?", data, (error, results)=>{
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
    exports.createTareaAdmin = async(req, res, next)=>{
        try {
            let data = {
                descripcion: req.body.descripcion,
                etapa: req.body.etapa,
                fecha_entrega: req.body.fecha_entrega,
                estatus: req.body.estatus,
                tipo: req.body.tipo
            }
            let ruta = 'admintareas'

            conexion.query("INSERT INTO op003_tareas SET ?", data, (error, results)=>{
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
    exports.validateTarea = async(req, res, next)=>{
        try {
            const tarea = req.query.tarea
            conexion.query("SELECT * FROM op014_tarea_usuario WHERE tarea = ?", [tarea], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    conexion.query("SELECT * FROM tareas_view001 WHERE folio = ?", [tarea], (err, result)=>{
                        if(err){
                            throw err;
                        }else{
                            if(fila.length === 0){
                                req.tarea = result
                                return next() 
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
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.usuariosAsignados = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM roles_view001 WHERE proyecto = ?", [req.query.proyecto], (err, filas)=>{
                if(err){
                    throw err;
                }else{
                    req.usuarios = filas
                    return next()
                }
            })          
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.asignarTarea = async(req, res, next)=>{
        try {
            let data ={
                usuario: req.body.usuario,
                tarea: req.body.tarea
            }
            let ruta = calculateRuta(req.body.flag, req.body.etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)
            conexion.query("INSERT INTO op014_tarea_usuario SET ?", data, function(error, results){
                if(error){
                    throw error
                }else{
                    conexion.query("UPDATE op003_tareas SET estatus = 1 WHERE folio = ?", [req.body.tarea], (miss, good)=>{
                        if(miss){
                            throw miss
                        }else{
                            conexion.query("SELECT folio_etapa FROM tareas_view002 WHERE folio = ?", [req.body.tarea], (err, result)=>{
                                if(err){
                                    throw err
                                }else{   
                                    res.redirect(`/${ruta}`)
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
    }
    exports.selectTarea = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM tareas_view002 WHERE folio = ?", [req.query.tarea], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.tarea = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectTareasAdmin = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM tareas_view002", (error, fila)=>{
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
    exports.editarTarea = async(req, res, next)=>{
        try {
            let folio         = req.body.tarea
            let descripcion   = req.body.descripcion
            let etapa         = req.body.etapa
            let fecha_entrega = req.body.fecha_entrega
            let tipo          = req.body.tipo

            let sql = "UPDATE op003_tareas SET descripcion = ?, fecha_entrega = ?, tipo = ? WHERE folio = ?"
            const ruta = calculateRuta(req.body.flag, etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

            conexion.query(sql, [descripcion, fecha_entrega, tipo, folio], (error, results)=>{
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
    exports.showAsignTarea = async(req, res, next)=>{
        try {
            const ruta = calculateRuta(req.query.flag, req.query.etapa, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos)
            conexion.query("SELECT * FROM tarea_asignada_view001 WHERE folio_tarea = ?", [req.query.tarea], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    res.render('Error/showInfo', {
                        title: 'Usuario Asignado',
                        alert: true,
                        alertTitle: 'INFORMACION',
                        alertMessage: `Tarea ${fila[0].folio_tarea} esta asignada a ${fila[0].nombres} ${fila[0].apellidos} que en el proyecto tiene el cargo de ${fila[0].rol_usuario}`,
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 8000,
                        ruta: `${ruta}` 
                    })
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectAsignTask = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM tarea_asignada_view001 WHERE folio_tarea = ?", [req.query.tarea], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.asignacion = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.editarAsignacion = async(req, res, next)=>{
        try {
            let usuario = req.body.usuario
            let tarea = req.body.tarea
            let asignacion = req.body.asignacion
            let etapa = req.body.etapa

            const ruta = calculateRuta(req.body.flag, etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

            if(usuario == 0){
                conexion.query("DELETE FROM op014_tarea_usuario WHERE folio = ?", [asignacion], (err, fila)=>{
                    if(err){
                        throw err
                    }else{
                        conexion.query("UPDATE op003_tareas SET estatus = 7 WHERE folio = ?", [tarea], (err2, fila2)=>{
                            if(err2){
                                throw err2
                            }else{
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
                            }
                        })
                    }
                })
            }else{
                conexion.query("UPDATE op014_tarea_usuario SET usuario = ? WHERE folio = ?", [usuario, asignacion], (err, fila)=>{
                    if(err){
                        throw err
                    }else{
                        res.redirect(ruta)
                        return next()   
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteTarea = async(req, res, next)=>{
        try {
            let tarea = req.query.tarea
            const ruta = calculateRuta(req.query.flag, req.query.etapa, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos)
            conexion.query("SELECT * FROM op014_tarea_usuario WHERE tarea = ?", [tarea], (err, fila)=>{
                if(err){
                    throw err
                }else{
                    conexion.query("SELECT etapa FROM op003_tareas WHERE folio = ?", [tarea], (err3, result)=>{
                        if(err3){
                            throw err3
                        }else{
                            if(fila.length === 0){
                                conexion.query("DELETE FROM op003_tareas WHERE folio = ?", [tarea], (err2, fila2)=>{
                                    if(err2){
                                        throw err2
                                    }else{ 
                                        res.redirect(ruta)
                                        return next()  
                                    }
                                })
                            }else{
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
                        }
                    })
                }
            })
        }catch (error) {
            console.log(error)
            return next()
        }
    }
    //FIN DE TAREAS

//DASHBOARD DE PERFIL
    exports.selectInfoTareasUserDashboard = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM asignacion_usuario_view001 WHERE folio_usuario = ? ORDER BY folio_asignacion DESC LIMIT 10", [req.query.folio], (error, fila)=>{
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
    exports.obtenerReportes = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM op004_reporte WHERE usuario = ?", [req.query.folio], (error,fila)=>{
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
    exports.obtenerReportesAdmin = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM op004_reporte", (error,fila)=>{
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
    exports.asignarTareaAdmin = async(req, res, next)=>{
        try {
            let data ={
                usuario: req.body.usuario,
                tarea: req.body.tarea
            }
            conexion.query("INSERT INTO op014_tarea_usuario SET ?", data, function(error, results){
                if(error){
                    throw error
                }else{
                    conexion.query("UPDATE op003_tareas SET estatus = 1 WHERE folio = ?", [data.tarea], (miss, good)=>{
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
    exports.selectInfoTareasUser = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM asignacion_usuario_view001 WHERE folio_usuario = ? ORDER BY folio_asignacion DESC", [req.query.folio], (error, fila)=>{
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
    exports.entregarTarea = async(req, res, next)=>{
        try {
            let ruta = ''
            if(req.query.flag == 1){
                ruta = `/misTareas?folio=${req.query.usuario}`
            }else if(req.query.flag == 0){
                ruta = `/?folio=${req.query.usuario}`
            }
            conexion.query('UPDATE op003_tareas SET estatus = 2 WHERE folio = ?', [req.query.tarea], (error2, fila2)=>{
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
    exports.subirReporteTarea = async(req, res, next)=>{
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
                ruta = `/misTareas?folio=${data.usuario}`
            }else if(req.query.flag == 0){
                ruta = `/?folio=${data.usuario}`
            }

            //Validamos si ya existe un reporte
            conexion.query("SELECT * FROM op004_reporte WHERE tarea = ? AND usuario = ?", [data.tarea, data.usuario], (err, fil)=>{
                if(err){
                    throw err
                }else{
                    if(fil.length === 0){
                        //No existe, simplemente agregamos
                        conexion.query('INSERT INTO op004_reporte SET ?', data, (error, fila)=>{
                            if(error){
                                throw error
                            }else{
                                conexion.query('UPDATE op003_tareas SET estatus = 2 WHERE folio = ?', [data.tarea], (error2, fila2)=>{
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
                        conexion.query("UPDATE op004_reporte SET enlace = ?, fecha = ?, hora = ? WHERE folio = ?", [data.enlace, data.fecha, data.hora, folio], (error3, fila3)=>{
                            if(error3){
                                throw error3
                            }else{
                                conexion.query('UPDATE op003_tareas SET estatus = 2 WHERE folio = ?', [data.tarea], (error2, fila2)=>{
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
    exports.declineReportAdmin = async(req, res, next)=>{
        try {
            let tarea = req.query.tarea

            //Primero eliminamos el reporte
            conexion.query("DELETE FROM op004_reporte WHERE tarea = ?", [tarea], (error1, fila1)=>{
                if(error1){
                    throw error1
                }else{
                    conexion.query("UPDATE op003_tareas SET estatus = 6 WHERE folio = ?", [tarea], (error2, fila2)=>{
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
    exports.checkAsIncAdmin = async(req, res, next)=>{
        try {
            let tarea = req.query.tarea

            conexion.query("UPDATE op003_tareas SET estatus = 5 WHERE folio = ?", [tarea], (error2, fila2)=>{
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
    exports.deleteTareaAdmin = async(req, res, next)=>{
        try {
            let tarea = req.query.tarea

            //Primero validamos y eliminamos el reporte
            conexion.query("DELETE FROM op004_reporte WHERE tarea = ?", [tarea], (error1, fila1)=>{
                if(error1){
                    throw error1
                }else{
                    //Eliminamos la Asignacion 
                    conexion.query("DELETE FROM op014_tarea_usuario WHERE tarea = ?", [tarea], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            //Eliminamos la tarea
                            conexion.query("DELETE FROM op003_tareas WHERE folio = ?", [tarea], (error3, fila3)=>{
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
    }