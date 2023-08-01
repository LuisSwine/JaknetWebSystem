const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')
const formidable = require('formidable')
const { path } = require('pdfkit')
const { resolve } = require('path')

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

function registrar_clave(clave){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat021_claves_seguimiento SET ?', clave, (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}
function obtener_clave(clave){
    return new Promise ((resolve,reject)=>{
        conexion.query('SELECT * FROM cat021_claves_seguimiento WHERE clave = ?', [clave], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve(fila[0].folio);
            }
        })
    })
}
function registrar_operacion(operacion){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat022_operaciones SET ?', operacion, (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}
function obtener_saldo_usuario(usuario){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT saldo FROM cat001_usuarios WHERE folio = ?", [usuario], (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve(fila[0].saldo);
            }
        })
    })
}
function actualizar_saldo(usuario, saldo){
    return new Promise ((resolve,reject)=>{
        conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [saldo, usuario], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve()
            }
        })
    })
}
function validar_participacion(usuario, proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM roles_view001 WHERE proyecto = ? AND folio_usuario = ?", [proyecto, usuario], (error, fila)=>{
            if(error){
                throw error;
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function eliminar_operacion(operacion){
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", [operacion], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}

//VIATICOS A NIVEL PROYECTO
    exports.definirPresupuesto = async(req, res, next)=>{
        try {
            let proyecto = req.query.proyecto
            let presupuesto = req.query.presupuesto

            let ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, req.query.proyecto, req.query.flag, req.query.permisos)

            conexion.query("UPDATE cat009_proyectos SET presupuesto = ? WHERE folio = ?", [presupuesto, proyecto], (error, fila)=>{
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
    exports.assignViaticosProyect = async(req, res, next)=>{
        try {
            const ruta = calculateRutaProy(req.body.cliente, req.body.ubicacion, req.body.proyecto, req.body.flag, req.body.permisos)
            const fecha = new Date()
            const fechaHoy = formatoFecha(fecha, 'yymmddhhnnss')
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

            await registrar_clave(clave);
            operacion.clave = await obtener_clave(clave.clave);
            await registrar_operacion(operacion);
            let saldo = await obtener_saldo_usuario(operacion.id_bene)
            let nuevoSaldoBene = parseFloat(saldo) + parseFloat(operacion.monto)
            await actualizar_saldo(operacion.id_bene, nuevoSaldoBene);
            res.redirect(ruta)
            return next() 

        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteDepositoProyect = async(req, res, next)=>{
        try {
            const clave = req.query.clave
            const deposito = req.query.deposito
            const beneficiario = req.query.bene
            const monto =  parseFloat(req.query.monto)
            const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, req.query.proyecto, req.query.flag, req.query.permisos)

            //Validamos que no existan comprobaciones del deposito
            conexion.query("SELECT folio FROM viaticos_comprobaciones_view001 WHERE folio_clave = ?", [clave], (err, fila1)=>{
                if(err){
                    throw err
                }else{
                    if(fila1.length === 0){
                        //Si no existen comprobaciones eliminamos el deposito
                        conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", [deposito], (err2, fila2)=>{
                            if(err2){
                                throw err2
                            }else{
                                //Elinamos la clave de seguimiento
                                conexion.query("DELETE FROM cat021_claves_seguimiento WHERE folio = ?", [clave], (err5, fila5)=>{
                                    if(err5){
                                        throw err5
                                    }else{
                                        //Consultamos el saldo actual del beneficiario
                                        conexion.query("SELECT saldo FROM cat001_usuarios WHERE folio = ?", [beneficiario], (err3, fila3)=>{
                                            if(err3){
                                                throw err3
                                            }else{
                                                //Calculamos el nuevo saldo del beneficiario.
                                                let nuevoSaldo = parseFloat(fila3[0].saldo) - monto;
                                                if(nuevoSaldo < 0) nuevoSaldo = 0;
                                                //Editamos el saldo del beneficiario
                                                conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [nuevoSaldo, beneficiario], (err4, fila4)=>{
                                                    if(err4){
                                                        throw err4
                                                    }else{
                                                        res.redirect(ruta)
                                                        return next()
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }) 
                            }
                        })
                    }else{
                        res.redirect(ruta)
                        return next()
                    }
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteComprobanteProyecto = async(req, res, next)=>{
        try {
            const comprobante = req.query.comprobante
            const emisor = req.query.emisor
            const monto =  parseFloat(req.query.monto)
            const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, req.query.proyecto, req.query.flag, req.query.permisos)

            conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", [comprobante], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    conexion.query("SELECT saldo FROM cat001_usuarios WHERE folio = ?", [emisor], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            let nuevoSaldo = monto + parseFloat(fila2[0].saldo)
                            conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [nuevoSaldo, emisor], (error3, fila3)=>{
                                if(error3){
                                    throw error3
                                }else{
                                    res.redirect(ruta)
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
//FIN DE VIATICOS A NIVEL PROYECTO

//VIATICOS A NIVEL ADMINISTRACION
    exports.stadisticsViatics = async(req, res, next)=>{
        try {
            let datos = {
                depositado: 0,
                comprobado: 0
            }

            if(req.query.inicio && req.query.termino){
                conexion.query("SELECT SUM(monto) as suma_depositos FROM viaticos_depositos_view001 WHERE (fecha BETWEEN ? AND ?)", [req.query.inicio, req.query.termino],(error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        datos.depositado = 0 + fila[0].suma_depositos
                        conexion.query("SELECT SUM(monto) as suma_comprobaciones FROM viaticos_comprobaciones_view001 WHERE (fecha BETWEEN ? AND ?)", [req.query.inicio, req.query.termino], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                datos.comprobado = 0 + fila2[0].suma_comprobaciones
                                req.datos = datos;
                                return next()
                            }
                        })
                    }
                })
            }else{
                conexion.query("SELECT SUM(monto) as suma_depositos FROM viaticos_depositos_view001", (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        datos.depositado = 0 + fila[0].suma_depositos
                        conexion.query("SELECT SUM(monto) as suma_comprobaciones FROM viaticos_comprobaciones_view001", (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                datos.comprobado = 0 + fila2[0].suma_comprobaciones
                                req.datos = datos;
                                return next()
                            }
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectDepositos = async(req, res, next)=>{
        try {
            if(req.query.inicio && req.query.termino){
                conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [req.query.inicio, req.query.termino], (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.depositos = fila
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM viaticos_depositos_view001", (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.depositos = fila
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }

    exports.selectComprobaciones = async(req, res, next)=>{
        try {
            if(req.query.inicio && req.query.termino){
                conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [req.query.inicio, req.query.termino], (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.comprobaciones = fila
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM viaticos_comprobaciones_view001", (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.comprobaciones = fila
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }

    exports.assignViaticos = async(req, res, next)=>{
        try {
            const fechaHoy = formatoFecha(new Date(), 'yymmddhhnnss')
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

            let heParticipates = await validar_participacion(clave.usuario, clave.proyecto)
            if(!heParticipates){
                showError(res, 'No se pueden asignar viaticos', `No es posible asignarle viaticos al usuario ${clave.usuario} en el proyecto ${clave.proyecto} porque no tiene un rol asignado en el mismo`, 'viaticos/administrar')
            }

            await registrar_clave(clave);
            operacion.clave = await obtener_clave(clave.clave);

            await registrar_operacion(operacion);

            let saldo = await obtener_saldo_usuario(operacion.id_bene)
            let nuevoSaldoBene = parseFloat(saldo) + parseFloat(operacion.monto)
            await actualizar_saldo(operacion.id_bene, nuevoSaldoBene);

            res.redirect('/viaticos/administrar')
            return next() 
        } catch (error) {
            console.log(error)
            return next()
        }
    }

    exports.deleteComprobanteGrl = async(req, res, next)=>{
        try {
            let datos = {
                comprobante: req.query.comprobante,
                emisor: req.query.emisor,
                monto: req.query.monto
            }

            await eliminar_operacion(datos.comprobante)
            let saldo = await obtener_saldo_usuario(datos.emisor)
            let nuevoSaldo = parseFloat(datos.monto) + parseFloat(saldo)
            await actualizar_saldo(datos.emisor, nuevoSaldo)
            
            res.redirect('/viaticos/administrar')
            return next()
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteDepositoGrl = async(req, res, next)=>{
        try{
            const clave = req.query.clave
            const deposito = req.query.deposito
            const beneficiario = req.query.bene
            const monto =  parseFloat(req.query.monto)

            //Validamos que no existan comprobaciones del deposito
            conexion.query("SELECT folio FROM viaticos_comprobaciones_view001 WHERE folio_clave = ?", [clave], (err, fila1)=>{
                if(err){
                    throw err
                }else{
                    if(fila1.length === 0){
                        //Si no existen comprobaciones eliminamos el deposito
                        conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", [deposito], (err2, fila2)=>{
                            if(err2){
                                throw err2
                            }else{
                                //Elinamos la clave de seguimiento
                                conexion.query("DELETE FROM cat021_claves_seguimiento WHERE folio = ?", [clave], (err5, fila5)=>{
                                    if(err5){
                                        throw err5
                                    }else{
                                        //Consultamos el saldo actual del beneficiario
                                        conexion.query("SELECT saldo FROM cat001_usuarios WHERE folio = ?", [beneficiario], (err3, fila3)=>{
                                            if(err3){
                                                throw err3
                                            }else{
                                                //Calculamos el nuevo saldo del beneficiario.
                                                let nuevoSaldo = parseFloat(fila3[0].saldo) - monto;
                                                if(nuevoSaldo < 0) nuevoSaldo = 0;
                                                //Editamos el saldo del beneficiario
                                                conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [nuevoSaldo, beneficiario], (err4, fila4)=>{
                                                    if(err4){
                                                        throw err4
                                                    }else{
                                                        res.redirect('/viaticos/administrar')
                                                        return next()
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }) 
                            }
                        })
                    }else{
                        res.redirect('/adminViaticosGrl')
                        return next()
                    }
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DE VIATICOS A NIVEL ADMINISTRACION

//VIATICOS A NUVEL PERSONAL
    exports.selectDepositosUsuario = async(req, res, next)=>{
        try {
            if(req.query.inicio && req.query.termino){
                conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE id_bene = ? AND (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [req.query.usuario, req.query.inicio, req.query.termino], (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.depositos = fila
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE id_bene = ?", [req.query.usuario], (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.depositos = fila
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectComprobacionesUsuario = async(req, res, next)=>{
        try {
            if(req.query.inicio && req.query.termino){
                conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE folio_emisor = ? AND (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [req.query.usuario, req.query.inicio, req.query.termino], (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.comprobaciones = fila
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE folio_emisor = ? ORDER BY folio DESC", [req.query.usuario], (error, fila)=>{
                    if(error){
                        throw error
                    }else{
                        req.comprobaciones = fila
                        return next()
                    }
                })
            }
            
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectClavesUsuario = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM cat021_claves_seguimiento WHERE usuario = ? ORDER BY folio DESC", [req.query.usuario], (err, fila)=>{
                if(err){
                    throw err
                }else{
                    req.claves = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next
        }
    }




    exports.loadTicket = async(req, res, next)=>{
        try {
            let data = {
                tipo_operacion: 2,
                beneficiario: req.body.beneficiario,
                emisor: req.body.emisor,
                enlace: req.body.file,
                concepto: req.body.concepto,
                clave: req.body.clave,
                fecha: req.body.fecha,
                monto: req.body.monto
            }

            conexion.query("INSERT INTO cat022_operaciones SET ?", [data], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    conexion.query("SELECT saldo FROM cat001_usuarios WHERE folio = ?", [data.emisor], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            let nuevoSaldo = parseFloat(fila2[0].saldo) - parseFloat(data.monto)
                            if(nuevoSaldo < 0) nuevoSaldo = 0;
                            conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [nuevoSaldo, data.emisor], (error3, fila3)=>{
                                if(error3){
                                    throw error3
                                }else{
                                    let ruta = `/viaticos/admin_personal?usuario=${data.emisor}` 
                                    res.redirect(ruta)
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





    exports.deleteComprobante = async(req, res, next)=>{
        try {
            conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", [req.query.folio], (err, fila)=>{
                if(err){
                    throw err
                }else{
                    let nuevoSaldo = parseFloat(req.query.saldo) + parseFloat(req.query.monto)
                    conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [nuevoSaldo, req.query.usuario], (err2, fila2)=>{
                        if(err2){
                            throw err2
                        }else{
                            let ruta = `/viaticos/admin_personal?usuario=${req.query.usuario}` 
                            res.redirect(ruta)
                            return next()
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next
        }
    }