import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '7374931493:AAHz_iGSmxX1XB7FMohoA4hbKTg3lAFTXIA';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

export const sendTelegramNotification = async (chatId, message) => {
    try {
        const response = await axios.post(TELEGRAM_API_URL, {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
        });
        console.log(`Notificación enviada: ${response.data.ok}`);
    } catch (error) {
        console.error('Error al enviar notificación de Telegram:', error.message);
    }
};
