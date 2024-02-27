import express from "express";

import { isAuthenticated } from '../controllers/authController.js'
import { getProyecto } from "../controllers/proyectosController.js";


const router = express.Router()

//Definimos la ruta principal
router.get('/panorama', isAuthenticated, getProyecto, (req, res)=>{
    res.render('Proyectos/Panorama/panorama', {user: req.user, proyecto: req.proyecto})
} )

export default router
