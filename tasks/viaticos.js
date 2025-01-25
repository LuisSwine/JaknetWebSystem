import schedule from 'node-schedule';
import { verificarViaticosPendientes } from '../controllers/viaticosController';

schedule.scheduleJob('*/20 * * * *', () => {
    console.log('Ejecutando verificación de viáticos...');
    verificarViaticosPendientes();
});