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