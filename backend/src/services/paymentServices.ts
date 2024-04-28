import Stripe from 'stripe';
import {envConfig} from '../config/baseURL';
import {IPrice} from '../interfaces';
import Payment from '../models/payment';

const HOST: string = envConfig.host as string;
const PORT: string = envConfig.port as string;
const STRIPEKEY: string = envConfig.stripeSecret as string;
const stripe = new Stripe(STRIPEKEY, {
    apiVersion: '2024-04-10'
});

class PaymentServices {
    async retrievePlansStripe() {
        try {
            const products = await stripe.products.list({
                limit: 10
            });
            return products;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async retrieveOnePlan(id: string) {
        try {
            const product = await stripe.products.retrieve(id);
            return product;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async updatePlanStripe(id: string, namePlan: string) {
        try {
            const product = await stripe.products.update(id, {
                name: namePlan
            });
            return product;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async createPlanStripe(payload: IPrice) {
        try {
            const product = await stripe.products.create({
                name: payload.namePlan,
                marketing_features: [{name: payload.namePlan}],
                default_price_data: {
                    unit_amount: payload.amount,
                    currency: payload.usd,
                    recurring: {
                        interval: payload.interval
                    }
                }
            });
            return product;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async deletePlanStripe(id: string) {
        try {
            const deleted = await stripe.products.del(id);
            return deleted;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async savePrice(payload: IPrice) {
        try {
            const price = await stripe.prices.create({
                product: payload.namePlan,
                nickname: payload.namePlan,
                unit_amount: payload.amount,
                currency: payload.usd,
                recurring: {
                    interval: payload.interval
                },
                product_data: {
                    name: payload.namePlan
                }
            });
            return price;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async retrieveAllPrices() {
        try {
            const prices = await stripe.prices.list({
                limit: 10
            });
            return prices;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async statusPlan(productId: string, estado: boolean) {
        try {
            const product = await stripe.products.update(productId, {
                active: estado
            });
            return product;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async statusPrice(priceId: string, estado: boolean) {
        try {
            const price = await stripe.prices.update(priceId, {
                active: estado
            });
            return price;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async CheckSubscription(priceId: string, userId: number) {
        try {
            const session = await stripe.checkout.sessions.create({
                success_url: `${HOST}:${PORT}/api/v1/payment/success`,
                cancel_url: `${HOST}:${PORT}/api/v1/payment/cancel`,
                line_items: [
                    {
                        price: priceId,
                        quantity: 1
                    }
                ],
                mode: 'subscription'
            });

            if (session.status === 'open') {
                await Payment.create({
                    checkSessionId: session.id,
                    user_id: userId
                });
            }

            return session;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async GetCheckSubscriptions(sessionId: string) {
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const subscripcion = session.subscription as string;

            const data = await stripe.subscriptions.retrieve(subscripcion);
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async cancelSubscription(sub: string) {
        try {
            const subscription = await stripe.subscriptions.cancel(sub);
            return subscription;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default PaymentServices;
