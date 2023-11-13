import { seleccionar_contactos_cliente, seleccionar_contactos_ubicaciones, crear_contacto, seleccionar_contacto, editar_contacto, verificar_contacto_ubicacion, asignar_contacto_a_ubicacion, eliminar_relacion_contacto_ubicacion } from "../models/Contacto.js";
import { seleccionar_ubicacion_proyecto } from "../models/Proyecto.js";

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
export {
    getContactos,
    getContactosUbicacion,
    getContacto,
    getContactosProyecto,
    createContacto,
    updateContacto,
    assign2Ubiacion,
    deleteAsignacionContacto
}

/* 
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


//CRUD PARA LA GESTION DE CONTACTOS




exports.deleteContact = async(req, res, next) =>{
    try {
        let contacto = req.query.contacto
        let ruta = 'admincontactos'
        if(req.query.flag == 1) ruta = `clientes/administrar?cliente=${req.query.cliente}`
        //confirmamos que el contacto no este registrado en otra tabla
        conexion.query("SELECT folio FROM cat013_cotizaciones WHERE contacto = ?", [contacto], (error, fila)=>{{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    conexion.query("SELECT folio FROM op015_contacto_ubicacion WHERE contacto = ?", [contacto], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            if(fila2.length === 0){
                                conexion.query("DELETE FROM cat006_contactos WHERE folio = ?", [contacto], function(error3, filas){
                                    if(error3){
                                        throw error3
                                    }else{
                                        res.redirect(`/${ruta}`)
                                        return next()
                                    }
                                })
                            }else{
                                showError(res, 'ERROR', 'No se pudo eliminar al contacto pues se esta usando', ruta)
                                return next()
                            }
                        }
                    })
                }else{
                    showError(res, 'ERROR', 'No se pudo eliminar al contacto pues se esta usando', ruta)
                    return next()
                }
            }
        }})
    } catch (error) {
        console.log(error)
        return next()
    }
}
//FIN DEL CRUD PARA LA GESTION DE CONTACTOS

//RELACION CON UBICACION
 */
