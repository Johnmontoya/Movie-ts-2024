import {Router} from 'express';
import PaymentController from '../controllers/Payment';
import LogUser from '../middlewares/auth-require';
import isAdmin from '../middlewares/isAdmin';

const payRouter = Router();

payRouter.post('/plan', LogUser, isAdmin, PaymentController.createPlan);
payRouter.get('/plans', LogUser, PaymentController.getPlans);
payRouter.get('/plan/:id', LogUser, PaymentController.getOnePlan);
payRouter.put('/plan/:id', LogUser, isAdmin, PaymentController.updatePlan);
payRouter.put(
    '/plan/state/:id',
    LogUser,
    isAdmin,
    PaymentController.updateStatePlan
);
payRouter.delete('/plan/:id', LogUser, isAdmin, PaymentController.deletePlan);

payRouter.get('/prices', LogUser, PaymentController.getListPrices);
payRouter.post('/prices', LogUser, isAdmin, PaymentController.createPrice);
payRouter.put(
    '/prices/:id',
    LogUser,
    isAdmin,
    PaymentController.updateStatePrice
);

payRouter.get('/checkout/:id', LogUser, PaymentController.getCheckout);
payRouter.post('/checkout', LogUser, PaymentController.checkoutSession);
payRouter.delete(
    '/checkout/:id',
    LogUser,
    PaymentController.cancelSubscription
);
payRouter.get('/success', (req, res) =>
    res.json({
        message: 'Pago realizado'
    })
);
payRouter.get('/cancel', (req, res) =>
    res.json({
        message: 'Pago Cancelado'
    })
);

export default payRouter;
