import nodemailer from 'nodemailer'

const enviarCorreo = async(datos)=>{

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    await transport.sendMail({
        from: 'ERP | Jaknet SA de CV',
        to: datos.email,
        subject: datos.asunto,
        text: datos.texto,
        html: datos.cuerpo
    })

}

export {
    enviarCorreo
}