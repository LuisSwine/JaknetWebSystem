import { enviarCorreo } from "../helpers/emails.js";
import { seleccionar_proyecto } from "../models/Proyecto.js";
import { asignar_rol_en_proyecto, eliminar_rol, seleccionar_rol, seleccionar_roles, validar_rol_usuario } from "../models/Rol.js";
import { validar_tareas_usuario } from "../models/Tarea.js";
import { seleccionar_usuario } from "../models/Usuario.js";

function calculateRuta(flag, ubicacion, cliente, proyecto, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0:
            //ruta = `proyectos/perfil?proyecto=${proyecto}&flag=0`;
            ruta = `proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=0`;
            break;
        case 1:
            ruta = `proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=1`;
            break;
        case 2:
            ruta = `proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=2`;
            break;
        case 3:
            ruta = `proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=3`;
            break;
        case 4:
            ruta = `proyectos/perfil?proyecto=${proyecto}&flag=4&permisos=${permisos}`;
            break;
    }
    return ruta
}

const getRoles = async(req, _, next)=>{
    try {
        await seleccionar_roles().then(resultado=>{
            req.roles = resultado
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al obtener las roles disponibles: ', error)
        })
    } catch (error) {
        console.log(error)
        return next();
    }
}
const setRolProyect = async(req, res, next) =>{
    try {

        //Recibimos la información necesaria
        const registro = {
            proyecto: req.body.proyecto,
            usuario: req.body.usuario,
            rol: req.body.rol
        }
        //Calculamos la ruta de regreso a la pantalla correspondiente
        let ruta = calculateRuta(req.body.flag, req.body.ubicacion, req.body.cliente, req.body.proyecto, req.body.permisos)
        
        //Instanciamos una variable boolena para verificar si el usuario ya tiene un rol en el proyecto
        let is_user_in_project = false

        await validar_rol_usuario(registro.usuario, registro.proyecto).then(resultado=>{
            is_user_in_project = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar la participación del usuario en el proyecto: ', error)
        })

        if(!is_user_in_project){
            await asignar_rol_en_proyecto(registro).then(_=>{
                res.redirect(`/${ruta}`)
                return next() 
            }).catch(error=>{
                throw('Ha ocurrido un error asignando al usuario al prpoyecto: ', error)
            })

            //Notificamos por correo al usuario de que fue asignado al proyecto
            let usuario = undefined
            let proyecto = undefined
            let rol = undefined

            await seleccionar_usuario(registro.usuario).then(resultado=>{
                usuario = resultado[0]
            }).catch(error=>{
                throw('Error al buscar el usuario', error)
            })
            await seleccionar_proyecto(registro.proyecto).then(resultado=>{
                proyecto = resultado[0]
            }).catch(error=>{
                throw('Error al buscar el proyecto', error)
            })
            await seleccionar_rol(registro.rol).then(resultado=>{
                rol = resultado[0].rol
            }).catch(error=>{
                throw('Error al obtener el nombre del rol', error)
            })

            //En caso exitoso envíamos un email al usuario afectado para notificar el cambio de contraseña
            enviarCorreo({
                email: usuario.email,
                asunto: 'Has sido asignado a un proyecto',
                texto: 'Has sido asignado a un proyecto',
                cuerpo: `
                    <p>Hola ${usuario.nombres}, se te ha asignado al proyecto ${proyecto.nombre} con el rol de ${rol}
                    puedes consultar los detalles del proyecto en la sección de 'Mis Proyectos'.</p>
                    <p>Servicios ERP de Jaknet.</p>
                `
            })

        }else{
            res.render('Error/redirect', {
                alert: true,
                alertTitle: 'ERROR',
                alertMessage: 'Este usuario ya tiene un rol asignado en este proyecto',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 8000,
                ruta: ruta
            })
            return next()
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteRol = async(req, res, next)=>{
    try {
        const ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto, req.query.permisos)
        
        let usuarioHasTasks = true

        await validar_tareas_usuario(req.query.usuario, req.query.proyecto).then(resultado=>{
            usuarioHasTasks = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las tareas del usuario: ', error)   
        })

        if(usuarioHasTasks){
            res.render('Error/showInfo', {
                title: 'Rol con tareas asignadas',
                alert: true,
                alertTitle: 'INFORMACION',
                alertMessage: `El usuario con este rol tiene una tarea asignada, por lo que no se puede eliminar el rol`,
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 8000,
                ruta: `${ruta.replace('/', '')}`
            })
            return next()
        }

        await eliminar_rol(req.query.rol).catch(error=>{
            throw('Ha ocurrido un error al eliminar el rol del usuario: ', error)
        })

        res.redirect(`/${ruta}`) 
        return next()  
      
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    getRoles,
    setRolProyect,
    deleteRol
}