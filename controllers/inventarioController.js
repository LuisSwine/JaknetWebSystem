const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process');

function calculateRutaProy(cliente, ubicacion, proyecto, flag, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `/proyectos/inventario?proyecto=${proyecto}&flag=0`; break;
        case 1: ruta = `/proyectos/inventario?proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 2: ruta = `/proyectos/inventario?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 3: ruta = `/proyectos/inventario?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`; break;
        case 4: ruta = `/proyectos/inventario?proyecto=${proyecto}&flag=4&permisos=${permisos}`; break;
    }
    return ruta;
}
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
function registrar_movimiento_proyecto(bitacora){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO op018_movs_invent_proy SET ?', bitacora, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve();
            }
        })
    })
}
function registrar_movimiento(bitacora){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO op016_movimientos_inventario SET ?', bitacora, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve();
            }
        })
    })
}
function vaciar_almacen(folio){
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM cat020_inventario WHERE folio = ?', folio, (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}
function modificar_cantidad_almacen(cantidad, folio){
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [cantidad, folio], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}
function validar_cantidad_proyecto(producto, proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio, cantidad FROM op011_material_proyecto WHERE proyecto = ? AND producto = ?", [proyecto, producto], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(true);
                }else{
                    resolve(fila)
                }
            }
        });    
    })
}
function modificar_cantidad_proyecto(folio, cantidad){
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op011_material_proyecto SET cantidad = ? WHERE folio = ?", [cantidad, folio], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}
function get_primer_almacen(){
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT folio FROM cat027_almacenes ORDER BY folio ASC LIMIT 1', (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve(fila[0].folio)
            }
        })
    })
}
function get_existencias_inventario(producto){
    return new Promise ((resolve,reject)=>{
        conexion.query('SELECT SUM(cantidad) as suma FROM cat020_inventario WHERE producto = ?', producto, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve(fila[0].suma)
            }
        })
    })
}
function get_registros_inventario(producto){
    return new Promise ((resolve,reject)=>{
        conexion.query('SELECT * FROM cat020_inventario WHERE producto = ?', producto, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve(fila)
            }
        })
    })
}
function put_product_almacen(data){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat020_inventario SET ?', data, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}
function delete_from_project(registro){
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM op011_material_proyecto WHERE folio = ?', registro, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}
function check_existence(producto, almacen){
    return new Promise((resolve, reject)=>{
        conexion.query('SELECT * FROM cat020_inventario WHERE producto = ? AND almacen = ?', [producto, almacen], (error, registro)=>{
            if(error){
                throw error
            }else{
                if(registro.length === 0){
                    resolve(false)
                }else{
                    resolve(registro[0])
                }
            }
        })
    })
}
function delete_from_invent(registro){
    return new Promise((resolve, reject)=>{
        conexion.query('DELETE FROM cat020_inventario WHERE folio = ?', registro, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}
function modificar_cantidad_usuario(folio, cantidad){
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE op013_material_usuario SET cantidad = ? WHERE folio = ?", [cantidad, folio], (error, fila)=>{
            if(error){
                throw error;
            }else{
                resolve();
            }
        })
    })
}
function delete_from_user(registro){
    return new Promise((resolve,reject)=>{
        conexion.query('DELETE FROM op013_material_usuario WHERE folio = ?', registro, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}

//INVENTARIO GENERAL
exports.moverInventario = async(req, res, next) =>{
    try {

        //Recibimos la informacion
        const producto = req.body.producto
        const cantidad = req.body.cantidad
        const unidades = req.body.unidades
        const almacen  = req.body.almacen
        const usuario  = req.body.usuario

        let is_in_storage = await check_existence(producto, almacen)

        if(!is_in_storage){
            let registro = {
                producto: producto,
                cantidad: cantidad,
                unidades: unidades,
                almacen: almacen
            }
            await put_product_almacen(registro)
        }else{
            let nueva_cantidad = parseFloat(cantidad) + parseFloat(is_in_storage.cantidad)
            let folio = is_in_storage.folio
            await modificar_cantidad_almacen(nueva_cantidad, folio)
        }

        let bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: cantidad,
            fecha: new Date(),
            usuario_afectado: usuario,
            almacen: almacen
        }
        await registrar_movimiento(bitacora)
        res.redirect('/inventario/inventario_general')
        return next()
               
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editFromInvent = async(req, res, next)=>{
    try {
        //RECIBIMOS LA INFORMACION POR GET 
        const registro = req.query.registro
        const producto = req.query.producto
        const actual   = req.query.cantidadActual
        const nueva    = req.query.nuevaCantidad
        const usuario  = req.query.usuario
        const almacen  =  req.query.almacen

        if(actual == nueva){
            res.redirect(`/inventario/inventario_general`)
            return next()
        }

        let bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: nueva - actual,
            fecha: new Date(),
            usuario_afectado: usuario,
            almacen: almacen
        }

        await registrar_movimiento(bitacora)
        await modificar_cantidad_almacen(nueva, registro)

        res.redirect(`/inventario/inventario_general`)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteFromInvent = async(req, res, next)=>{
    try {
        //Calculamos el movimiento
        let registro = req.query.registro
        
        let bitacora = {
            usuario_registra: req.query.usuario,
            producto: req.query.producto,
            cantidad: -1 * req.query.cantidad,
            fecha: new Date(),
            usuario_afectado: req.query.usuario,
            almacen: req.query.almacen
        }
        
        await registrar_movimiento(bitacora)
        await delete_from_invent(registro)

        res.redirect(`/inventario/inventario_general`)
        return next()

         
    } catch (error) {
        console.log(error)
        return next()
    }
}



//INVENTARIO PROYECTOS
exports.addProduct2Proyecto = async(req, res, next)=>{
    try {
        let data = {
            producto: req.body.producto,
            proyecto: req.body.proyecto,
            cantidad: req.body.cantidad,
            unidades: req.body.unidad
        }
        let bitacora = {
            usuario_registra: req.body.usuario,
            producto: data.producto,
            cantidad: (-1) * parseFloat(data.cantidad),
            fecha: new Date(), 
            proyecto: data.proyecto,
            almacen: req.body.almacen
        }

        //Definimos la ruta
        const ruta = calculateRutaProy(req.body.cliente, req.body.ubicacion, data.proyecto, req.body.flag, req.body.permisos)

        //Obtenemos la cantidad total del producto en el inventario
        let cantidad_total_en_inventario = 0
        conexion.query('SELECT SUM(cantidad) as suma FROM cat020_inventario WHERE producto = ?', data.producto, (error, fila)=>{
            if(error){
                throw error
            }else{
                cantidad_total_en_inventario = fila[0].suma
            }
        })

        //Primero validamos la cantidad
        const cantidad_existente = req.body.cantidad_existente
        const folioInvent = req.body.folioInvent

        if(parseInt(data.cantidad) > parseInt(cantidad_existente)){
            showError(res, 'Error al mover el material', 'No hay suficientes existencias en el inventario', ruta)
            return next();
        }

        //Primero registramos el movimiento en la bitacora
        await registrar_movimiento_proyecto(bitacora);

        //Modificamos la cantidad en el inventario
        if(data.cantidad == cantidad_existente){
            await vaciar_almacen(folioInvent);
        }else{
            let cantidad_inventario = parseInt(cantidad_existente) - parseInt(data.cantidad);
            await modificar_cantidad_almacen(cantidad_inventario);
        }

        let proyecto_has = await validar_cantidad_proyecto(data.producto, data.proyecto);

        if(proyecto_has){
            conexion.query("INSERT INTO op011_material_proyecto SET ?", data, (error, fila)=>{
                if(error){
                    throw error
                }
            })
        }else{
            let nuevaCantidad = parseInt(data.cantidad) + parseInt(proyecto_has[0].cantidad);
            await modificar_cantidad_proyecto(proyecto_has[0].folio, nuevaCantidad);
        }

        res.redirect(ruta)
        return next
        
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.returnAll2Invent = async(req, res, next)=>{
    try {
        const registro = req.query.registro //op011_material_proyecto.folio
        const producto = req.query.producto //folio_producto
        const cantidad = req.query.cantidad //cantidad
        const proyecto = req.query.proyecto //proyecto
        const unidades = req.query.unidades //unidades
        const usuario  = req.query.usuario  //usuario

        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, proyecto, req.query.flag, req.query.permisos)

        let bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: cantidad,
            fecha: new Date(), 
            proyecto: proyecto,
            almacen: 0
        }

        //Primero eliminamos el registro
        await delete_from_project(registro)

        //Determinamos a que almacen enviaremos las existencias
        let does_exists = await get_registros_inventario(producto)
        if(does_exists.length === 0){
            //Esto quiere decir que no existe en ninguna ubicación del inventario
            let almacen = await get_primer_almacen()
            //Añadimos las existencias al primer almacen
            let data = {
                producto: producto,
                cantidad: cantidad,
                unidades: unidades,
                almacen: almacen
            }
            await put_product_almacen(data)
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
            
        }else{
            let almacen = does_exists[0].almacen
            //Modificamos la cantidad en esa ubicacion
            let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cantidad)
            await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio)
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
        }
        await registrar_movimiento_proyecto(bitacora)

        res.redirect(ruta)
        return next()

        
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.modificarInventProy = async(req, res, next)=>{
    try {
        const cantidadActual = parseInt(req.query.cantidadActual)
        const nuevaCantidad  = parseInt(req.query.nuevaCantidad)
        const producto       = req.query.producto
        const usuario        = req.query.usuario
        const registro       = req.query.registro
        const unidades       = req.query.unidades
        const proyecto       = req.query.proyecto

        const ruta = calculateRutaProy(req.query.cliente, req.query.ubicacion, proyecto, req.query.flag, req.query.permisos)

        if(cantidadActual === nuevaCantidad){
            //No hacemos nada
            res.redirect(ruta)
            return next()
        }

        let bitacora = {
            usuario_registra: usuario,
            producto: producto,
            cantidad: 0,
            fecha: new Date(),
            proyecto: proyecto,
            almacen: 0
        }

        //Primero analizamos si es aumento o drecremento
        if(cantidadActual < nuevaCantidad){
            //En caso de un aumento
            //Calculamos la diferencia
            let diferencia = parseFloat(nuevaCantidad) - parseFloat(cantidadActual)

            //Validamos que exista suficientes existencias en el inventario
            let existencias_inventario = await get_existencias_inventario(producto)
            if(existencias_inventario < diferencia){
                res.redirect(ruta)
                return next()
            }
            
            //Ahora obtenemos las existencias
            let existencias = await get_registros_inventario(producto)
            let unidades_trasladadas = 0
            let i = 0
            let restante = diferencia

            while(unidades_trasladadas < diferencia){
                if(existencias[i].cantidad <= restante){
                    //Si la cantidad en esa ubicacion es menor entonces trasladamos todo
                    //Primero registramos en la bitacora
                    bitacora.cantidad = (-1) * parseFloat(existencias[i].cantidad)
                    bitacora.almacen = existencias[i].almacen
                    //Segundo eliminamos el registro del inventario
                    await vaciar_almacen(existencias[i].folio)
                    //Registramos las unidades
                    unidades_trasladadas += parseFloat(existencias[i].cantidad)
                }
                if(existencias[i].cantidad > restante){
                    //Si hay mas en inventario que solo necesario solo trasladamos una parte
                    //Primero registramos en la bitacora
                    bitacora.cantidad = (-1) * parseFloat(restante)
                    bitacora.almacen = existencias[i].almacen
                    //Retiramos la cantidad del almacen
                    let nCantidad = parseFloat(existencias[i].cantidad) - parseFloat(restante)
                    await modificar_cantidad_almacen(nCantidad, existencias[i].folio)
                    unidades_trasladadas += restante
                }
                await registrar_movimiento_proyecto(bitacora)
                restante = parseFloat(diferencia) - parseFloat(unidades_trasladadas)
                i += 1
            }
        }
        
        if(cantidadActual > nuevaCantidad){
            //Primero determinamos la cantidad a devolver
            let cant_2_return =parseFloat(cantidadActual) -parseFloat(nuevaCantidad)
            //Quiere decir que es un decremento
            //Primero definimos a que almacen enviaremos todo
            let does_exists = await get_registros_inventario(producto)
            if(does_exists.length === 0){
                //Esto quiere decir que no existe en ninguna ubicación del inventario
                let almacen = await get_primer_almacen()
                //Añadimos las existencias al primer almacen
                let data = {
                    producto: producto,
                    cantidad: cant_2_return,
                    unidades: unidades,
                    almacen: almacen
                    
                }
                await put_product_almacen(data)
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
                
            }else{
                let almacen = does_exists[0].almacen
                //Modificamos la cantidad en esa ubicacion
                let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cant_2_return)
                await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio)
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
            }
            bitacora.cantidad = cant_2_return
            await registrar_movimiento_proyecto(bitacora)
        }

        //Modificamos la cantidad en el proyecto
        await modificar_cantidad_proyecto(registro, nuevaCantidad)

        res.redirect(ruta)
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}

//INVENTARIO CON USUARIO
exports.modificarInventarioPersonal = async(req, res, next)=>{
    try {
        //Primero recibimos toda la informacion
        const cantidadActual   = parseInt(req.query.cantidadActual)
        const nuevaCantidad    = parseInt(req.query.nuevaCantidad)
        const producto         = req.query.producto
        const usuario_registra = req.query.usuario_registra
        const usuario_afectado = req.query.usuario_afectado
        const registro         = req.query.registro
        const unidades         = req.query.unidades
        const flag             = req.query.flag

        let ruta = (flag == 1) ? `inventario/mi_inventario?usuario=${usuario_afectado}&flag=${flag}` : `inventario/mi_inventario?usuario=${usuario_afectado}`

        if(cantidadActual === nuevaCantidad){
            //No hacemos nada
            res.redirect(`/${ruta}`)
            return next()
        }

        let bitacora = {
            usuario_registra: usuario_registra,
            producto: producto,
            cantidad: 0,
            fecha: new Date(),
            usuario_afectado: usuario_afectado,
            almacen: 0
        }

        //Primero analizamos si es aumento o drecremento
        if(cantidadActual < nuevaCantidad){
            //En caso de un aumento
            //Calculamos la diferencia
            let diferencia = parseFloat(nuevaCantidad) - parseFloat(cantidadActual)

            //Validamos que exista suficientes existencias en el inventario
            let existencias_inventario = await get_existencias_inventario(producto)
            if(existencias_inventario < diferencia){
                showError(res, 'ERROR AL MOVER EL INVENTARIO', 'No hay suficientes existencias en el inventario', ruta)
                return next()
            }
            
            //Ahora obtenemos las existencias
            let existencias = await get_registros_inventario(producto)
            let unidades_trasladadas = 0
            let i = 0
            let restante = diferencia

            while(unidades_trasladadas < diferencia){
                if(existencias[i].cantidad <= restante){
                    //Si la cantidad en esa ubicacion es menor entonces trasladamos todo
                    //Primero registramos en la bitacora
                    bitacora.cantidad = (-1) * parseFloat(existencias[i].cantidad)
                    bitacora.almacen = existencias[i].almacen
                    //Segundo eliminamos el registro del inventario
                    await vaciar_almacen(existencias[i].folio)
                    //Registramos las unidades
                    unidades_trasladadas += parseFloat(existencias[i].cantidad)
                }
                if(existencias[i].cantidad > restante){
                    //Si hay mas en inventario que solo necesario solo trasladamos una parte
                    //Primero registramos en la bitacora
                    bitacora.cantidad = (-1) * parseFloat(restante)
                    bitacora.almacen = existencias[i].almacen
                    //Retiramos la cantidad del almacen
                    let nCantidad = parseFloat(existencias[i].cantidad) - parseFloat(restante)
                    await modificar_cantidad_almacen(nCantidad, existencias[i].folio)
                    unidades_trasladadas += restante
                }
                await registrar_movimiento(bitacora)
                restante = parseFloat(diferencia) - parseFloat(unidades_trasladadas)
                i += 1
            }
        }
        
        if(cantidadActual > nuevaCantidad){
            //Primero determinamos la cantidad a devolver
            let cant_2_return = parseFloat(cantidadActual) - parseFloat(nuevaCantidad)
            //Quiere decir que es un decremento
            //Primero definimos a que almacen enviaremos todo
            let does_exists = await get_registros_inventario(producto)
            if(does_exists.length === 0){
                //Esto quiere decir que no existe en ninguna ubicación del inventario
                let almacen = await get_primer_almacen()
                //Añadimos las existencias al primer almacen
                let data = {
                    producto: producto,
                    cantidad: cant_2_return,
                    unidades: unidades,
                    almacen: almacen
                    
                }
                await put_product_almacen(data)
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
                
            }else{
                let almacen = does_exists[0].almacen
                //Modificamos la cantidad en esa ubicacion
                let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cant_2_return)
                await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio)
                //Registramos el movimiento en la bitacora
                bitacora.almacen = almacen
            }
            bitacora.cantidad = cant_2_return
            await registrar_movimiento(bitacora)
        }

        //Modificamos la cantidad en el proyecto
        await modificar_cantidad_usuario(registro, nuevaCantidad)

        res.redirect(`/${ruta}`)
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.returnAll2InventPersonal = async(req, res, next)=>{
    try {
        const registro         = req.query.registro //op011_material_proyecto.folio
        const producto         = req.query.producto //folio_producto
        const cantidad         = req.query.cantidad //cantidad
        const unidades         = req.query.unidades //unidades
        const usuario_registra = req.query.usuario_registra  //usuario
        const usuario_afectado = req.query.usuario_afectado
        const flag             = req.query.flag

        console.log(usuario_afectado)

        let ruta = (flag == 1) ? `/inventario/mi_inventario?usuario=${usuario_afectado}&flag=${flag}` : `/inventario/mi_inventario?usuario=${usuario_afectado}`

        let bitacora = {
            usuario_registra: usuario_registra,
            producto: producto,
            cantidad: cantidad,
            fecha: new Date(), 
            usuario_afectado: usuario_afectado,
            almacen: 0
        }

        //Primero eliminamos el registro
        await delete_from_user(registro)

        //Determinamos a que almacen enviaremos las existencias
        let does_exists = await get_registros_inventario(producto)
        if(does_exists.length === 0){
            //Esto quiere decir que no existe en ninguna ubicación del inventario
            let almacen = await get_primer_almacen()
            //Añadimos las existencias al primer almacen
            let data = {
                producto: producto,
                cantidad: cantidad,
                unidades: unidades,
                almacen: almacen
            }
            await put_product_almacen(data)
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
            
        }else{
            let almacen = does_exists[0].almacen
            //Modificamos la cantidad en esa ubicacion
            let new_cant_almacen = parseFloat(does_exists[0].cantidad) + parseFloat(cantidad)
            await modificar_cantidad_almacen(new_cant_almacen, does_exists[0].folio)
            //Registramos el movimiento en la bitacora
            bitacora.almacen = almacen
        }
        await registrar_movimiento(bitacora)

        res.redirect(ruta)
        return next()  
    } catch (error) {
        console.log(error)
        return next()
    }
}





exports.getInventarioOn = async (req, res, next)=>{
    try {
        let almacen = req.query.almacen;
        
        conexion.query('SELECT * FROM inventario_view001 WHERE folio_almacen = ?', almacen, (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.inventario = fila;
                return next();
            }
        })

    } catch (error) {
        console.log(error);
        return next();
    }
}
