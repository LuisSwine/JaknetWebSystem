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
    eliminar_usuario,
    seleccionar_usuario_by_user,
    desbloquearUsuario,
    cambiar_saldo
} from '../models/Usuario.js'
import { mostrar_error, mostrar_mensaje_inicio } from '../helpers/funciones_simples.js'
import { enviarCorreo } from '../helpers/emails.js'

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
        const usuario = req.user

        conexion.query("SELECT * FROM proyectos_asistencia_view001 WHERE folio_usuario = ? AND (folio_estatus <> 4 OR folio_estatus <> 6)", [usuario.folio], (error, filas)=>{
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
const getUsuarios = async (req, _, next) => {
    try {
        await seleccionar_usuarios().then((resultado) => {
            req.usuarios = resultado;
            return next();
        }).catch((error) => {
            throw new Error('Error al obtener los usuarios: ', error);
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const getUsuario = async (req, _, next) => {
    try {
        await seleccionar_usuario(req.query.usuario).then((resultado) => {
            req.usuario = resultado;
            return next();
        }).catch((error) => {
            throw new Error('Error al obtener la información del usuario: ', error);
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};
const createUser = async(req, res, next)=>{
    try {
        const data = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            usuario: req.body.usuario,
            pass: undefined,
            telefono: req.body.telefono,
            email: req.body.email,
            documentacion: req.body.linkDoc,
            tipo_usuario: req.body.tipoUser    
        }
        //Primero verificamos que no exista ya un usuario con el mismo nombre de usuario
        let userNameExiste = true;
        await seleccionar_usuario_by_user(data.usuario).then(resultado=>{
            if (resultado.length === 0){
                userNameExiste = false
            }
        }).catch(error=>{
            throw('Ha ocurrido un error al buscar el nombre de usuario: ', error)
        })

        if (!userNameExiste){
            data.pass = await bcryptjs.hash(req.body.pass, 8)

            await crear_usuario(data).catch(error=>{
                res.redirect('/usuarios/adminusers')
                throw new Error('Error al registrar usuario: ', error)
            })    

            enviarCorreo({
                email: data.email,
                asunto: 'Confirmar nuevo usuario',
                texto: 'Confirmar nuevo usuario',
                cuerpo: `
                    <p>Hola ${data.nombres}, recientemente se ha creado un usuario para que formes parte del 
                    sistema de gestión de la empresa Jaknet. Bienvenid@.</p>
                    <p>Para acceder por favor ingresa al siguiente enlace: <a href="https://erp.jaknet.com.mx/login">ERP | JAKNET</a> para ingresar deberas ingresar lo sisguiente: </p>
                    <p>Usuario: ${data.usuario}</p>
                    <p>Contraseña: ${req.body.pass}</p>
                    <p>Una vez que hayas iniciado sesión dirigete al área de "Mi perfil" para que puedas cambiar tu contraseña por una que solo tu conozcas.</p>
                    <p>Bienvenid@ a Jaknet.</p>
                `
            })
        }else{
            mostrar_error(
                res,
                'El usuario ya existe',
                `El usuario ${data.usuario} ya tiene una cuenta`,
                'usuarios/adminusers'
            )
        }
        res.redirect('/usuarios/adminusers')
    } catch (error) {
        console.log(error)
    }
    return next()
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
const notifyRecoverPass = async(req, res, next)=>{
    try{
        //Recibimos el valor del usuario
        const usuario = req.query.user

        let flag = false
        //Primero validamos la existencia del usuario
        await seleccionar_usuario_by_user(usuario).then(resultado=>{
            if(resultado.length != 0){
                flag = true
            }
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información del usuario en la base de datos: ', error)
        })

        //Validamos
        if(flag == false){
            mostrar_mensaje_inicio(res, 'El usuario ingresado no existe, verifique el usuario y la contraseña antes de solicitar un restablecimiento', 'login', 'error', 15000)
        }else{
            //Si el usuario si existe entonces notificamos al administrador sobre la necesidad de cambio
            const correo_admin = 'luis.luis.la2002@gmail.com'
            console.log('Enviando email')
            enviarCorreo({
                email: correo_admin,
                asunto: 'Solicitud de restablecimiento de contraseña',
                texto: 'Solicitud de restablecimiento de contraseña',
                cuerpo: `
                <p>Estimado administrador. El usuario ${usuario} ha  solicitado un restablecimeinto de contraseña.</p>
                <p>Solicitamos de la manera más atenta, dar seguimiento a la petición lo antes posible.</p>
                <p>Servicios ERP de Jaknet.</p>
                `
            })
            mostrar_mensaje_inicio(res, 'Se ha solicitado el restablecimiento de contraseña de forma exitosa, favor de estar atento a su correo para ser notificado del cambio', 'login', 'success')
        }
        res.redirect( `/login`)
        return next()
    }catch(error){
        console.log(error)
        return next()
    }
}
const unlockUser = async(req, res, next)=>{
    try {
        //Recibimos los valores
        const usuario = req.query.folio
        const folioAdmin = req.query.folioAdmin
        const passAdmin = req.query.admin

        //Verificamos la contraseña del administrador
        let actual = ''
        //Obtenemos la contraseña actual del administrador para verificarla
        await get_password(folioAdmin).then(resultado=>{
            actual = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la contraseña seleccionada: ', error)
        })

        if(!(await bcryptjs.compare(passAdmin, actual))){
            //Si la contraseña del administrador es incorrecta
            showError(res, 'Error al restablecer la contraseña del usuario', 'La contraseña del administrador incorrecta, recuerde que debe ingresar su contraseña en el primer campo para dar validez al cambio', `/usuarios/adminusers`)
            return next()
        }else{
            //Si la contraseña es correcta entonces simplemente desbloqueamos al usuario
            let usuario_info = undefined
            await seleccionar_usuario(usuario).then(resultado=>{
                usuario_info = resultado[0]
            }).catch(error=>{
                throw('Error al buscar el usuario a desbloquear: ', error)
            })

            await desbloquearUsuario(usuario).catch(error=>{
                throw('Ha ocurrido un erro al actualizar el estatus del usuario: ', error)
            })

            enviarCorreo({
                email: usuario_info.email,
                asunto: 'Desbloqueo de cuenta',
                texto: 'Desbloqueo de cuenta',
                cuerpo: `
                    <p>Hola ${usuario_info.nombres}, se ha atendido su solicitud al administrador de desbloquear su cuenta.</p>
                    <p>Para acceder por favor ingresa al siguiente enlace: <a href="https://erp.jaknet.com.mx/login">ERP | JAKNET</a> para ingresar deberas ingresar tus credenciales de acceso.</p>
                    <p>Servicios ERP de Jaknet.</p>
                `
            })
        }
        res.redirect( `/usuarios/adminusers`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateContraUsuarioAdmin = async(req, res, next)=>{
    try {
        //Recibimos toda la información necesaria
        const folioUser = req.query.folioUser
        const folioAdmin = req.query.folioAdmin
        const admin = req.query.admin
        const nueva = req.query.nueva

        //Definimos una variable donde guardaremos la información de la contraseña actual
        let actual = ''

        //Obtenemos la contraseña actual del administrador para verificarla
        await get_password(folioAdmin).then(resultado=>{
            actual = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la contraseña seleccionada: ', error)
        })

        if(!(await bcryptjs.compare(admin, actual))){
            //Si la contraseña del administrador es incorrecta
            showError(res, 'Error al restablecer la contraseña del usuario', 'La contraseña del administrador incorrecta, recuerde que debe ingresar su contraseña en el primer campo para dar validez al cambio', `/usuarios/adminusers`)
            return next()
        }else{
            //En caso de que la contraeña del administrador sea correcta primero encriptamos la nueva contraseña del usuario
            let nuevaPass = await bcryptjs.hash(nueva, 8)
            //Ahora cambiamos la contraseña
            await cambiar_contra(folioUser, nuevaPass).catch(error=>{
                //TODO: Mejorar el manejo de errores en estos casos
                throw('Ha ocurrido un error al editar la contraseña del usuario: ', error)
            })

            let usuario = undefined
            await seleccionar_usuario(folioUser).then(resultado=>{
                usuario = resultado[0]
            }).catch(error=>{
                throw('Error al buscar el usuario a editar su contraseña', error)
            })

            //En caso exitoso envíamos un email al usuario afectado para notificar el cambio de contraseña
            enviarCorreo({
                email: usuario.email,
                asunto: 'Restablecimiento de contraseña',
                texto: 'Su contraseña se ha restablecido',
                cuerpo: `
                    <p>Hola ${usuario.nombres}, se ha atendido su solicitud al administrador de restablecer su contraseña.</p>
                    <p>Para acceder por favor ingresa al siguiente enlace: <a href="https://erp.jaknet.com.mx/login">ERP | JAKNET</a> para ingresar deberas ingresar lo sisguiente: </p>
                    <p>Usuario: ${usuario.usuario}</p>
                    <p>Contraseña: ${nueva}</p>
                    <p>Una vez que hayas iniciado sesión dirigete al área de "Mi perfil" para que puedas cambiar tu contraseña de nuevo por una que solo tu conozcas.</p>
                    <p>Servicios ERP de Jaknet.</p>
                `
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
const updateSaldoUsuario = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let saldo = req.query.saldo

        await cambiar_saldo(folio, saldo).then(_ =>{
            res.redirect(`/usuarios/adminusers`)
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
    notifyRecoverPass,
    getUsuarios,
    getUsuario,
    createUser,
    updateNombreUsuario,
    updateTelefonoUsuario,
    unlockUser,
    updateEmailUsuario,
    updateSaldoUsuario,
    updatePassUsuario,
    updateUsuario,
    updateContraUsuarioAdmin,
    deleteUsuario
}