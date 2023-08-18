const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process');
const { resolve } = require('path');
const { rejects } = require('assert');


function calculateRutaProyecto(flag, ubicacion, cliente, proyecto, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&flag=0`;
            break;
        case 1:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=1`;
            break;
        case 2:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=2`;
            break;
        case 3:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=3`;
            break;
        case 4:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&flag=4&permisos=${permisos}`;
            break;
    }
    return ruta
}
function calculateRutaDetalles(flag, factura, proyecto, ubicacion, cliente, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `/facturas/detalles?factura=${factura}&proyecto=${proyecto}&flag=0`; break;
        case 1: ruta = `/facturas/detalles?factura=${factura}&proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 2: ruta = `/facturas/detalles?factura=${factura}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 3: ruta = `/facturas/detalles?factura=${factura}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 4: ruta = `/facturas/detalles?factura=${factura}&proyecto=${proyecto}&flag=${flag}&permisos=${permisos}`; break;
        default: ruta = '/login'; break;
    }
    return ruta;
}
function createFactura(factura){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat028_facturas SET ?', factura, (error, _)=>{
            if(error){
                throw error
            }else{
                conexion.query('SELECT folio FROM cat028_facturas ORDER BY folio DESC LIMIT 1', (error2, fila)=>{
                    if(error2){
                        throw error2;
                    }else{
                        resolve(fila[0].folio)
                    }
                })
            }
        })
    })
}
function registrarBitacora(bitacora){
    return new Promise ((resolve,reject)=> {
        conexion.query('INSERT INTO op020_bitacora_facturas SET ?', bitacora, (error, _)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}
function registrarProductoEnFactura(registro){
    return new Promise((resolve, reject)=>{
        console.log(registro)
        conexion.query("INSERT INTO op019_factura_producto SET ?", registro, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}
function registrarUnidad(unidad){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat023_unidades SET ?', unidad, (error, fila)=>{
            if(error){
                throw error
            }else{
                conexion.query('SELECT folio FROM cat023_unidades ORDER BY folio DESC LIMIT 1', (error1, fila1)=>{
                    if(error1){
                        throw error1
                    }else{
                        resolve(fila1[0].folio)
                    }
                })
            }
        })
    })
}
function registrarProductoNuevo(producto){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat016_productos SET ?', producto, (error, fila)=>{
            if(error){
                throw error
            }else{
                conexion.query('SELECT folio FROM cat016_productos ORDER BY folio DESC LIMIT 1', (error1, fila1)=>{
                    if(error1){
                        throw error1
                    }else{
                        resolve(fila1[0].folio)
                    }
                })
            }
        })
    })
}
function registrarCategoria(categoria){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat017_categoria_producto SET ?', categoria, (error, fila)=>{
            if(error){
                throw error
            }else{
                conexion.query('SELECT folio FROM cat017_categoria_producto ORDER BY folio DESC LIMIT 1', (error1, fila1)=>{
                    if(error1){
                        throw error1
                    }else{
                        resolve(fila1[0].folio)
                    }
                })
            }
        })
    })
}
function registrarTipo(tipo){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat018_tipo_producto SET ?', tipo, (error, fila)=>{
            if(error){
                throw error
            }else{
                conexion.query('SELECT folio FROM cat018_tipo_producto ORDER BY folio DESC LIMIT 1', (error1, fila1)=>{
                    if(error1){
                        throw error1
                    }else{
                        resolve(fila1[0].folio)
                    }
                })
            }
        })
    })
}
function registrarMarca(marca){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat015_marcas SET ?', marca, (error, fila)=>{
            if(error){
                throw error
            }else{
                conexion.query('SELECT folio FROM cat015_marcas ORDER BY folio DESC LIMIT 1', (error1, fila1)=>{
                    if(error1){
                        throw error1
                    }else{
                        resolve(fila1[0].folio)
                    }
                })
            }
        })
    })
}
function registrarMarcaEnProveedor(asociacion){
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO op007_marca_proveedor SET ?', asociacion, (error, fila)=>{
            if(error){
                throw error
            }else{
                resolve()
            }
        })
    })
}

