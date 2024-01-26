import conexion from "../database/db.js";
import { enviarCorreo } from "../helpers/emails.js";
import { seleccionar_usuarios_asignados } from "../models/Rol.js";
import { actualizar_asignacion, actualizar_estatus_tarea, actualizar_reporte_tarea, asignar_estatus_tarea, asignar_tarea, crear_tarea, editar_tarea, eliminar_asignacion, eliminar_tarea, entregar_tarea, obtener_detalles_tarea, registrar_accion_tarea, registrar_reporte_tarea, registrar_suceso_tarea, seleccionar_asignacion_tarea, seleccionar_asignaciones_usuario, seleccionar_asignaciones_usuario_tablero, seleccionar_asignador_tarea, seleccionar_encargado_tarea, seleccionar_reporte_tarea, seleccionar_tarea, seleccionar_tareas_etapa, seleccionar_tipos_tarea, seleccionar_ultima_tarea, validar_asignacion, validar_reportes_tarea } from "../models/Tarea.js";
import { seleccionar_usuario } from "../models/Usuario.js";

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
        const folio_creador = req.body.creador
        let tarea = {
            descripcion: req.body.descripcion,
            etapa: req.body.etapa,
            fecha_entrega: req.body.fecha_entrega,
            estatus: req.body.estatus,
            tipo: req.body.tipo
        }
        let ruta = calculateRuta(req.body.flag, tarea.etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)
        
        await crear_tarea(tarea).catch(error=>{
            throw('Ha ocurrido un error al registrar la tarea: ', error)
        })

        const fechaActual = new Date()
        //Registramos en la bitacora quien creo la tarea
        const bitacora = {
            usuario: folio_creador,
            tarea: 0,
            fecha: fechaActual.toISOString().slice(0, 19).replace("T", " "),
            accion: 0 //0 - Significa crear
        }

        //Consultamos el folio de la tarea
        await seleccionar_ultima_tarea().then(resultado=>{
            bitacora.tarea = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el folio de la tarea: ', error)
        })

        //Registramos en la bitacora la creación de la  tarea
        await registrar_accion_tarea(bitacora).catch(error=>{
            throw('Ha ocurrido un error al registrar la accion de la tarea: ', error)
        })

        res.redirect(`/${ruta}`)
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectInfoTareasUserDashboard = async(req, _, next)=>{
    try {
        const usuario = req.user

        await seleccionar_asignaciones_usuario_tablero(usuario.folio).then(resultado=>{
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
        const usuario = req.user
        conexion.query("SELECT * FROM op004_reporte WHERE usuario = ?", usuario.folio, (error,fila)=>{
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
        //Recibimos los valores del formulario mediante get
        const admin = req.body.admin
        const data ={
            usuario: req.body.usuario,
            tarea: req.body.tarea
        }
        //Definimos las variables de control
        let usuario = undefined
        let tarea = undefined
        let ruta = calculateRuta(req.body.flag, req.body.etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)
        
        //Obtenemos la información del usuario al que se le asignará la tarea
        await seleccionar_usuario(data.usuario).then(result=>{
            usuario = result[0]
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del usuario: ', error)
        })

        //Obtenemos la información de la tarea que se va a asignar
        await seleccionar_tarea(data.tarea).then(resultado=>{
            tarea = resultado[0]
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información de la tarea que se va a asignar: ', error)
        })

        //Ejecutamos el método para asignar la tarea
        await asignar_tarea(data).catch(error=>{
            throw('Ha ocurrido un error al asignar la tarea al usuario: ', error)
        })
        
        //Actualizamos el estatus de la tarea
        await actualizar_estatus_tarea(1, data.tarea).catch(error=>{
            throw('Ha ocurrido un error al actualizar el estatus de la tarea: ', error)
        })

        const fechaActual = new Date()
        //Actualizamos la bitacora
        const bitacora = {
            administrador: admin,
            encargado: usuario.folio,
            tarea: tarea.folio,
            fecha: fechaActual.toISOString().slice(0, 19).replace("T", " "),
            accion: 0 //0 - Significa que el administrador ha asignado la tarea al encargado
        }

        await registrar_suceso_tarea(bitacora).catch(error=>{
            throw('Ha ocurrido un error registrando la asignación en la bitacora: ', error)
        })

        enviarCorreo({
            email: usuario.email,
            asunto: 'Asignación de tarea',
            texto: 'Asignación de tarea',
            cuerpo: `
                <p>Hola ${usuario.nombres}, te informamos que se te ha asignado correctamente la tarea con folio ${data.tarea}.</p>
                <p>La cual consiste en ${tarea.descripcion} y deberá completarse antes del ${tarea.fecha}. </p>
                Puedes revisar la asignación en el área de "Mis Tareas" en el gestor de Jaknet. Esperamos tu entrega.</p>
            `
        })

        res.redirect(`/${ruta}`)
        return next() 

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
const deliverTarea = async(req, res, next)=>{
    try {
        //Obtenemos los valores necesarios para el proceso
        let ruta = ''
        const usuario = req.query.usuario
        const tarea = req.query.tarea
        let data_asignador = undefined

        //Definimos la ruta de retorno
        if(req.query.flag == 1){
            ruta = `/tareas/mis_tareas?folio=${usuario}`
        }else if(req.query.flag == 0){
            ruta = `/?folio=${usuario}`
        }

        //Obtenemos la información de quién asignó la tarea
        await seleccionar_asignador_tarea(tarea).then(resultado=>{
            data_asignador = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información de quién asignó la tarea: ', error)
        })

        //Obtenemos la información del usuario que esta marcando como completada la tarea
        let data_usuario = null
        await seleccionar_usuario(usuario).then(result=>{
            data_usuario = result[0]
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del usuario: ', error)
        })

        //Marcamos como completada la tarea en cuestión
        await entregar_tarea(tarea).catch(error=>{
            throw('Ha ocurrido un error al marcar como completada la asiganción: ', error)
        })

        //Registrar el bitacora la accion
        const fechaActual = new Date()
        const bitacora = {
            administrador: data_asignador.folio,
            encargado: data_usuario.folio,
            tarea: tarea,
            fecha: fechaActual.toISOString().slice(0, 19).replace("T", " "),
            accion: 1 //1 - Significa que una tarea sin evidencia fue marcada como completada
        }
        await registrar_suceso_tarea(bitacora).catch(error=>{
            throw('Ha ocurrido un error registrando la entrega de tarea en la bitacora: ', error)
        })

        //Enviamos el correo al usuario que entrega la tarea
        enviarCorreo({
            email: data_usuario.email,
            asunto: 'Tarea entregada',
            texto: 'Tarea entregada',
            cuerpo: `
                <p>Hola ${data_usuario.nombres}, has marcado como completada la asignación ${tarea}. Gracias por su trabajo.</p>
                <p>Notificaremos a quien asigno la tarea para validar el ejercicio.</p>
                <p>Sistema ERP de Jaknet</p>
            `
        })
        enviarCorreo({
            email: data_asignador.email,
            asunto: 'Tarea entregada',
            texto: 'Tarea entregada',
            cuerpo: `
                <p>Hola ${data_asignador.nombres}, el usuario ${data_usuario.nombres} ha marcado como completada la tarea ${tarea}.</p>
                <p>Puede validar el ejercicio desde el sistema o reuniendose con el.</p>
                <p>Sistema ERP de Jaknet</p>
            `
        })

        res.redirect(ruta)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const loadTareaReporte = async(req, res, next)=>{
    try {
        //Primero definimos algunas variables de control
        let data_asignador = undefined
        let data_usuario = undefined
        let ruta = ''
        let has_report = null
        const data = {
            enlace: req.query.url,
            tarea: req.query.tarea,
            usuario:  req.query.usuario,
            fecha: new Date(),
            hora: new Date()
        }

        //Validamos y definimos la pagina a la que se debe volver
        if(req.query.flag == 1){
            ruta = `/tareas/mis_tareas?folio=${data.usuario}`
        }else if(req.query.flag == 0){
            ruta = `/?folio=${data.usuario}`
        }

        //Seleccionamos la información del usuario que esta entregando la tarea
        await seleccionar_usuario(data.usuario).then(result=>{
            data_usuario = result[0]
        }).catch(error=>{
            throw(`Error al buscar los datos de usuario: ${error}`)
        })

        //Seleccionamos la información del usuario que asignó la tarea
        await seleccionar_asignador_tarea(data.tarea).then(resultado=>{
            data_asignador = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información de quién asignó la tarea: ', error)
        })

        //Obtenemos información sobre si ya existía o no reporte de la tarea
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

        //Marcamos como completada la tarea
        await entregar_tarea(data.tarea).catch(error=>{
            throw('Ha ocurrido un error al completar la entrega de la tarea: ', error)
        })

        //Registrar el bitacora la accion
        const fechaActual = new Date()
        const bitacora = {
            administrador: data_asignador.folio,
            encargado: data_usuario.folio,
            tarea: data.tarea,
            fecha: fechaActual.toISOString().slice(0, 19).replace("T", " "),
            accion: 2 //2 - Significa que una tarea con evidencia fue entregada
        }
        await registrar_suceso_tarea(bitacora).catch(error=>{
            throw('Ha ocurrido un error registrando la entrega de tarea en la bitacora: ', error)
        })

        enviarCorreo({
            email: data_usuario.email,
            asunto: 'Tarea entregada',
            texto: 'Tarea entregada',
            cuerpo: `
                <p>Hola ${data_usuario.nombres}, has entregado el siguiente enlace <a href='${data.enlace}'>Tarea</a> 
                a la asignación correspondiente a la tarea con folio ${data.tarea}. Gracias será revisada.</p>
                <p>Sistema ERP de Jaknet</p>
            `
        })

        enviarCorreo({
            email: data_asignador.email,
            asunto: 'Tarea entregada',
            texto: 'Tarea entregada',
            cuerpo: `
                <p>Hola ${data_asignador.nombres}, el usuario ${data_usuario.nombres} ha entregado la tarea ${data.tarea}. Subiendo el siguiente reporte: 
                <a href='${data.enlace}'>Reporte de la tarea</a>.</p>
                <p>Puede revisar la enrega desde el sistema o reuniendose con el.</p>
                <p>Sistema ERP de Jaknet</p>
            `
        })

        res.redirect(ruta)
        return next() 
    } catch (error) {
        console.log(error)
        return next()
    }
}
const watchReporte = async(req, res, next)=>{
    try {
        const tarea = req.query.tarea
        let reporte_tarea = undefined
        //Seleccionamos la información de la entrega de la tarea
        await seleccionar_reporte_tarea(tarea).then(resultado=>{
            reporte_tarea = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el reporte de la tarea: ', error)
        })

        res.redirect(reporte_tarea.enlace)
    } catch (error) {
        console.log(error)
    }
    return next()
}
const rejectTarea = async(req, res, next)=>{
    try {
        //Recibimos los valores
        const admin = req.query.admin
        const tarea = req.query.tarea
        const texto = req.query.texto

        let ruta = calculateRuta(req.query.flag, req.query.etapa, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

        //Obtenemos la información del administrador
        let data_asignador = undefined
        await seleccionar_usuario(admin).then(result=>{
            data_asignador = result[0]
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la informaicón de quien asignó la tarea: ', error)
        })

        //Obtenemos la información del empleado
        let data_empleado = undefined
        await seleccionar_encargado_tarea(tarea).then(result=>{
            data_empleado = result
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del encargado de la tarea: ', error)
        })

        //Marcamos como pendiente la tarea o anulamos la entrega
        await actualizar_estatus_tarea(3, tarea).catch(error=>{
            throw('Ha ocurrido un error al marcar como pendiente la tarea: ', error)
        })

        //Registramos el susceso en la bitacora
        const fechaActual = new Date()
        const bitacora = {
            administrador: data_asignador.folio,
            encargado: data_empleado.folio,
            tarea: tarea,
            fecha: fechaActual.toISOString().slice(0, 19).replace("T", " "),
            accion: 3 //3 - Significa que una tarea ha sido devuelta.
        }
        await registrar_suceso_tarea(bitacora).catch(error=>{
            throw('Ha ocurrido un error registrando la entrega de tarea en la bitacora: ', error)
        })

        //Enviamos la notificación al empleado
        enviarCorreo({
            email: data_empleado.email,
            asunto: 'Tarea rechazada',
            texto: 'Tarea rechazada',
            cuerpo: `
                <p>Hola ${data_empleado.nombres}</p>
                <p>Lamentamos decirte que tu entrega a la tarea ${tarea}, ha sido rechazda por ${data_asignador.nombres}</p>
                <p>La razón descrita por el asignador es: "${texto}".</p>
                <p>Para más información, favor de comunicarse directamente con el asignador.</p>
                <p>Sistema ERP de Jaknet</p>
            `
        })
        //Envíamos la notificación al aisgnador
        enviarCorreo({
            email: data_asignador.email,
            asunto: 'Tarea rechazada',
            texto: 'Tarea rechazada',
            cuerpo: `
                <p>Hola ${data_asignador.nombres}</p>
                <p>Has rechazado la entrega de ${data_asignador.nombres} a la tarea ${tarea}.</p>
                <p>Tu razón descrita ha sido: "${texto}".</p>
                <p>Favor de cominicarse con ${data_asignador.nombres} para brindarle mayor retroalimentación.</p>
                <p>Sistema ERP de Jaknet</p>
            `
        })

        res.redirect('/' + ruta)
    } catch (error) {
        console.log(error)
    }
    return next()
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
    loadTareaReporte,
    watchReporte,
    rejectTarea
}
