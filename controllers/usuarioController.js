import conexion from '../database/db.js'
import bcryptjs from 'bcryptjs'

import { 
    seleccionar_usuarios, 
    crear_usuario, 
    cambiar_nombre, 
    cambiar_telefono, 
    cambiar_email, 
    get_password, 
    cambiar_contra, 
    seleccionar_usuario,
    editar_usuario,
    checkAsistencias,
    checkMaterial,
    checkMovimientos,
    checkOperaciones,
    checkReportes,
    checkRoles,
    checkTareas,
    checkViaticos,
    eliminar_usuario
} from '../models/Usuario.js'
import { mostrar_error } from '../helpers/funciones_simples.js'

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

const proyectosAsistencia = async(req, _, next)=>{
    try {
        conexion.query("SELECT * FROM proyectos_asistencia_view001 WHERE folio_usuario = ? AND (folio_estatus <> 4 OR folio_estatus <> 6)", [req.query.folio], (error, filas)=>{
            if(error){
                throw error
            }else{
                req.proyectosAsist = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getUsuarios = async(req, _, next)=>{
    try {
        await seleccionar_usuarios().then(resultado =>{
            req.usuarios = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener los usuarios: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getUsuario = async(req, _, next)=>{
    try {
        await seleccionar_usuario(req.query.usuario).then(resultado=>{
            req.usuario = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createUser = async(req, res, next)=>{
    try {
        const passHash = await bcryptjs.hash(req.body.pass, 8)

        let data = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            usuario: req.body.usuario,
            pass: passHash,
            telefono: req.body.telefono,
            email: req.body.email,
            documentacion: req.body.linkDoc,
            tipo_usuario: req.body.tipoUser    
        }
        await crear_usuario(data).then(_ =>{
            res.redirect('/usuarios/adminusers')
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al registrar usuario: ', error)
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateUsuario = async(req, res, next)=>{
    try {
        const folio           = req.body.folio
        const nombres         = req.body.nombres 
        const apellidos       = req.body.apellidos
        const telefono        = req.body.telefono
        const email           = req.body.email
        const documentacion   = req.body.documentacion

        await editar_usuario(nombres, apellidos, telefono, email, documentacion, folio).catch(error=>{
            throw('Ha ocurrido un error al editar al usuario seleccionado: ', error)
        })
        res.redirect('/usuarios/adminusers') 
    } catch (error) {
        console.log(error)
    }
    return next()
}
const updateContraUsuarioAdmin = async(req, res, next)=>{
    try {
        const folioUser = req.query.folioUser
        const folioAdmin = req.query.folioAdmin
        const admin = req.query.admin
        const nueva = req.query.nueva

        let actual = ''

        await get_password(folioAdmin).then(resultado=>{
            actual = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la contraseña seleccionada: ', error)
        })
        if(!(await bcryptjs.compare(admin, actual))){
            showError(res, 'Error al cambiar', 'Contraseñas de Administrador Incorrecta', `/usuarios/adminusers`)
            return next()
        }else{
            let nuevaPass = await bcryptjs.hash(nueva, 8)
            await cambiar_contra(folioUser, nuevaPass).catch(error=>{
                throw('Ha ocurrido un error al editar la contraseña del usuario: ', error)
            })
        }

        res.redirect( `/usuarios/adminusers`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteUsuario = async(req, res, next)=>{
    try {
        const usuario = req.query.usuario

        let hasViaticos = null
        await checkViaticos(usuario).then(resultado=>{
            hasViaticos = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Viaticos: ', error)
        })
        let hasOperaciones = null
        await checkOperaciones(usuario).then(resultado=>{
            hasOperaciones = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Operaciones: ', error)
        })
        let hasReportes = null
        await checkReportes(usuario).then(resultado=>{
            hasReportes = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Reportes: ', error)
        })
        let hasRoles = null
        await checkRoles(usuario).then(resultado=>{
            hasRoles = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Roles: ', error)
        })
        let hasAsistencias = null
        await checkAsistencias(usuario).then(resultado=>{
            hasAsistencias = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Asistencias: ', error)
        })
        let hasMaterial = null
        await checkMaterial(usuario).then(resultado=>{
            hasMaterial = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Material: ', error)
        })
        let hasTareas = null
        await checkTareas(usuario).then(resultado=>{
            hasTareas = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Tareas: ', error)
        })
        let hasMovimientos = null
        await checkMovimientos(usuario).then(resultado=>{
            hasMovimientos = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al realizar la validacion de Movimientos: ', error)
        })
        if(!hasViaticos || !hasOperaciones || !hasReportes || !hasRoles || !hasAsistencias || !hasMaterial || !hasMovimientos || !hasTareas){
            showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario}`, 'usuarios/adminusers')
            return next()
        }

        await eliminar_usuario(usuario).catch(error=>{
            throw ('Error al eliminar el usuario', error)
        })

        res.redirect('/usuarios/adminusers')
        return next()
        
    } catch (error) {
        console.log(error)
        return next()
    }
}

//MI PERFIL
const updateNombreUsuario = async(req, res, next)=>{
    try {
        const folio = req.query.folio
        const nombre = req.query.nombre
        const apellido = req.query.apellido

        await cambiar_nombre(folio, nombre, apellido).then(_ =>{
            res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        }) 
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateTelefonoUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let telefono = req.query.telefono

        await cambiar_telefono(folio, telefono).then(_ =>{
            res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateEmailUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let email = req.query.email

        await cambiar_email(folio, email).then(_ =>{
            res.redirect(`/usuarios/miPerfil?usuario=${folio}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updatePassUsuario = async(req, res, next)=>{
    try {
        const folio = req.query.folio
        const actual = req.query.actual
        const nueva = req.query.nueva

        let contra_consultada = ''

        await get_password(folio).then(result =>{
            contra_consultada = result
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al editar usuario: ', error)
        })
        
        if(!(await bcryptjs.compare(actual, contra_consultada))){
            mostrar_error(res, 'Error al cambiar', 'Contraseñas Actuales no coinciden', `/miPerfil?usuario=${folio}`)
            return next()
        }else{
            const nuevaPass = await bcryptjs.hash(nueva, 8)
            await cambiar_contra(folio, nuevaPass).then(_ =>{
                res.redirect( `/usuarios/miPerfil?usuario=${folio}`)
                return next()
            })
            .catch(error=>{
                //TODO: MEJORAR LA GESTION DE LOS ERRORES
                throw new Error('Error al editar usuario: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    proyectosAsistencia,
    getUsuarios,
    getUsuario,
    createUser,
    updateNombreUsuario,
    updateTelefonoUsuario,
    updateEmailUsuario,
    updatePassUsuario,
    updateUsuario,
    updateContraUsuarioAdmin,
    deleteUsuario
}