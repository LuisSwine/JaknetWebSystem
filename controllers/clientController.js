const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

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

//CRUD PARA LA GESTION DE CLIENTES
    //SELECT DE SERVICIOS
    exports.selectTipoServicios = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM cat005_tipo_servicio", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.servicios = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Select de los tipos de cliente
    exports.selectTipoClientes = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM cat012_tipo_cliente", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.tipos = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Select de todos los clientes
    exports.selectClients = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM clientes_view001", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.clientes = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Select de un solo cliente
    exports.selectClient = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM clientes_view001 WHERE folio = ?", [req.query.cliente], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.cliente = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Crear un cliente
    exports.createClient = async(req, res, next) =>{
        try {
            let data = {
                nombre: req.body.nombre,
                tipo_cliente: req.body.tipo_cliente,
                tipo_servicio: req.body.tipo_servicio
            }
            let insert = "INSERT INTO cat003_clientes SET ?"
            conexion.query(insert, data, function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect('/adminclients')
                    return next()    
                }
            })    
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Cambiar el nombre del cliente
    exports.editNameClient = async(req, res, next)=>{
        try {
            conexion.query("UPDATE cat003_clientes SET nombre = ? WHERE folio = ?", [req.query.nombre, req.query.cliente], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    res.redirect(`/perfilCliente?cliente=${req.query.cliente}`)
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next
        }
    }
    exports.editServicioCliente = async(req, res, next)=>{
        try {
            conexion.query("UPDATE cat003_clientes SET tipo_servicio = ? WHERE folio = ?", [req.query.servicio, req.query.cliente], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    res.redirect(`/perfilCliente?cliente=${req.query.cliente}`)
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next
        }
    }
    exports.editTipoCliente = async(req, res, next)=>{
        try {
            conexion.query("UPDATE cat003_clientes SET tipo_cliente = ? WHERE folio = ?", [req.query.tipo, req.query.cliente], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    res.redirect(`/perfilCliente?cliente=${req.query.cliente}`)
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
                                            res.redirect('/adminclients')
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

//Ubicaciones a Nivel Cliente
    exports.deleteUbicacionCliente = async(req, res, next)=>{
        try {
            let ubicacion = req.query.ubicacion
            const ruta = `perfilCliente?cliente=${req.query.cliente}`

            //Validamos las areas
            conexion.query("SELECT folio FROM cat008_areas WHERE planta = ?", [ubicacion], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    if(fila.length === 0){
                        //Validamos proyectos
                        conexion.query("SELECT folio FROM cat009_proyectos WHERE ubicacion = ?", [ubicacion], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                if(fila2.length === 0){
                                    //validamos contactos
                                    conexion.query("SELECT folio FROM op015_contacto_ubicacion WHERE ubicacion = ?", [ubicacion], (error3, fila3)=>{
                                        if(error3){
                                            throw error3
                                        }else{
                                            if(fila3.length === 0){
                                                //Ahora si ya eliminamos
                                                conexion.query("DELETE FROM cat007_ubicaciones WHERE folio = ?", [ubicacion], (error4, fila4)=>{
                                                    if(error4){
                                                        throw error4
                                                    }else{
                                                        res.redirect(`/${ruta}`)
                                                        return next()
                                                    }
                                                })
                                            }else{
                                                showError(res, 'No se ha podido eliminar la ubicacion', `La ubicacion ${ubicacion} tiene contactos asignados`, ruta)
                                                return next()
                                            }
                                        }
                                    })
                                }else{
                                    showError(res, 'No se ha podido eliminar la ubicacion', `La ubicacion ${ubicacion} tiene proyectos en curso`, ruta)
                                    return next()
                                }
                            }
                        })
                    }else{
                        showError(res, 'No se ha podido eliminar la ubicacion', `La ubicacion ${ubicacion} tiene areas creadas`, ruta)
                        return next()
                    }
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
    }