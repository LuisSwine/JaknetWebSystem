import conexion from '../database/db.js'
import { enviarCorreo } from '../helpers/emails.js';
import { seleccionar_proyecto } from '../models/Proyecto.js';
import { verificar_participacion } from '../models/Rol.js';
import { mostrar_mensaje_inicio } from '../helpers/funciones_simples.js'
import { 
    obtener_suma_depositos, 
    obtener_suma_comprobaciones, 
    obtener_suma_comprobaciones_definido, 
    obtener_suma_depositos_definido, 
    obtener_depositos_definido, 
    obtener_depositos, 
    obtener_clave,
    obtener_comprobantes_definido, 
    obtener_comprobantes, 
    registrar_clave, 
    registrar_operacion, 
    obtener_saldo_usuario, 
    actualizar_saldo, 
    obtener_claves,
    obtener_clave_por_folio,
    obtener_monto_saldado,
    obtener_comprobaciones_clave,
    validar_comprobantes_deposito,
    eliminar_deposito,
    eliminar_clave,
    eliminar_operacion,
    obtener_depositos_usuario_definido,
    obtener_depositos_usuario,
    obtener_comprobantes_usuario_definido,
    obtener_comprobantes_usuario,
    obtener_claves_usuario,
    obtener_claves_usuario_view,
    definir_presupuesto_proyecto
} from '../models/Viatico.js'

