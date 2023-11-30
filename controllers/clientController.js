import { 
    seleccionar_clientes, 
    seleccionar_cliente, 
    seleccionar_servicios, 
    seleccionar_tipos_cliente, 
    crear_cliente,
    actualizar_tipo,
    actualizar_servicio,
    actualizar_nombre, 
    validar_contactos_cliente,
    validar_ubicaciones_cliente,
    eliminar_cliente
} from '../models/Cliente.js';
import { eliminar_proyecto, validar_asistencia_proyecto, validar_claves_proyecto, validar_etapas_proyecto, validar_material_proyecto, validar_presupuesto_proyecto, validar_roles_proyecto } from '../models/Proyecto.js';
import { eliminar_ubicacion, validar_areas_ubicacion, validar_contactos_ubicacion, validar_proyectos_ubicacion } from '../models/Ubicacion.js';

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

const getClientes = async(req, _, next) =>{
    try {
        await seleccionar_clientes().then(resultado =>{
            req.clientes = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener los clientes: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getServicios = async(req, _, next) =>{
    try {
        await seleccionar_servicios().then(resultado =>{
            req.servicios = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener los servicios: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createClient = async(req, res, next) =>{
    try {
        let cliente = {
            nombre: req.body.nombre,
            tipo_cliente: req.body.tipo_cliente,
            tipo_servicio: req.body.tipo_servicio
        }
        await crear_cliente(cliente).then(_ =>{
            res.redirect('/clientes/gestionar')
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al registrar el cliente: ', error)
        })  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getCliente = async(req, res, next) =>{
    try {
        const cliente = req.query.cliente
        await seleccionar_cliente(cliente).then(resultado =>{
            req.cliente = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener el cliente solicitado: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getTiposCliente = async(req, res, next) =>{
    try {
        await seleccionar_tipos_cliente().then(resultado =>{
            req.tipos = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener los tipos de cliente: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateTipo = async(req, res, next)=>{
    try {
        await actualizar_tipo(req.query.tipo, req.query.cliente).then(_ =>{
            res.redirect(`/clientes/administrar?cliente=${req.query.cliente}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al actualizar el tipo de cliente: ', error)
        })
    } catch (error) {
        console.log(error)
        return next
    }
}
const updateServicio = async(req, res, next)=>{
    try {
        await actualizar_servicio(req.query.servicio, req.query.cliente).then(_ =>{
            res.redirect(`/clientes/administrar?cliente=${req.query.cliente}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al actualizar el tipo de cliente: ', error)
        })
    } catch (error) {
        console.log(error)
        return next
    }
}
const updateNombre = async(req, res, next)=>{
    try {
        await actualizar_nombre(req.query.nombre, req.query.cliente).then(_ =>{
            res.redirect(`/clientes/administrar?cliente=${req.query.cliente}`)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al actualizar el nombre de cliente: ', error)
        })
    } catch (error) {
        console.log(error)
        return next
    }
}
const deleteCliente = async(req, res, next) =>{
    try {
        const cliente = req.query.cliente
        let validar_contactos, validar_ubicaciones = null
        await validar_contactos_cliente(cliente).then(resultado=>{
            validar_contactos = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar los contactos del cliente: ', error)
        })
        await validar_ubicaciones_cliente(cliente).then(resultado=>{
            validar_ubicaciones = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las ubicaciones del cliente: ', error)
        })

        if(!validar_contactos && !validar_ubicaciones){
            await eliminar_cliente(cliente).catch(error=>{
                throw('Ha ocurrido un error al eliminar el cliente: ', error)
            })
            res.redirect('/clientes/gestionar')
        }else{
            showError(res, 'ERROR Eliminando al Cliente', `No se ha podido eliminar al cliente ${cliente}, porque tiene ubicaciones o contactos registrados`, 'clientes/gestionar')             
        }
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteUbicacionCliente = async(req, res, next)=>{
    try {
        const ubicacion = req.query.ubicacion
        const ruta = `clientes/administrar?cliente=${req.query.cliente}`
        let ubi_has_areas, ubi_has_proys, ubi_has_contacts = null
        
        await validar_areas_ubicacion(ubicacion).then(resultado=>{
            ubi_has_areas = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las areas asociadas a la ubicación: ', error)
        })
        await validar_proyectos_ubicacion(ubicacion).then(resultado=>{
            ubi_has_proys = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar los proyectos asociados a la ubicación: ', error)
        })
        await validar_contactos_ubicacion(ubicacion).then(resultado=>{
            ubi_has_contacts = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar los contactos asociados a la ubicación: ', error)
        })

        if(ubi_has_areas || ubi_has_proys || ubi_has_contacts){
            showError(res, 'No se ha podido eliminar la ubicacion', `La ubicacion ${ubicacion} tiene areas, proyectos o contactos registrados`, ruta)
            return next()
        }

        await eliminar_ubicacion(ubicacion).catch(error=>{
            throw('Ha ocurrido un error al eliminar la ubicación: ', error)
        })
        res.redirect(`/${ruta}`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteProyectoCliente = async(req, res, next)=>{
    try {
        const proyecto = req.query.proyecto
        const ruta = `clientes/administrar?cliente=${req.query.cliente}`

        let proy_has_claves, proy_has_etapas, proy_has_roles, proy_has_asistencias, proy_has_material, proy_has_presupuesto = null

        await validar_claves_proyecto(proyecto).then(resultado=>{
            proy_has_claves = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las claves del proyecto: ', error)
        })
        await validar_etapas_proyecto(proyecto).then(resultado=>{
            proy_has_etapas = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las etapas del proyecto: ', error)
        })
        await validar_roles_proyecto(proyecto).then(resultado=>{
            proy_has_roles = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar los roles del proyecto: ', error)
        })
        await validar_asistencia_proyecto(proyecto).then(resultado=>{
            proy_has_asistencias = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar las asistencias del proyecto: ', error)
        })
        await validar_material_proyecto(proyecto).then(resultado=>{
            proy_has_material = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar los materiales del proyecto: ', error)
        })
        await validar_presupuesto_proyecto(proyecto).then(resultado=>{
            proy_has_presupuesto = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar el presupuesto del proyecto: ', error)
        })

        if(proy_has_asistencias || proy_has_claves || proy_has_etapas || proy_has_material || proy_has_presupuesto || proy_has_roles){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya ha comenzado a trabajarse, verifique el presupuesto, los roles, las etapas, las asistencias, el maetiral o los viaticos de este proyecto`, ruta)
            return next()
        }

        await eliminar_proyecto(proyecto).catch(error=>{
            throw ('Error al borrar el proyecto', error)
        })

        res.redirect(`/${ruta}`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
export {
    getClientes,
    getServicios,
    createClient,
    getCliente,
    getTiposCliente,
    updateTipo,
    updateServicio,
    updateNombre,
    deleteCliente,
    deleteUbicacionCliente,
    deleteProyectoCliente
}
