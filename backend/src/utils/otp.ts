import {authenticator} from 'otplib';

const otpExpire = process.env.OTP_EXPIRY_MIN || '15';
const otpSecret = process.env.OTP_SECRET as string;

/*
 * El OPT expira en 15min y enviará 6 digitos para verificar
 */
const expireOTPInSeconds = 60 * parseInt(otpExpire);
authenticator.options = {
    step: expireOTPInSeconds,
    digits: 6
};

/*
 * Genera el OPT con el nombre del usuario y un key secreto cargado en el archivo .env
 */
export const generateOTP = (username: string) => {
    const secret = username + otpSecret;
    return authenticator.generate(secret);
};

/*
 * Decoded el OPT con el nombre y el codigo generado y enviado al correo
 */
export const verifyOTP = (username: string, otp: string) => {
    const secret = username + otpSecret;
    return authenticator.verify({secret, token: otp});
};
