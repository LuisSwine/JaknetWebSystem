import { enviarCorreo } from "../helpers/emails.js"
import { generar_reporte_asisctencia_usuario, generar_reporte_general, generar_reporte_general_filtrado, registrar_asistencia } from "../models/Asistencia.js"
import { seleccionar_usuario } from "../models/Usuario.js"

const reporteAsistenciaUsuario = async(req, _, next)=>{
    try {
        const usuario = req.query.usuario

        await generar_reporte_asisctencia_usuario(usuario).then(resultado=>{
            req.asistencias = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al generar el reporte de asistencia: ', error)
        })

        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}
const reporteGeneralAsistencia = async(req, _, next)=>{
    try {
        if(req.query.inicio && req.query.termino){
            await generar_reporte_general_filtrado(req.query.inicio, req.query.termino).then(resultado=>{
                req.asistencias = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener las asistencias en el periodo indicado: ', error)
            })
        }else{
            await generar_reporte_general().then(resultado=>{
                req.asistencias = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener todas las asistencias: ', error)
            })
        }
    } catch (error) {
        console.log(error)
    }
    return  next()
} 
const resgistrarAsistencia =  async(req, res, next)=>{
    try {
        const latitud = req.query.latitud
        const longitud = req.query.longitud
        const data = {
            usuario: req.query.usuario,
            proyecto: req.query.proyecto,
            fecha: new Date(),
            hora: new Date()
        }

        console.log(data.usuario)

        if (latitud == undefined || longitud == undefined){
            console.log('latitud o longitud no definida')
        }

        await registrar_asistencia(data).catch(error=>{
            throw('Ha ocurrido un error al registrar la asistencia: ', error)
        })

        let data_usuario = null
        await seleccionar_usuario(data.usuario).then(result=>{
            data_usuario= result[0]
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del usuario: ', error)
        })

        enviarCorreo({
            email: 'luis.luis.la2002@gmail.com',
            asunto: 'Asistencia registrada',
            texto: 'Asistencia registrada',
            cuerpo: `
                <p>Se ha registrado la asistencia del empleado ${data_usuario.nombres} en el proyecto ${data.proyecto}</p>
                <p>Puede verificar su ubicación en el siguiente enlace <a href='https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}'> Clic aquí para ver ubicación del usuario</a></p>
            `
        }) 
        
        res.redirect(`/?folio=${data.usuario}`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}



export {
    reporteAsistenciaUsuario,
    reporteGeneralAsistencia,
    resgistrarAsistencia
}