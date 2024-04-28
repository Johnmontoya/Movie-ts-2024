import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY as string;

/* 
    ? Metodo de JWT
    * @params: payload => model [User]
    * expira en 1h el token
*/
export const sign = (payload: any, options = {expiresIn: '2h'}) => {
    return jwt.sign(payload, secret, options);
};

/*
    ? Metodo JWT
    * @params: token => Token generado por el metodo sign
    * decoded:  el token junto con la clave secret del archivo .env
*/
export const verify = (token: string) => {
    try {
        const decoded = jwt.verify(token, secret);
        return {valid: true, expired: false, decoded};
    } catch (error: any) {
        //console.log("token", error);
        throw new Error(error);
    }
};
