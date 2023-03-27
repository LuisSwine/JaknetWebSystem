const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')
const PDF = require('pdfkit-table');
const PDFDocument = require('pdfkit-table');
const { fontSize } = require('pdfkit');

function calculateRuta(flag, cotizacion, proyecto, ubicacion, cliente, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0: ruta = `cotizacionMain?cotizacion=${cotizacion}&proyecto=${proyecto}&cliente=${cliente}&flag=0`; break;
        case 1: ruta = `cotizacionMain?cotizacion=${cotizacion}&proyecto=${proyecto}&cliente=${cliente}&flag=1`; break;
        case 2: ruta = `cotizacionMain?cotizacion=${cotizacion}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 3: ruta = `cotizacionMain?cotizacion=${cotizacion}&proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=${flag}`;break;
        case 4: ruta = `cotizacionMain?cotizacion=${cotizacion}&ubicacion=${ubicacion}&cliente=${cliente}&flag=4`; break;
        case 5: ruta = `cotizacionMain?cotizacion=${cotizacion}&ubicacion=${ubicacion}&cliente=${cliente}&flag=5`; break;
        case 6: ruta = `cotizacionMain?cotizacion=${cotizacion}&cliente=${cliente}&flag=6`;break;
        case 7: ruta = `cotizacionMain?cotizacion=${cotizacion}&proyecto=${proyecto}&cliente=${cliente}&flag=7&permisos=${permisos}`; break;
    }
    return ruta;
}

//COTIZACIONES
exports.selectCotizaciones = async(req, res, next)=>{
    try {
        if(req.query.proyecto){
            conexion.query("SELECT * FROM cotizaciones_view001 WHERE folio_proyecto = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.cotizaciones = fila
                    return next()
                }
            })
        }else if(req.query.ubicacion){
            conexion.query("SELECT * FROM cotizaciones_view001 WHERE folio_ubicacion = ?", [req.query.ubicacion], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.cotizaciones = fila
                    return next()
                }
            })
        } 
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectCotizacionesCliente = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM cotizaciones_view001 WHERE folio_cliente = ?", [req.query.cliente], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.cotizaciones = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.createCotizacion = async(req, res, next)=>{
    try {
        let cliente = req.query.cliente
        let ubicacion = req.query.ubicacion
        let flag = req.query.flag
        let proyecto = req.query.proyecto

        conexion.query("SELECT folio FROM cat006_contactos WHERE cliente = ? LIMIT 1", [cliente], (error2, fila)=>{
            if(error2){
                throw error2
            }else{
                let data = {
                    proyecto: req.params.folio,
                    contacto: fila[0].folio 
                }
                let insert = "INSERT INTO cat013_cotizaciones SET ?"
                conexion.query(insert, data, (error3, fila2)=>{
                    if(error3){
                        throw error3
                    }else{
                        let ruta = `/profileProyect/${req.params.folio}` 
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
exports.selectCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        conexion.query("SELECT * FROM cotizaciones_view001 WHERE folio = ?", [cotizacion], (error, fila)=>{
            if(error){
                throw error;
            }else{
                //Seleccionamos los valores de los productos
                conexion.query("SELECT SUM(costo_base) as subtotal_producto, SUM(subtotal_tecnicos) as subtotal_tecnicos, SUM(subtotal_supervisores) as subtotal_supervisores FROM productos_cotizacion_view001 WHERE cotizacion = ?", [cotizacion], (err2, fila2)=>{
                    if(err2){
                        throw err2
                    }else{
                        conexion.query("SELECT SUM(costo_servicio) as subtotal_servicio, SUM(subtotal_tecnicos) as subtotal_tecnicos, SUM(subtotal_supervisores) as subtotal_supervisores FROM servicios_cotizacion_view001 WHERE cotizacion = ?", [cotizacion], (err3, fila3)=>{
                            if(err3){
                                throw err3
                            }else{
                                let costoPersonal = 0 +fila2[0].subtotal_tecnicos + fila2[0].subtotal_supervisores + fila3[0].subtotal_tecnicos + fila3[0].subtotal_supervisores
                                let subtotal_productos = 0 + fila2[0].subtotal_producto
                                let subtotal_servicios = 0 + fila3[0].subtotal_servicio
                                let subtotal = 0 + costoPersonal + subtotal_productos + subtotal_servicios
                                let total = 0 + subtotal + (subtotal * (fila[0].rendimiento/100))+(subtotal * (fila[0].intereses/100))
                                req.costoPersonal = costoPersonal
                                req.subtotal_productos = subtotal_productos
                                req.subtotal_servicios = subtotal_servicios
                                req.subtotal = subtotal
                                req.total = total
                                req.cotizacion = fila
                                return next()
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirTasa = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let tasa = req.query.tasa

        let ruta = calculateRuta(req.query.flag, req.query.cotizacion, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos) 

        conexion.query("UPDATE cat013_cotizaciones SET rendimiento = ? WHERE folio = ?", [tasa, cotizacion], (error, fila)=>{
            if(error){
                throw error
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
exports.definirTecnico = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let costo = req.query.costo

        let ruta = calculateRuta(req.query.flag, req.query.cotizacion, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos) 

        conexion.query("UPDATE cat013_cotizaciones SET costo_tecnico = ? WHERE folio = ?", [costo, cotizacion], (error, fila)=>{
            if(error){
                throw error
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
exports.definirSupervisor = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let costo = req.query.costo

        let ruta = calculateRuta(req.query.flag, req.query.cotizacion, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos) 

        conexion.query("UPDATE cat013_cotizaciones SET costo_supervisor = ? WHERE folio = ?", [costo, cotizacion], (error, fila)=>{
            if(error){
                throw error
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
exports.definirIntereses = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let valor = req.query.valor

        let ruta = calculateRuta(req.query.flag, req.query.cotizacion, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos) 

        conexion.query("UPDATE cat013_cotizaciones SET intereses = ? WHERE folio = ?", [valor, cotizacion], (error, fila)=>{
            if(error){
                throw error
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
exports.addProducto = async(req, res, next) =>{
    try {
        let data = {
            producto: req.body.producto,
            cotizacion: req.body.cotizacion,
            costo: req.body.precio,
            cantidad: req.body.cantidad,
            tecnicos: req.body.tecnicos,
            supervisores: req.body.supervisores,
            dias: req.body.dias
        }

        let ruta = calculateRuta(req.body.flag, req.body.cotizacion, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos) 

        let insert = "INSERT INTO op008_lista_productos SET ?"
        conexion.query(insert, data, (error, result)=>{
            if(error){
                throw error
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
exports.selectProductosCotizacion = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM productos_cotizacion_view001 WHERE cotizacion = ?", [req.query.cotizacion], (error, filas)=>{
            if(error){
                throw error
            }else{
                req.productos = filas
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editarProductoCoti = async(req, res, next)=>{
    try {
        let folio        = req.body.folio
        let cantidad     = req.body.cantidad
        let tecnicos     = req.body.tecnicos
        let supervisores = req.body.supervisores
        let costo        = req.body.precio
        let dias         = req.body.dias

        let sql = "UPDATE op008_lista_productos SET cantidad = ?, tecnicos = ?, supervisores = ?, costo = ?, dias = ? WHERE folio = ?"

        let ruta = calculateRuta(req.body.flag, req.body.cotizacion, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

        conexion.query(sql, [cantidad, tecnicos, supervisores, costo, dias, folio], function(error, results){
            if(error){
                throw error
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
exports.selectProductoCoti = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM productos_cotizacion_view001 WHERE folio = ?", [req.query.producto], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.producto = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteProductCot = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let ruta = calculateRuta(req.query.flag, req.query.cotizacion, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos) 

        conexion.query("DELETE FROM op008_lista_productos WHERE folio = ?", [folio], (error, fila)=>{
            if(error){
                throw error
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
exports.addService = async(req, res, next) =>{
    try {
        let data = {
            servicio: req.body.servicio,
            cotizacion: req.body.cotizacion,
            costo: req.body.precio,
            tecnicos: req.body.tecnicos,
            supervisores: req.body.supervisores,
            dias: req.body.dias
        }

        let ruta = calculateRuta(req.body.flag, req.body.cotizacion, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos) 

        let insert = "INSERT INTO op009_lista_servicios SET ?"
        conexion.query(insert, data, (error, result)=>{
            if(error){
                throw error
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
exports.selectServiciosCotizacion = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM servicios_cotizacion_view001 WHERE cotizacion = ?", [req.query.cotizacion], (error, filas)=>{
            if(error){
                throw error
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
exports.editarServicioCoti = async(req, res, next)=>{
    try {
        let folio        = req.body.folio
        let tecnicos     = req.body.tecnicos
        let supervisores = req.body.supervisores
        let costo        = req.body.precio
        let dias         = req.body.dias

        let sql = "UPDATE op009_lista_servicios SET tecnicos = ?, supervisores = ?, costo = ?, dias = ? WHERE folio = ?"

        let ruta = calculateRuta(req.body.flag, req.body.cotizacion, req.body.proyecto, req.body.ubicacion, req.body.cliente, req.body.permisos)

        conexion.query(sql, [tecnicos, supervisores, costo, dias, folio], function(error, results){
            if(error){
                throw error
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
exports.selectServicioCoti = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM servicios_cotizacion_view001 WHERE folio = ?", [req.query.servicio], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.servicio = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteServiceCot = async(req, res, next)=>{
    try {
        let folio = req.query.folio
        let ruta = calculateRuta(req.query.flag, req.query.cotizacion, req.query.proyecto, req.query.ubicacion, req.query.cliente, req.query.permisos) 

        conexion.query("DELETE FROM op009_lista_servicios WHERE folio = ?", [folio], (error, fila)=>{
            if(error){
                throw error
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
exports.deleteCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.folio
        let ruta = calculateRuta(req.query.flag, req.query.cotizacion, req.query.proyecto, req.query.ubicacion, req.query.cliente)
        conexion.query("SELECT * FROM op008_lista_productos WHERE cotizacion = ?", [cotizacion], (err, fila)=>{
            if(err){
                throw err
            }else{
                if(fila.length === 0){
                    conexion.query("SELECT * FROM op009_lista_servicios WHERE cotizacion = ?", [cotizacion], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            if(fila2.length === 0){
                                conexion.query("DELETE FROM cat013_cotizaciones WHERE folio = ?", [cotizacion], (error3, fila3)=>{
                                    if(error3){
                                        throw error3
                                    }else{ 
                                        res.redirect(`/${ruta}`)
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
                                    ruta: `${ruta}` 
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
                        ruta: `${ruta}` 
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
exports.cotizacionPDF = async(req, res, next)=>{
    try {
        //OBTENEMOS EL FOLIO DE LA COTIZACION SOLICITADA
        let data ={
            cotizacion: req.query.cotizacion,
            fecha: new Date()
        }

        //Verificamos si ya esta creada en el controlador o no
        conexion.query("SELECT * FROM cotizacion_pdf_view001 WHERE cotizacion = ?", [data.cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //Si no existe
                    conexion.query("INSERT INTO op017_cotizacion_pdf SET ?", [data], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            //Ahora consultamos de nuevo el registro pero con la vista
                            conexion.query("SELECT * FROM cotizacion_pdf_view001 WHERE cotizacion = ?", [data.cotizacion], (error3, fila3)=>{
                                if(error3){
                                    throw error3
                                }else{
                                    req.registro = fila3
                                    return next()
                                }
                            })
                        }
                    })
                }else{
                    req.registro = fila
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.createPDFCot = async(req, res, next)=>{
    try {
        //RECIBIMOS EL NUMERO DE COTIZACION
        const cotizacion = req.query.cotizacion

        conexion.query("SELECT * FROM cotizacion_pdf_view001 WHERE cotizacion = ?", [cotizacion], (error, datosCot)=>{
            if(error){
                throw error
            }else{
                conexion.query("SELECT * FROM productos_cotizacion_view001 WHERE cotizacion = ?", [cotizacion], (error2, productos)=>{
                    if(error2){
                        throw error2
                    }else{
                        conexion.query("SELECT * FROM servicios_cotizacion_view001 WHERE cotizacion = ?", [cotizacion], (error3, servicios)=>{
                            if(error3){
                                throw error3
                            }else{
                                const doc = new PDFDocument({margin: 30, size: 'A4', bufferPages: true})

                                const fileName = `Cotizacion${datosCot[0].numero}.pdf`;

                                const stream  = res.writeHead(200, {
                                    'Content-Type': 'application/pdf',
                                    'Content-disposition': `attachment;filename=${fileName}`
                                });

                                doc.on('data', (data)=>{stream.write(data)});
                                doc.on('end', ()=>{stream.end()});

                                let datosTabla = [];
                                let i = 1, total = 0.0;
        
                                productos.forEach((producto)=>{
                                    let p_unitario =  producto.costo_unitario + (producto.costo_unitario * (datosCot[0].rendimiento / 100)) + (producto.costo_unitario * (datosCot[0].intereses / 100));
                                    let p_subtotal = p_unitario * producto.cantidad;   
                                    datosTabla.push({
                                        num: i,
                                        descripcion: producto.producto,
                                        cantidad: producto.cantidad,
                                        unidad: 'Pza.',
                                        pu: `$ ${p_unitario.toFixed(2)}`,
                                        subtotal: `$ ${p_subtotal.toFixed(2)}`
                                    })
                                    total += p_subtotal;
                                    i++;
                                })
                                servicios.forEach((servicio)=>{
                                    let p_servicio = servicio.costo_servicio + (servicio.costo_servicio * (datosCot[0].rendimiento / 100)) + (servicio.costo_servicio * (datosCot[0].intereses / 100));
                                    datosTabla.push({
                                        num: i,
                                        descripcion: servicio.servicio,
                                        cantidad: 1,
                                        unidad: 'Servicio',
                                        pu: `$ ${servicio.costo_servicio.toFixed(2)}`,
                                        subtotal: `$ ${servicio.costo_servicio.toFixed(2)}`
                                    })
                                    total += p_servicio;
                                    i++;
                                })
                                let fecha = new Date(datosCot[0].fecha)

                                let dia = fecha.getDate()
                                let mes = fecha.getMonth() + 1
                                let month;
                                    switch (mes) {
                                        case 1: month = 'enero'; break;
                                        case 2: month = 'febrero'; break;
                                        case 3: month = 'marzo'; break;
                                        case 4: month = 'abril'; break;
                                        case 5: month = 'mayo'; break;
                                        case 6: month = 'junio'; break;
                                        case 7: month = 'julio'; break;
                                        case 8: month = 'agosto'; break;
                                        case 9: month = 'septiembre'; break;
                                        case 10: month = 'octubre'; break;
                                        case 11: month = 'noviembre'; break;
                                        case 12: month = 'diciembre'; break;
                                    }
                                let year = fecha.getFullYear();
                                let imagen, empresa;
                                if(datosCot[0].emite == '1'){
                                    imagen = 'public/img/barafuste_logo.png'
                                    empresa = 'Barafuste, S.A. de C.V.'
                                }else if(datosCot[0].emite == '2'){
                                    imagen = 'public/img/logo.png'
                                    empresa = 'Jaknet, S.A. de C.V.'
                                }
                                
                                doc.image(imagen,{
                                    fit: [50,50],
                                    align: 'left',
                                    valign: 'top', x: 50, y: 50
                                })
                                doc.font('Times-Roman').fontSize(10).text(datosCot[0].numero, 479, 72)
                                doc.font('Times-Roman').fontSize(8).text(`Ciudad de México, a ${dia} de ${month} de ${year}`, 370, 92)

                                //Cuerpo del mensaje
                                doc.font('Times-Roman').fontSize(8).text(datosCot[0].destinatario, 55, 120)
                                doc.font('Times-Roman').fontSize(8).text(datosCot[0].puesto_destinatario)
                                doc.font('Times-Roman').fontSize(8).text(datosCot[0].cliente)
                                doc.font('Times-Roman').moveDown()
                                doc.font('Times-Roman').fontSize(8).text(`Estimado(a) ${datosCot[0].destinatario}`)
                                doc.font('Times-Roman').fontSize(8).text('A continuación, detallo cotización:')

                                const table = {
                                    headers: [
                                        {label: '#', property: 'num', width: 10, render: null},
                                        {label: 'Descripcion', property: 'descripcion', width: 280, render: null},
                                        {label: 'Cantidad', property: 'cantidad', width: 40, render: null},
                                        {label: 'Unidad', property: 'unidad', width: 30, render: null},
                                        {label: 'P.U.', property: 'pu', width: 60, render: null},
                                        {label: 'Subtotal', property: 'subtotal', width: 60, render: (value, indexColumn, indexRow, row) => { return `U$ ${Number(value).toFixed(2)}` }},
                                    ], datas: datosTabla,
                                };

                                doc.moveDown()
                                doc.table(table,{
                                    prepareHeader: ()=> doc.font("Helvetica-Bold").fontSize(5),
                                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell)=>{
                                        doc.font("Helvetica").fontSize(5);
                                        indexColumn === 0 && doc.addBackground(rectRow, 'white');
                                    },
                                });

                                doc.font('Times-Roman').fontSize(8).text(`Total.- $ ${total.toFixed(2)}`)
                                doc.font('Times-Roman').fontSize(8).text(`Moneda.- ${datosCot[0].moneda}`)
                                doc.font('Times-Roman').fontSize(8).text(`A este precio se le agregará el I.V.A.`)

                                doc.moveDown()

                                doc.font('Times-Bold').fontSize(8).text(`Ubicación:`)
                                doc.font('Times-Roman').fontSize(8).text(`${datosCot[0].ubicacion}`)
                                
                                doc.moveDown()

                                doc.font('Times-Bold').fontSize(8).text(`Solicita:`)
                                doc.font('Times-Roman').fontSize(8).text(`${datosCot[0].solicita}`)
                                
                                doc.moveDown()

                                doc.font('Times-Bold').fontSize(8).text(`Notas:`)
                                doc.font('Times-Roman').fontSize(8).text(`${datosCot[0].notas}`)
                                
                                doc.moveDown()

                                doc.image('public/img/firma_alberto.png',{
                                    fit: [70,70],
                                })
                                doc.fontSize(10).text(`Alberto Soria G.`)
                                doc.font('Times-Bold').text('Director General')

                                //Añadimos el pie de página
                                let bottom = doc.page.margins.bottom;
                                doc.page.margins.bottom = 0;
                                doc.text(empresa, 0.5 * (doc.page.width - 100), doc.page.height - 70, {
                                    width: 100,
                                    align: 'center',
                                    lineBreak: false,
                                })
                                doc.font('Times-Roman').text('Av.Ceylan 599', 0.5 * (doc.page.width - 100), doc.page.height - 60, {
                                    width: 100,
                                    align: 'center',
                                    lineBreak: false,
                                })
                                doc.font('Times-Roman').text('Col. Industrial Vallejo, C.P. 02300, Azcapotzalco', 0.5 * (doc.page.width - 300), doc.page.height - 50, {
                                    width: 300,
                                    align: 'center',
                                    lineBreak: false,
                                })
                                doc.font('Times-Roman').text('Ciudad de México', 0.5 * (doc.page.width - 100), doc.page.height - 40, {
                                    width: 100,
                                    align: 'center',
                                    lineBreak: false,
                                })
                                
                                // Reset text writer position
                                doc.text('', 50, 50)
                                doc.page.margins.bottom = bottom;
                                
                                let pageNumber = 1;

                                doc.on('pageAdded', () => {
                                    pageNumber++
                                    let bottom = doc.page.margins.bottom;
                                    doc.page.margins.bottom = 0;
                                
                                    doc.text(
                                        'Pág. ' + pageNumber, 
                                        0.5 * (doc.page.width - 100),
                                        doc.page.height - 50,{
                                            width: 100,
                                            align: 'center',
                                            lineBreak: false,
                                        })
                                
                                    // Reset text writer position
                                    doc.text('', 50, 50);
                                    doc.page.margins.bottom = bottom;
                                })
                                doc.end();
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

//funciones de personalizar pdf

exports.definirNumeroPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let numero = req.query.numero
        
        conexion.query("UPDATE op017_cotizacion_pdf SET numero = ? WHERE cotizacion = ?", [numero, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirDestinatarioPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let destinatario = req.query.destinatario
        
        conexion.query("UPDATE op017_cotizacion_pdf SET destinatario = ? WHERE cotizacion = ?", [destinatario, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirPuestoDestinatarioPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let puesto = req.query.puesto
        
        conexion.query("UPDATE op017_cotizacion_pdf SET puesto_destinatario = ? WHERE cotizacion = ?", [puesto, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirClientePDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let cliente = req.query.cliente
        
        conexion.query("UPDATE op017_cotizacion_pdf SET cliente = ? WHERE cotizacion = ?", [cliente, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirMonedaPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let moneda = req.query.moneda
        
        conexion.query("UPDATE op017_cotizacion_pdf SET moneda = ? WHERE cotizacion = ?", [moneda, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirUbicacionPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let ubicacion = req.query.ubicacion
        
        conexion.query("UPDATE op017_cotizacion_pdf SET ubicacion = ? WHERE cotizacion = ?", [ubicacion, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirQuienSolicitaPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let solicita = req.query.solicita
        
        conexion.query("UPDATE op017_cotizacion_pdf SET solicita = ? WHERE cotizacion = ?", [solicita, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirNotasPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let notas = req.query.notas
        
        conexion.query("UPDATE op017_cotizacion_pdf SET notas = ? WHERE cotizacion = ?", [notas, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.definirEmisorPDFCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.cotizacion
        let emisor = req.query.emisor
        
        conexion.query("UPDATE op017_cotizacion_pdf SET emite = ? WHERE cotizacion = ?", [emisor, cotizacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                const ruta = `/cotizacionPDF?cotizacion=${cotizacion}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}