import conexion from '../database/db.js'
import { 
    seleccionar_clientes, 
    seleccionar_cliente, 
    seleccionar_servicios, 
    seleccionar_tipos_cliente, 
    crear_cliente,
    actualizar_tipo,
    actualizar_servicio,
    actualizar_nombre 
} from '../models/Cliente.js';


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
export {
    getClientes,
    getServicios,
    createClient,
    getCliente,
    getTiposCliente,
    updateTipo,
    updateServicio,
    updateNombre
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



    //EDITAR DATOS DEL CLIENTE
    exports.editarNombre = async(req, res, next)=>{
        try {
            conexion.query("UPDATE cat003_clientes SET nombre = ? WHERE folio = ?", [req.query.nombre, req.query.cliente], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    res.redirect(`/clientes/administrar?cliente=${req.query.cliente}`)
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next
        }
    }

    //Eliminar un cliente
    exports.deleteClient = async(req, res, next) =>{
        try {
            const cliente = req.params.folio

            //Validamos los contactos
            conexion.query("SELECT folio FROM cat006_contactos WHERE cliente = ?", [cliente], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    if(fila.length === 0){
                        //Validamos las ubicaciones
                        conexion.query("SELECT folio FROM cat007_ubicaciones WHERE cliente = ?", [cliente], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                if(fila2.length === 0){
                                    //Eliminamos
                                    conexion.query("DELETE FROM cat003_clientes WHERE folio = ?", [cliente], (error3, fila3)=>{
                                        if(error3){
                                            throw error3
                                        }else{
                                            res.redirect('/clientes/gestionar')
                                            return next()
                                        }
                                    })
                                }else{
                                    showError(res, 'ERROR Eliminando al Cliente', `No se ha podido eliminar al cliente ${cliente}, porque tiene ubicaciones registradas`, 'adminclients')
                                    return next()
                                }
                            }
                        })
                    }else{
                        showError(res, 'ERROR Eliminando al Cliente', `No se ha podido eliminar al cliente ${cliente}, porque tiene contactos registradas`, 'adminclients')
                        return next()
                    }
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DEL CRUD PARA LA GESTION DE CLIENTES

function validate_areas_ubi(ubicacion){
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM cat008_areas WHERE planta = ?', ubicacion, (error, fila)=>{
            if(error){
                throw error;
            }else{
                if(fila.length === 0){
                    resolve(false);
                }else{
                    resolve(true);
                }
            }
        });
    });
}
function validate_proyectos_ubi(ubicacion){
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT folio FROM cat009_proyectos WHERE ubicacion = ?", ubicacion, (error, fila)=>{
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
function validate_contacts_ubi(ubicacion){
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT folio FROM op015_contacto_ubicacion WHERE ubicacion = ?", ubicacion, (error, fila)=>{
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

//Ubicaciones a Nivel Cliente
    exports.deleteUbicacionCliente = async(req, res, next)=>{
        try {
            let ubicacion = req.query.ubicacion
            const ruta = `clientes/gestionar?cliente=${req.query.cliente}`

            let ubi_has_areas = await validate_areas_ubi(ubicacion)
            if(ubi_has_areas){
                showError(res, 'No se ha podido eliminar la ubicacion', `La ubicacion ${ubicacion} tiene areas creadas`, ruta)
                return next()
            }

            let ubi_has_proys = await validate_proyectos_ubi(ubicacion)
            if(ubi_has_proys){
                showError(res, 'No se ha podido eliminar la ubicacion', `La ubicacion ${ubicacion} tiene proyectos en curso`, ruta)
                return next()
            }
            
            let ubi_has_contacts = await validate_contacts_ubi(ubicacion)
            if(ubi_has_contacts){
                showError(res, 'No se ha podido eliminar la ubicacion', `La ubicacion ${ubicacion} tiene contactos asignados`, ruta)
                return next()
            }

            conexion.query("DELETE FROM cat007_ubicaciones WHERE folio = ?", ubicacion, (error4, fila4)=>{
                if(error4){
                    throw error4
                }else{
                    res.redirect(`/${ruta}`)
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }

//Cotizaciones a nivel cliente
    exports.addCotClient = async(req, res, next)=>{
        try {
            let proyecto = req.body.proyecto
            let cliente = req.body.cliente
            conexion.query("SELECT folio FROM cat006_contactos WHERE cliente = ? LIMIT 1", [cliente], (error2, fila)=>{
                if(error2){
                    throw error2
                }else{
                    let data = {
                        proyecto: proyecto,
                        contacto: fila[0].folio 
                    }
                    let insert = "INSERT INTO cat013_cotizaciones SET ?"
                    conexion.query(insert, data, (error3, fila2)=>{
                        if(error3){
                            throw error3
                        }else{
                            res.redirect(`/perfilCliente?cliente=${cliente}`)
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
    exports.deleteCotizacion = async(req, res, next)=>{
        try {
            let cotizacion = req.query.folio
            let ruta = `/perfilCliente?cliente=${req.query.cliente}`
    
            //Validamos que no haya productos
            conexion.query("SELECT * FROM op008_lista_productos WHERE cotizacion = ?", [cotizacion], (err, fila)=>{
                if(err){
                    throw err
                }else{
                    if(fila.length === 0){
                        //Validamos que no haya servicios
                        conexion.query("SELECT * FROM op009_lista_servicios WHERE cotizacion = ?", [cotizacion], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                if(fila2.length === 0){
                                    //Eliminamos
                                    conexion.query("DELETE FROM cat013_cotizaciones WHERE folio = ?", [cotizacion], (error3, fila3)=>{
                                        if(error3){
                                            throw error3
                                        }else{
                                            res.redirect(ruta)
                                            return next()  
                                        }
                                    })
                                }else{
                                    res.render('Error/showInfo', {
                                        title: 'Servicio(s) Cotizado(s)',
                                        alert: true,
                                        alertTitle: 'INFORMACION',
                                        alertMessage: `La cotizacion ${cotizacion} tiene almenos un servicio cotizado y no puede eliminarse`,
                                        alertIcon: 'info',
                                        showConfirmButton: true,
                                        timer: 8000,
                                        ruta: `${ruta.replace('/', '')}` 
                                    })
                                    return next()
                                }
                            }
                        })
                    }else{
                        res.render('Error/showInfo', {
                            title: 'Producto(s) Cotizado(s)',
                            alert: true,
                            alertTitle: 'INFORMACION',
                            alertMessage: `La cotizacion ${cotizacion} tiene almenos un producto cotizado y no puede eliminarse`,
                            alertIcon: 'info',
                            showConfirmButton: true,
                            timer: 8000,
                            ruta: `${ruta.replace('/', '')}` 
                        })
                        return next()
                    }
                }
            })
        }catch (error) {
            console.log(error)
            return next()
        }
    } */