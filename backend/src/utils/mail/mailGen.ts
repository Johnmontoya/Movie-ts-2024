import Mailgen from 'mailgen';

/*
 * Diseño html para el mensaje
 */
export const mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
        name: 'Movies',
        link: 'movies.website.com'
    }
});
