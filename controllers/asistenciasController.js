import { generar_reporte_asisctencia_usuario, generar_reporte_general, generar_reporte_general_filtrado, registrar_asistencia } from "../models/Asistencia.js"

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
        const data = {
            usuario: req.query.usuario,
            proyecto: req.query.proyecto,
            fecha: new Date(),
            hora: new Date()
        }

        await registrar_asistencia(data).catch(error=>{
            throw('Ha ocurrido un error al registrar la asistencia: ', error)
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