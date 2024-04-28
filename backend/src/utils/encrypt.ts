import bcrypt from 'bcrypt';

/*
 * recibe la contraseña desde el controlador y crea el hash dependiendo del número de salt
 */
export const encryptAsync = (password: string) => {
    return bcrypt.hashSync(
        password,
        parseInt(process.env.JWT_ISSUER as string)
    );
};

/*
 * compara la contraseña desde el controlador y un hash, seguramente el almacenado en la base de datos del usuario
 */
export const compareAsync = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};
