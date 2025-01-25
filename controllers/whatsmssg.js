import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.facebook.com/v16.0/583715364815513/messages'; // Cambia con tu ID de API
const WHATSAPP_TOKEN = 'EAANl4vFWNvsBOz17ZCLfcZAXqgORKHVzZClKoaB8HVCvAYjS3PJROS9jZBaZBhoZCfELtKSB2MFR8MA1PUoFJ5m5xDyBsOl3ogmlQeBuYMxtJZBFJsTgLhZCMsvByZBbAB0jUZCDPn4rO85S6IFD3rSlMWuZBe9h012uWt2zpTiaVroX7u7NxZBK484tz13IryBz9be6ZALwF6x5KxwGP60XE9PeodfZA3m2NkULQKCiLJ'; // Tu token de acceso de Meta

const sanitizeText = (text) => {
    return text
        .replace(/\n/g, ' ') // Reemplaza saltos de línea con un espacio
        .replace(/\t/g, ' ') // Reemplaza tabulaciones con un espacio
        .replace(/ {2,}/g, ' '); // Reemplaza múltiples espacios con un único espacio
};

export const sendWhatsAppNotification = async (to, variables) => {
    const sanitizedVariables = variables.map((text) => ({
        type: 'text',
        text: sanitizeText(text), // Limpia cada texto
    }));

    const data = {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
            name: 'alerta_viaticos', // Nombre de la plantilla configurada
            language: {
                code: 'es_MX', // Idioma de la plantilla
            },
            components: [
                {
                    type: 'body',
                    parameters: sanitizedVariables,
                },
            ],
        },
    };

    try {
        const response = await axios.post(WHATSAPP_API_URL, data, {
            headers: {
                Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(`Mensaje enviado: ${response.data.messages[0].id}`);
    } catch (error) {
        console.error('Error al enviar mensaje por WhatsApp:', error.response?.data || error.message);
    }
};
