import { seleccionar_contactos_cliente, seleccionar_contactos_ubicaciones, crear_contacto, seleccionar_contacto, editar_contacto, verificar_contacto_ubicacion, asignar_contacto_a_ubicacion, eliminar_relacion_contacto_ubicacion, validar_contacto_ubicacion, eliminar_contacto } from "../models/Contacto.js";
import { seleccionar_ubicacion_proyecto } from "../models/Proyecto.js";

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
const getContactos = async(req, _, next) =>{
    try {
        const cliente = req.query.cliente

        await seleccionar_contactos_cliente(cliente).then(resultado =>{
            req.contactos = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener los contactos del cliente: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getContactosUbicacion = async(req, _, next)=>{
    try {
        const ubicacion = req.query.ubicacion

        await seleccionar_contactos_ubicaciones(ubicacion).then(resultado =>{
            req.contactos = resultado
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al obtener los contactos de la ubicacion: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getContactosProyecto = async(req, _, next)=>{
    try {
        const proyecto = req.query.proyecto
        let ubicacion_proyecto = ''

        await seleccionar_ubicacion_proyecto(proyecto).then(resultado=>{
            ubicacion_proyecto = resultado[0].ubicacion
        })
        .catch(error=>{
            throw('No se pudo determinar la ubicacion del proyecto: ', error)
        })

        await seleccionar_contactos_ubicaciones(ubicacion_proyecto).then(resultado=>{
            req.contactos = resultado
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al obtener los contactos del proyecto: ', error)
        })
        
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createContacto = async(req, res, next) =>{
    try {
        let contacto = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            descripcion: req.body.descripcion,
            cliente: req.body.cliente
        }

        await crear_contacto(contacto).then(_=>{
            res.redirect(`/clientes/administrar?cliente=${contacto.cliente}`)
            return next()  
        })
        .catch(error=>{
            throw('Ha ocurrido un error al registrar el contacto: ', error)
        })  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getContacto = async(req, _, next) =>{
    try {
        const contacto = req.query.contacto
        await seleccionar_contacto(contacto).then(resultado=>{
            req.contacto = resultado
            return next()
        })
        .catch(error=>{
            throw('Error al obtener la información del contacto seleccionado: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateContacto = async(req, res, next) =>{
    try {
        const folio       = req.body.folio
        const nombre      = req.body.nombre 
        const email       = req.body.email
        const telefono    = req.body.telefono
        const descripcion = req.body.descripcion
        const cliente     = req.body.cliente
        
        await editar_contacto(nombre, email, telefono, descripcion, folio).then(_=>{
            res.redirect(`/clientes/administrar?cliente=${cliente}`)
            return next()
        })
        .catch(error=>{
            throw(`No se ha podido actualizar el registro de ${nombre}: `, error);      
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const assign2Ubiacion = async(req, res, next)=>{
    try {
        const contacto = req.body.contacto
        const ubicacion = req.body.ubicacion

        let does_exist = false
        let posibleRuta = ''

        posibleRuta = `/ubicaciones/perfil?ubicacion=${ubicacion}&cliente=${req.body.cliente}`
                
        await verificar_contacto_ubicacion(ubicacion, contacto).then(resultado=>{
            does_exist = resultado
        })
        .catch(error=>{
            throw('No se pudo validar la relacion entre el contacto y la ubicacion: ', error)
        })

        if(!does_exist){
            let registro = {
                ubicacion: ubicacion,
                contacto: contacto
            }

            await asignar_contacto_a_ubicacion(registro).then(_=>{
                console.log('Registro exitoso')
            })
            .catch(error=>{
                throw("Error al registrar la relación del contacto con la ubicacion", error)
            })
        }
    
        res.redirect(posibleRuta)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteAsignacionContacto = async(req, res, next)=>{
    try {
        let posibleRuta = ''
        if(req.query.flag == 1) {posibleRuta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=${req.query.flag}`}
        else if(req.query.flag == 0){posibleRuta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=${req.query.flag}`}
        
        await eliminar_relacion_contacto_ubicacion(req.query.contacto).then(_=>{
            res.redirect(posibleRuta)
            return next()
        })
        .catch(error=>{
            throw(`Error en la eliminación de la asiganción del contacto: `, error);  
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteContacto = async(req, res, next) =>{
    try {
        const contacto = req.query.contacto
        const ruta = `clientes/administrar?cliente=${req.query.cliente}`

        let contact_has_ubicacion = null

        await validar_contacto_ubicacion(contacto).then(resultado=>{
            contact_has_ubicacion = resultado
        }).catch(error=>{
            throw (`Error al buscar si el contacto tiene una ubicación: `, error)
        })

        if(contact_has_ubicacion){
            showError(res, 'ERROR', 'No se pudo eliminar al contacto pues es contacto de una ubicación: ', ruta)
            return next()
        }

        await eliminar_contacto(contacto).catch(error=>{
            throw('Error al borrar el contacto: ', error)
        })
        res.redirect(`/${ruta}`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
export {
    getContactos,
    getContactosUbicacion,
    getContacto,
    getContactosProyecto,
    createContacto,
    updateContacto,
    assign2Ubiacion,
    deleteAsignacionContacto,
    deleteContacto
}
