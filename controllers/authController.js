import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import conexion from '../database/db.js'
import { formatear_fecha, mostrar_error, mostrar_mensaje_inicio } from '../helpers/funciones_simples.js'

//MODULO #0 - INICIO DE SESION
const login = async(req, res)=>{
    try {
        //Recibimos los valores del formulario y los almacenamos en constantes
        const user = req.body.user
        const pass = req.body.pass

        if(!user || !pass) mostrar_mensaje_inicio(res, 'No puede dejar campos en blanco', 'login')
        else{
            conexion.query('SELECT * FROM cat001_usuarios WHERE usuario = ?', user, async(error, results)=>{
                if(error) {
                    console.log(error)
                }else{
                    if(results.length == 0 || !(await bcrypt.compare(pass, results[0].pass))) mostrar_mensaje_inicio(res, 'Usuario y/o contraseña incorrecta', 'login', 'error')
                    else{
                        const id = results[0].folio

                        const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, { expiresIn: process.env.JWT_TIEMPO_EXPIRA }) 
                            
                        const cookiesOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookiesOptions)

                        mostrar_mensaje_inicio(res, '¡INICIO DE SESION EXITOSO!', `?folio=${id}`, 'success')
                    }
                }
                    
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const isAuthenticated = async(req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM cat001_usuarios WHERE folio = ?', [decode.id], (error, results)=>{
                if(error){
                    mostrar_mensaje_inicio(res, 'Debe iniciar sesion', 'login', 'info')
                }
                else{    
                    if(!results){return next()}
                    req.user = results[0]
                    return next()
                }
            })
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // El token ha expirado
                mostrar_mensaje_inicio(res, 'El token ha expirado, inicie sesión nuevamente', 'login', 'info');
            }else{
                return next()
            }
        } 
    }else{
        mostrar_mensaje_inicio(res, 'Debe iniciar sesion', 'login', 'info')
    }
}
const logout = (_, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}

export {
    login,
    isAuthenticated,
    logout
}

