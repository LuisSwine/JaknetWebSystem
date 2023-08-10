const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process');
const { resolve } = require('path');
const { rejects } = require('assert');

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