function formatoFecha(fecha, formato) {
    const map = {
        ss: fecha.getSeconds(),
        nn: fecha.getMinutes(),
        hh: fecha.getHours(),
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
    }

    return formato.replace(/ss|nn|hh|dd|mm|yy|yyy/gi, matched => map[matched])
}
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
function calculateRutaProy(cliente, ubicacion, proyecto, flag, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `/proyectos/viaticos?proyecto=${proyecto}&flag=0`; break;
        case 1: ruta = `/proyectos/viaticos?proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 2: ruta = `/proyectos/viaticos?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 3: ruta = `/proyectos/viaticos?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 4: ruta = `/proyectos/viaticos?proyecto=${proyecto}&flag=4&permisos=${permisos}`; break;
    }
    return ruta;
}


const getEstadisticasViaticos = async(req, _, next)=>{
    try {
        const datos = {
            depositado: 0,
            comprobado: 0
        }

        if(req.query.inicio && req.query.termino){
            const inicio = req.query.inicio
            const termino = req.query.termino

            await obtener_suma_depositos_definido(inicio, termino).then(r=>{
                datos.depositado = 0 + r
            }).catch(error=>{throw('Ha ocurrido un error al obtener la suma de los depositos: ', error)})
            await obtener_suma_comprobaciones_definido(inicio, termino).then(r=>{
                datos.comprobado = 0 + r
            }).catch(error=>{throw('Ha ocurrido un error al obtener la suma de las comprobaciones: ', error)})
        }else{
            await obtener_suma_depositos().then(r=>{
                datos.depositado = 0 + r
            }).catch(error=>{throw('Ha ocurrido un error al obtener la suma de los depositos: ', error)})
            await obtener_suma_comprobaciones().then(r=>{
                datos.comprobado = 0 + r
            }).catch(error=>{throw('Ha ocurrido un error al obtener la suma de las comprobaciones: ', error)})
        }

        req.datos = datos;
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectLastMoves = async(req, res, next)=>{
    try {
        const usuario = req.user

        conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE id_bene = ? ORDER BY FOLIO DESC LIMIT 5", usuario.folio, (error, fila)=>{
            if(error){
                throw error
            }else{
                req.depositos = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getDepositos = async(req, _, next)=>{
    try {
        if(req.query.inicio && req.query.termino){
            await obtener_depositos_definido(req.query.inicio, req.query.termino).then(resultado=>{
                req.depositos = resultado
                return next()
            }).catch(error=>{throw('Ha ocurrido un error al obtener los depositos en el periodo definido: ', error)})
        }else{
            await obtener_depositos().then(resultado=>{
                req.depositos = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los depositos: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getComprobantes = async(req, _, next)=>{
    try {
        if(req.query.inicio && req.query.termino){
            await obtener_comprobantes_definido(req.query.inicio, req.query.termino).then(resultado=>{
                req.comprobaciones = resultado
                return next()
            }).catch(error=>{throw('Ha ocurrido un error al obtener los comprobaciones en el periodo definido: ', error)})
        }else{
            await obtener_comprobantes().then(resultado=>{
                req.comprobaciones = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los comprobaciones: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getClaves = async(req, _, next)=>{
    try {
        await obtener_claves().then(resultado=>{
            req.claves = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las claves de los movimientos: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getClave = async(req, _, next)=>{
    try {

        const clave = req.query.clave
        await obtener_clave_por_folio(clave).then(resultado=>{
            req.clave = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la clave seleccionada: ', error)
        })

        await obtener_monto_saldado(clave).then(resultado=>{
            req.rendido = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la cantidad saldada: ', error)
        })
    } catch (error) {
        console.log(error)
    }
    return next()
}
const getClavesUsuario = async(req, _, next)=>{
    try {
        await obtener_claves_usuario(req.query.usuario).then(resultado=>{
            req.claves = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las claves del usuario seleccionado: ', error)
        })
    } catch (error) {
        console.log(error)
        return next
    }
}
const getClavesViewUsuario = async(req, _, next)=>{
    try {

        const usuario = req.query.usuario
        console.log(usuario)

        await obtener_claves_usuario_view(usuario).then(resultado=>{
            req.claves = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la claves del usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getComprobantesClave = async(req, _, next)=>{
    try {
        await obtener_comprobaciones_clave(req.query.clave).then(resultado=>{
            req.comprobaciones = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los comprobantes de los movimientos de la clave: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getDepositosUsuario = async(req, _, next)=>{
    try {
        if(req.query.inicio && req.query.termino){
            await obtener_depositos_usuario_definido(req.query.inicio, req.query.termino, req.query.usuario).then(resultado=>{
                req.depositos = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los depositos del usuario en el periodo indicado: ', error)
            })
        }else{
            await obtener_depositos_usuario(req.query.usuario).then(resultado=>{
                req.depositos = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los depositos del usuario seleccionado: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getComprobacionesUsuario = async(req, _, next)=>{
    try {
        if(req.query.inicio && req.query.termino){
            await obtener_comprobantes_usuario_definido(req.query.inicio, req.query.termino, req.query.usuario).then(resultado=>{
                req.comprobaciones = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los comprobantes del usuario en el periodo indicado: ', error)
            })
        }else{
            await obtener_comprobantes_usuario(req.query.usuario).then(resultado=>{
                req.comprobaciones = resultado
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener los comprobantes del usuario seleccionado: ', error)
            })
        }  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const assignViaticos = async(req, res, next)=>{
    try {
        const fechaHoy = formatoFecha(new Date(), 'yymmddhhnnss')
        const email = req.body.email
        let clave = {
            proyecto: req.body.proyecto,
            clave: `${req.body.id_bene}VIATICOS${fechaHoy}${req.body.proyecto}`,
            monto: req.body.monto,
            fecha: req.body.fecha,
            usuario: req.body.id_bene,
            uso: req.body.uso
        }
        let operacion = {
            tipo_operacion: 1,
            id_bene: req.body.id_bene,
            beneficiario: req.body.beneficiario,
            emisor: req.body.emisor,
            enlace: req.body.enlace, 
            concepto: req.body.concepto,
            clave: 0,
            fecha: req.body.fecha,
            monto: req.body.monto
        }

        let heParticipates = false
        await verificar_participacion(clave.usuario, clave.proyecto).then(resultado=>{
            heParticipates = resultado
        }).catch(error=>{throw('Ha ocurrido un error al verificar la participación del usuario en el proyecto: ', error)})


        if(!heParticipates){
            showError(res, 'No se pueden asignar viaticos', `No es posible asignarle viaticos al usuario ${clave.usuario} en el proyecto ${clave.proyecto} porque no tiene un rol asignado en el mismo`, 'viaticos/administrar')
        }

        await registrar_clave(clave).catch(error=>{
            throw('Ha ocurrido un error al crear la clave de seguimiento para el movimiento: ', error)
        })

        await obtener_clave(clave.clave).then(resultado=>{
            operacion.clave = resultado
        }).catch(error=>{
            throw('No se ha podido consultar el folio de la clave recien registrada: ', error)
        })
        
        await registrar_operacion(operacion).catch(error=>{
            throw('Ha ocurrido un error al registrar la operacion: ', error)
        })

        let saldo = 0

        await obtener_saldo_usuario(operacion.id_bene).then(resultado=>{
            saldo = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el saldo del usuario: ', error)
        })

        let nuevoSaldoBene = parseFloat(saldo) + parseFloat(operacion.monto)
        await actualizar_saldo(operacion.id_bene, nuevoSaldoBene).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del beneficiario: ', error)
        })


        let proyecto = undefined
        await seleccionar_proyecto(clave.proyecto).then(resultado=>{
            proyecto = resultado[0]
        }).catch(error=>{
            throw('Error al buscar el proyecto', error)
        })

        enviarCorreo({
            email: email,
            asunto: 'Asignación de viaticos',
            texto: 'Asignación de viaticos',
            cuerpo: `
                <p>Hola ${operacion.beneficiario}, se te ha hecho una asignación de viaticos por un monto de $${operacion.monto} para el proyecto ${proyecto.nombre}
                puedes encontrar el movimiento con la siguiente clave: ${clave.clave}.</p>
                <p>Se anexa el comprobante del movimiento en el siguiente enlace: <a href='${operacion.enlace}'>Clic aqui para ver el comprobante.</a></p>
            `
        })

        res.redirect('/viaticos/administrar')
        return next() 
    } catch (error) {
        console.log(error)
        return next()
    }
}
const assignViaticosProyecto = async(req, res, next)=>{
    try {
        const ruta = calculateRutaProy(req.body.cliente, req.body.ubicacion, req.body.proyecto, req.body.flag, req.body.permisos)
        const fecha = new Date()
        const fechaHoy = formatoFecha(fecha, 'yymmddhhnnss')

        const clave = {
            proyecto: req.body.proyecto,
            clave: `${req.body.id_bene}VIATICOS${fechaHoy}${req.body.proyecto}`,
            monto: req.body.monto,
            fecha: req.body.fecha,
            usuario: req.body.id_bene,
            uso: req.body.uso
        }
        const operacion = {
            tipo_operacion: 1,
            id_bene: req.body.id_bene,
            beneficiario: req.body.beneficiario,
            emisor: req.body.emisor,
            enlace: req.body.enlace, 
            concepto: req.body.concepto,
            clave: 0,
            fecha: req.body.fecha,
            monto: req.body.monto
        }

        await registrar_clave(clave).catch(error=>{
            throw('Ha ocurrido un error al registrar la clave para el movimiento: ', error)
        });

        await obtener_clave(clave.clave).then(resultado=>{
            operacion.clave = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la clave del movimiento recien registrado: ', error)
        })
        await registrar_operacion(operacion).catch(error=>{
            throw('Ha ocurrido un error al registrar correctamente la operación: ', error)
        });
        let saldo = 0
        await obtener_saldo_usuario(operacion.id_bene).then(resultado=>{
            saldo = resultado + parseFloat(operacion.monto)
        })
        await actualizar_saldo(operacion.id_bene, saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del usuario: ', error)
        });
        res.redirect(ruta)
        return next() 
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteDepositoAdministrador = async(req, res, next)=>{
    try{
        const clave = req.query.clave
        const deposito = req.query.deposito
        const beneficiario = req.query.bene
        const monto =  parseFloat(req.query.monto)

        let comprobado = false

        await validar_comprobantes_deposito(clave).then(resultado=>{
            comprobado = resultado
        }).catch(error=>{
            throw('No se ha podido validar si el movimiento ya esta comprobado: ', error)
        })

        if(comprobado){
            res.redirect('/viaticos/administrar')
            return next()
        }

        await eliminar_deposito(deposito).catch(error=>{
            throw('Ha ocurrido un error al eliminar el deposito: ', error)
        })

        await eliminar_clave(clave).catch(error=>{
            throw('Ha ocurrido un error al eliminar la clave: ', error)
        })

        let saldo = 0
        await obtener_saldo_usuario(beneficiario).then(resultado=>{
            saldo = parseFloat(resultado) - monto;
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el saldo del usuario: ', error)
        })

        await actualizar_saldo(beneficiario, saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del usuario: ', error)
        })

        res.redirect('/viaticos/administrar')
        return  next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteComprobanteAdministrador = async(req, res, next)=>{
    try {
        const datos = {
            comprobante: req.query.comprobante,
            emisor: req.query.emisor,
            monto: req.query.monto
        }

        await eliminar_operacion(datos.comprobante).catch(error=>{
            throw("Ha ocurrido un error eliminando la operación", error)
        })
        let saldo = 0 
        await obtener_saldo_usuario(datos.emisor).then(resultado=>{
            saldo = parseFloat(datos.monto) + parseFloat(resultado)
        })
        
        await actualizar_saldo(datos.emisor, saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del usuario: ', error)
        })
        
        res.redirect('/viaticos/administrar')
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteComprobante = async(req, res, next)=>{
    try {
        await eliminar_operacion(req.query.folio).catch(error=>{
            throw('Ha ocurrido un error al eliminar la operación seleccionada: ', error)
        })

        const saldo = parseFloat(req.query.saldo) + parseFloat(req.query.monto)
        await actualizar_saldo(req.query.usuario, saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del usuario: ', error)
        })

        const ruta = `/viaticos/admin_personal?usuario=${req.query.usuario}` 
        res.redirect(ruta)
        return next()
    } catch (error) {
        console.log(error)
        return next
    }
}
const deleteComprobanteClavePer = async(req, res, next)=>{
    try {

        await eliminar_operacion(req.query.folio).catch(error=>{
            throw('Ha ocurrido un error al eliminar la operación seleccionada: ', error)
        })
        const saldo = parseFloat(req.query.saldo) + parseFloat(req.query.monto)
        await actualizar_saldo(req.query.usuario, saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del usuario: ', error)
        })

        const ruta = `/viaticos/claves_personal?usuario=${req.query.usuario}&clave=${req.query.clave}` 
        res.redirect(ruta)
        return next()

    } catch (error) {
        console.log(error)
        return next
    }
}
const deleteComprobanteClaveGrl = async(req, res, next)=>{
    try {
        const emisor = req.query.emisor
        const monto = parseFloat(req.query.monto)
        const clave = req.query.clave

        let saldo_emisor = 0

        await obtener_saldo_usuario(emisor).then(resultado=>{
            saldo_emisor = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el saldo del usuario: ', error)
        })
        const nuevo_saldo = monto + parseFloat(saldo_emisor)

        await eliminar_operacion(req.query.folio).catch(error=>{
            throw('Ha ocurrido un error al eliminar la operacion: ', error)
        })

        await actualizar_saldo(emisor, nuevo_saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del error: ', error)
        })

        res.redirect(`/viaticos/claves?clave=${clave}`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteDepositoProyecto = async(req, res, next)=>{
    try {
        const clave = req.query.clave
        const deposito = req.query.deposito
        const beneficiario = req.query.bene
        const monto =  parseFloat(req.query.monto)
        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, req.query.proyecto, req.query.flag, req.query.permisos)

        //Validamos que no existan comprobaciones del deposito

        let hasComprobante = true

        await validar_comprobantes_deposito(clave).then(resultado=>{
            hasComprobante = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar los comprobantes del desposito: ', error)
        })

        if(hasComprobante){
            res.redirect(ruta)
            return next()
        }

        await eliminar_deposito(deposito).catch(error=>{
            throw('Ha ocurrido un error al eliminar el deposito: ', error)
        })

        await eliminar_clave(clave).catch(error=>{
            throw('Ha ocurrido un error al eliminar la clave del movimiento: ', error)
        })

        let saldo = 0
        await obtener_saldo_usuario(beneficiario).then(resultado=>{
            saldo = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el saldo del usuario: ', error)
        })

        let nuevoSaldo = parseFloat(saldo) - monto;
        if(nuevoSaldo < 0) nuevoSaldo = 0;

        await actualizar_saldo(beneficiario, nuevoSaldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del usuario: ', error)
        })

        res.redirect(ruta)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteComprobanteProyecto = async(req, res, next)=>{
    try {
        const comprobante = req.query.comprobante
        const emisor = req.query.emisor
        const monto =  parseFloat(req.query.monto)
        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, req.query.proyecto, req.query.flag, req.query.permisos)

        await eliminar_operacion(comprobante).catch(error=>{
            throw('Ha ocurrido un error al eliminar el comprobante de las operaciones: ', error)
        })
        let saldo = 0
        await obtener_saldo_usuario(emisor).then(resultado=>{
            saldo = monto + parseFloat(resultado)
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el saldo del usuario: ', error)
        })
        await actualizar_saldo(emisor, saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del usuario: ', error)
        })
        res.redirect(ruta)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setComprobante = async(req, res, next)=>{
    try {
        const data = {
            tipo_operacion: 2,
            beneficiario: req.body.beneficiario,
            emisor: req.body.emisor,
            enlace: req.body.file,
            concepto: req.body.concepto,
            clave: req.body.clave,
            fecha: req.body.fecha,
            monto: req.body.monto
        }

        await registrar_operacion(data).catch(error=>{
            throw('Ha ocurrido un error al registrar la operacion: ', error)
        })

        let saldo = 0

        await obtener_saldo_usuario(data.emisor).then(resultado=>{
            saldo = parseFloat(resultado) - parseFloat(data.monto)
        })

        await actualizar_saldo(data.emisor, saldo).catch(error=>{
            throw('Ha ocurrido un error al actualizar el saldo del emisor: ', error)
        })

        const ruta = `/viaticos/admin_personal?usuario=${data.emisor}` 
        res.redirect(ruta)
        return next() 
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setPresupuestoProyecto = async(req, res, next)=>{
    try {
        const proyecto = req.query.proyecto
        const presupuesto = req.query.presupuesto

        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, req.query.proyecto, req.query.flag, req.query.permisos)

        await definir_presupuesto_proyecto(presupuesto, proyecto).catch(error=>{
            throw('Ha ocurrido un error al definir el presupuesto del proyecto para los viáticos: ', error)
        })

        res.redirect(ruta)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    getEstadisticasViaticos,
    getDepositos,
    getComprobantes,
    getClaves,
    getClave,
    getComprobantesClave,
    getDepositosUsuario,
    getComprobacionesUsuario,
    getClavesUsuario,
    getClavesViewUsuario,
    selectLastMoves,
    assignViaticos,
    assignViaticosProyecto,
    deleteDepositoAdministrador,
    deleteComprobanteAdministrador,
    deleteComprobante,
    deleteComprobanteClavePer,
    deleteComprobanteClaveGrl,
    deleteDepositoProyecto,
    deleteComprobanteProyecto,
    setComprobante,
    setPresupuestoProyecto
}