/* 

    

//CRUD PARA USUARIOS (Procesos de Admin y SuperAdmin)
    //Select de todos los usuarios
    
    //Select de un solo usuario
    

    //Crear usuario
    
    export asyncfunction     editUser(req, res, next){
        try {
            let folio           = req.body.folio
            let nombres         = req.body.nombres 
            let apellidos       = req.body.apellidos
            let telefono        = req.body.telefono
            let email           = req.body.email
            let documentacion   = req.body.documentacion

            let sql = "UPDATE cat001_usuarios SET nombres = ?, apellidos = ?, telefono = ?, email = ?, documentacion = ? WHERE folio = ?"

            _query(sql, [nombres, apellidos, telefono, email, documentacion, folio], function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect('/usuarios/adminusers')
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }

function checkViaticos(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM cat021_claves_seguimiento WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
function checkOperaciones(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM cat022_operaciones WHERE id_bene = ? OR emisor = ?', [usuario, usuario], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
function checkReportes(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM op004_reporte WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
function checkRoles(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM op005_roles WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
function checkAsistencias(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM op006_asistencia WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
function checkMaterial(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM op013_material_usuario WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
function checkTareas(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM op014_tarea_usuario WHERE usuario = ?', usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}
function checkMovimientos(usuario){
    return new Promise((resolve, reject)=>{
        _query('SELECT folio FROM op016_movimientos_inventario WHERE usuario_registra = ?', usuario, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })    
}

    export async function     deleteUser(req, res, next){
        try {
            const usuario = req.query.usuario

            let hasViaticos = await checkViaticos(usuario)
            let hasOperaciones = await checkOperaciones(usuario)
            let hasReportes = await checkReportes(usuario)
            let hasRoles = await checkRoles(usuario)
            let hasAsistencias = await checkAsistencias(usuario)
            let hasMaterial = await checkMaterial(usuario)
            let hasTareas = await checkTareas(usuario)
            let hasMovimientos = await checkMovimientos(usuario)
            if(!hasViaticos || !hasOperaciones || !hasReportes || !hasRoles || !hasAsistencias || !hasMaterial || !hasMovimientos || !hasTareas){
                showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario}`, 'usuarios/adminusers')
                return next()
            }

            _query('DELETE FROM cat001_usuarios WHERE folio = ?', usuario, (error, fila)=>{
                if(error){
                    throw error
                }else{
                    res.redirect('/usuarios/adminusers')
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DEL CRUD PARA LA GESTION DE USUARIOS



//CRUD DEL INVENTARIO
    
    export asyncfunction     selectInventItem(req, res, next){
        try {
            _query("SELECT * FROM inventario_view001 WHERE folio = ?", [req.params.folio], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.item = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    
    
//FIN DEL CRUD DE INVENTARIO

//CRUD DE VIATICOS
    export asyncfunction     selectViaticos(req, res, next){
        try {
            _query("SELECT * FROM operaciones_viaticos001", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.operaciones = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DEL CRUD DE VIATICOS

//CRUD DE PROYECTOS
    
    export asyncfunction     createProject(req, res, next){
        try {
            let data = {
                nombre: req.body.nombre,
                ubicacion: req.body.ubicacion,
                galeria: req.body.galeria,
                documentacion: req.body.documentacion,
                estatus: req.body.estatus
            }

            let posibleRuta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}`
            if(req.body.flag == 1){ 
                posibleRuta = `/clientes/administrar?cliente=${req.body.cliente}`
            }else if(req.body.flag == 2){
                posibleRuta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}&cliente=${req.body.cliente}&flag=1`
            }else if(req.body.flag == 0){
                posibleRuta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}&flag=0`
            }

            let insert = "INSERT INTO cat009_proyectos SET ?"
            _query(insert, data, function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect(posibleRuta)
                    return next() 
                } 
            })    
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    

//ETAPAS
    
    
//FIN ETAPAS

//ROL
    
    export asyncfunction     selectRoles(req, res, next){
        try {
            _query("SELECT * FROM cat011_roles_proyecto", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.roles = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    export asyncfunction     selectContactsProyect(req, res, next){
        try {
            //Primero obtenemos la ubicacion del proyecto
            _query(, [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    _query(, [fila[0].ubicacion], (err, result)=>{
                        if(err){
                            throw err;
                        }else{
                            req.contactos = result;
                            return next();
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DE ROLES

//VIATICOS PROYECTO
    export asyncfunction     datosViaticosProyectos(req, res, next){
        try {
            let proyecto  = req.query.proyecto
            let datos = {
                gastado: 0,
                comprobado: 0
            }
            _query("SELECT SUM(monto) as suma_depositos FROM viaticos_depositos_view001 WHERE proyecto = ?", [proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    datos.gastado = 0 + fila[0].suma_depositos
                    _query("SELECT SUM(monto) as suma_comprobado FROM viaticos_comprobaciones_view001 WHERE proyecto = ?", [proyecto], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            datos.comprobado = 0 + fila2[0].suma_comprobado
                            req.datos = datos
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
    export asyncfunction     selectDepositosProyecto(req, res, next){
        try {
            _query("SELECT * FROM viaticos_depositos_view001 WHERE proyecto = ?", [req.query.proyecto], (error, fila)=>{
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
    export asyncfunction     selectComprobacionesProyecto(req, res, next){
        try {
            _query("SELECT * FROM viaticos_comprobaciones_view001 WHERE proyecto = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.comprobaciones = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    
//CLAVES DE SEGUIMIENTO
    
    
    
    
    
    
    

//ASISTENCIAS POR USUARIO
    export asyncfunction     reporteAsistencia(req, res, next){
        try {
            _query("SELECT * FROM reporte_asistencia_view001 WHERE folio_usuario = ?", [req.query.usuario], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.asistencias = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    export asyncfunction     reporteGeneralAsistencia(req, res, next){
        try {
            if(req.query.inicio && req.query.termino){
                _query("SELECT * FROM reporte_asistencia_view001 WHERE (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [req.query.inicio, req.query.termino], (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.asistencias = filas
                        return next()
                    }
                })
            }else{
                _query("SELECT * FROM reporte_asistencia_view001 ORDER BY folio DESC", (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.asistencias = filas
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return  next()
        }
    } */