import { 
    seleccionar_ubicaciones, 
    seleccionar_ubicaciones_cliente, 
    seleccionar_ubicacion, 
    crear_ubicacion,
    cambiar_nombre_ubicacion,
    cambiar_direccion_ubicacion
} from "../models/Ubicacion.js";

const getUbicaciones = async(req, _, next) =>{
    try {
        if(req.query.cliente){
            await seleccionar_ubicaciones_cliente(req.query.cliente).then(resultado =>{
                req.ubicaciones = resultado
                return next()
            })
            .catch(error=>{
                //TODO: MEJORAR LA GESTION DE LOS ERRORES
                throw new Error('Error al obtener las ubicaciones del cliente: ', error)
            })
        }else{
            await seleccionar_ubicaciones().then(resultado =>{
                req.ubicaciones = resultado
                return next()
            })
            .catch(error=>{
                //TODO: MEJORAR LA GESTION DE LOS ERRORES
                throw new Error('Error al obtener las ubicaciones: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getUbicacion = async(req, _, next) =>{
    try {

        const ubicacion = req.query.ubicacion

        await seleccionar_ubicacion(ubicacion).then(resultado =>{
            req.ubicacion = resultado
            return next();
        })
        .catch(error=>{
            console.log(error)
            return next()
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createUbicacion = async(req, res, next) =>{
    try {
        let cliente = {
            nombre:    req.body.nombre,
            direccion: req.body.direccion,
            cliente:   req.body.cliente
        }

        await crear_ubicacion(cliente).then(_ =>{
            let ruta = `/clientes/administrar?cliente=${cliente.cliente}`
            res.redirect(ruta)
            return next()
        })
        .catch(error=>{
            //TODO: MEJORAR LA GESTION DE LOS ERRORES
            throw new Error('Error al registrar la ubicacion: ', error)
        })  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateNameUbicacion = async(req, res, next)=>{
    try {
        let ruta = ''
        if(req.query.flag == 1){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=1`}
        else if(req.query.flag == 0){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=0`}
        else{ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}`}

        await cambiar_nombre_ubicacion(req.query.nombre, req.query.ubicacion).then(_=>{
            res.redirect(ruta)
            return next()
        })
        .catch(error=>{
            throw('Error al cambiar el nombre de la ubicacion: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateDireccionUbicacion = async(req, res, next)=>{
    try {
        let ruta = ''
        if(req.query.flag == 1){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=1`}
        else if(req.query.flag == 0){ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=0`}
        else{ruta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}`}
        
        await cambiar_direccion_ubicacion(req.query.direccion, req.query.ubicacion).then(_=>{
            res.redirect(ruta)
            return next()
        })
        .catch(error=>{
            throw('Error al cambiar la direccion de la ubicacion: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
export {
    getUbicaciones,
    getUbicacion,
    createUbicacion,
    updateNameUbicacion,
    updateDireccionUbicacion
}

/* 
//procedimiento para registrarnos
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

//CRUD PARA LA GESTION DE UBICACIONES
    
    
    exports.editUbicacion = async(req, res, next) =>{
        try {
            let folio     = req.body.folio
            let nombre    = req.body.nombre
            let direccion = req.body.direccion
            let cliente   = req.body.cliente

            let sql = "UPDATE cat007_ubicaciones SET nombre = ?, direccion = ?, cliente = ? WHERE folio = ?"

            conexion.query(sql, [nombre, direccion, cliente, folio], function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect('/adminubicaciones')
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    
    exports.deleteUbicacion = async(req, res, next) =>{
        try{        
            let ubicacion = req.params.folio
            const ruta = `adminubicaciones`

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



    //FUNCIONES CORRECTAS
    
    




//FIN DEL CRUD PARA LA GESTION DE UBICACIONES

//COTIZACIONES NIVEL UBICACION
    exports.addCotUbi = async(req, res, next)=>{
        try {
            let proyecto = req.body.proyecto
            let cliente = req.body.cliente

            let ruta = '';
            if(req.body.flag == 2){ruta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}&cliente=${req.body.cliente}&flag=1`}
            else if(req.body.flag == 0){ruta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}&flag=0`}

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
                            res.redirect(ruta)
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
            let ruta = '';
            if(req.query.flag == 1){ruta = `/perfilUbicacion?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=1`}
            else if(req.query.flag == 0){ruta = `/perfilUbicacion?ubicacion=${req.query.ubicacion}&flag=0`}
    
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