exports.getCostoProyecto = async(req, res, next)=>{
    try {
        const proyecto = req.query.proyecto
        conexion.query('SELECT SUM(total) AS costo FROM cat028_facturas WHERE proyecto = ?', proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                req.costo = fila[0]
                return next
            }
        })
    } catch (error) {
        console.log(error)
        return next;
    }
}
exports.getFacturasProyecto = async(req, res, next) => {
    try {
        const proyecto = req.query.proyecto
        conexion.query('SELECT * FROM facturas_view001 WHERE folio_proyecto = ?', proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                req.facturas = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.getDetallesFactura = async(req, res, next)=>{
    try {
        const factura = req.query.factura

        conexion.query('SELECT * FROM facturas_view001 WHERE folio = ?', factura, (error, fila)=>{
            if(error){
                throw error
            }else{
                req.factura = fila[0]
                return next()
            }
        })

    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.getProductosFactura = async(req, res, next)=>{
    try {
        const factura = req.query.factura

        conexion.query('SELECT * FROM productos_factura_view001 WHERE folio_factura = ?', factura, (error, fila)=>{
            if(error){
                throw error
            }else{
                req.productos = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.insertFactura = async(req, res, next)=>{
    try {
        let factura = {
            identificador: req.body.id,
            proveedor: req.body.proveedor,
            proyecto: req.body.proyecto,
            total: req.body.total,
            fecha: req.body.fecha,
            enlace: req.body.enlace
        }
        let bitacora = {
            usuario: req.body.usuario,
            fecha: new Date(),
            factura: 0,
            evento: 1
        }

        let ruta = calculateRutaProyecto(req.body.flag, req.body.ubicacion, req.body.cliente, factura.proyecto, req.body.permisos)

        bitacora.factura = await createFactura(factura)
        await registrarBitacora(bitacora)

        res.redirect(ruta)
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.insertProducto = async(req, res, next)=>{
    try {
        let registro = {
            factura:  req.body.factura,
            producto: req.body.producto,
            cantidad: req.body.cantidad,
            precio:   req.body.precio,
            unidad:   req.body.unidad
        }

        if(registro.unidad == 'other'){
            let unidad = {
                nombre: req.body.nu_unidad,
                abreviatura: req.body.nu_abreviatura,
                codigo_sat: req.body.nu_sat
            }
            registro.unidad = await registrarUnidad(unidad)
        }

        if(registro.producto == 'other'){
            let producto = {
                sku: req.body.sku,
                descripcion: req.body.descripcion,
                categoria: req.body.categoria,
                tipo: req.body.tipo,
                marca: req.body.marca,
                precio: registro.precio,
                enlace: req.body.enlace
            }

            if(producto.categoria == 'other'){
                let categoria = {
                    nombre: req.body.nueva_categoria
                }
                producto.categoria = await registrarCategoria(categoria)
            }

            if(producto.tipo == 'other'){
                let tipo = {
                    nombre: req.body.nuevo_tipo
                }
                producto.tipo = await registrarTipo(tipo)
            }

            if(producto.marca == 'other'){
                let marca = {
                    nombre: req.body.nueva_marca
                }
                producto.marca = await registrarMarca(marca)
                
                console.log(req.body.proveedor)

                let asociacion = {
                    proveedor: req.body.proveedor,
                    marca: producto.marca
                }
                await registrarMarcaEnProveedor(asociacion)
            }

            registro.producto = await registrarProductoNuevo(producto)
        }

        //Registramos el producto
        await registrarProductoEnFactura(registro)

        let bitacora = {
            usuario: req.body.usuario,
            fecha:   new Date(),
            factura: registro.factura,
            evento:  2
        }
        
        await registrarBitacora(bitacora)
        let ruta = calculateRutaDetalles(req.body.flag, registro.factura, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

        res.redirect(ruta)
        return next()

        
    } catch (error) {
        console.log(error)
        return next()
    }
}


