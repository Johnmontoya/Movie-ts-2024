import nodemailer from 'nodemailer';
import {mailGenerator} from './mailGen';
import {ICreateUser} from '../../interfaces';

const {
    EMAIL_SERVICE,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
    HOST_URL,
    PORT
} = process.env;

/*
 * Conexion al servidor de mensajeria
 */
const transporter = nodemailer.createTransport({
    port: parseInt(EMAIL_PORT as string),
    host: EMAIL_SERVICE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

export const sendMail = (exports.sendMail = function (details: {
    to: string;
    subject: string;
    html: string;
    attachments?: any[];
    cc?: any;
    bcc?: any;
    from?: string;
}) {
    const mailOptions = {
        to: details.to,
        subject: details.subject,
        html: details.html,
        attachments: details.attachments || [],
        cc: details.cc || null,
        bcc: details.bcc || null,
        from: details.from || EMAIL_FROM
    };

    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
});

/*
 * Esqueleto del mensaje
 */
export const sendOTP = (data: ICreateUser, otp: string) => {
    const uri = `${HOST_URL}:${PORT}/api/v1/auth`;
    const email = {
        body: {
            name: `${data.username}`,
            intro: `Has recibido un email de recuperación de contraseña. Registra este OTP: ${otp} en 
              su campo correspondiente y luego la nueva contraseña`,
            action: {
                instructions:
                    'Click en el boton de abajo para cambiar su contraseña',
                button: {
                    color: '#DC4D2F',
                    text: 'Cambiar contraseña',
                    link: `${uri}/reset/${data.id}`
                }
            },
            outro: 'Si tu no has solicitado ningun cambio de contraseña, omite esta información'
        }
    };
    const templatePassword = () => mailGenerator.generate(email);

    return sendMail({
        to: data.email,
        html: templatePassword(),
        subject: 'Enlace para recuperar su cuenta de Movies'
    });
};

exports.sendMessage = (
    email: string,
    messageBody: any,
    attachment: any[] = []
) => {
    return sendMail({
        from: 'movies@gmail.com',
        to: email,
        attachments: attachment,
        subject: messageBody.subject,
        html: messageBody.body
    });
};
