import schedule from 'node-schedule';
import { verificarViaticosPendientes } from './viaticosController.js';

schedule.scheduleJob('0 9 * * *', () => {
    console.log('Ejecutando verificación de viáticos...');
    verificarViaticosPendientes();
});