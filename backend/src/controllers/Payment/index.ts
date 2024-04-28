import {NextFunction, Request, Response} from 'express';
import PaymentServices from '../../services/paymentServices';
import {StatusCodes} from 'http-status-codes';

const paymentServices = new PaymentServices();

async function getPlans(req: Request, res: Response, next: NextFunction) {
    try {
        const plans = await paymentServices.retrievePlansStripe();
        res.status(StatusCodes.OK).json({
            plans
        });
    } catch (error: any) {
        next(error);
    }
}

async function getOnePlan(req: Request, res: Response, next: NextFunction) {
    try {
        const planId = req.params.id;
        const plan = await paymentServices.retrieveOnePlan(planId);
        res.status(StatusCodes.OK).json({
            plan
        });
    } catch (error: any) {
        next(error);
    }
}

async function createPlan(req: Request, res: Response, next: NextFunction) {
    try {
        const payload = req.body;
        await paymentServices.createPlanStripe(payload);
        res.status(StatusCodes.CREATED).json({
            message: `Plan creado correctamente`
        });
    } catch (error: any) {
        next(error);
    }
}

async function updatePlan(req: Request, res: Response, next: NextFunction) {
    try {
        const planId = req.params.id;
        const {namePlan} = req.body;
        await paymentServices.updatePlanStripe(planId, namePlan);
        res.status(StatusCodes.OK).json({
            message: `Plan actualizado correctamente`
        });
    } catch (error: any) {
        next(error);
    }
}

async function deletePlan(req: Request, res: Response, next: NextFunction) {
    try {
        const planId = req.params.id;
        await paymentServices.deletePlanStripe(planId);
        res.status(StatusCodes.OK).json({
            message: `Plan eliminado correctamente`
        });
    } catch (error: any) {
        next(error);
    }
}

async function updateStatePlan(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const planId = req.params.id;
        const {estado} = req.body;
        await paymentServices.statusPlan(planId, estado);
        res.status(StatusCodes.OK).json({
            message: 'Plan actualizado'
        });
    } catch (error: any) {
        next(error);
    }
}

async function createPrice(req: Request, res: Response, next: NextFunction) {
    try {
        const payload = req.body;
        await paymentServices.savePrice(payload);
        res.status(StatusCodes.CREATED).json({
            message: `Precio creado correctamente`
        });
    } catch (error: any) {
        next(error);
    }
}

async function getListPrices(req: Request, res: Response, next: NextFunction) {
    try {
        const prices = await paymentServices.retrieveAllPrices();
        res.status(StatusCodes.OK).json({
            prices
        });
    } catch (error: any) {
        next(error);
    }
}

async function updateStatePrice(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const priceId = req.params.id;
        const {estado} = req.body;
        await paymentServices.statusPrice(priceId, estado);
        res.status(StatusCodes.OK).json({
            message: 'Precio actualizado'
        });
    } catch (error: any) {
        next(error);
    }
}

async function checkoutSession(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const {priceId, userId} = req.body;
        const data = await paymentServices.CheckSubscription(priceId, userId);
        res.status(StatusCodes.OK).json({
            url: data.url
        });
    } catch (error: any) {
        next(error);
    }
}

async function getCheckout(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId = req.params.id;
        const pay = await paymentServices.GetCheckSubscriptions(sessionId);
        res.status(StatusCodes.OK).json({
            pay
        });
    } catch (error: any) {
        next(error);
    }
}

async function cancelSubscription(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const subsId = req.params.id;
        await paymentServices.cancelSubscription(subsId);
        res.status(StatusCodes.OK).json({
            message: 'Subscripción cancelada'
        });
    } catch (error: any) {
        next(error);
    }
}

export default {
    createPlan,
    getPlans,
    getOnePlan,
    updatePlan,
    updateStatePlan,
    deletePlan,
    createPrice,
    getListPrices,
    updateStatePrice,
    checkoutSession,
    getCheckout,
    cancelSubscription
};
