'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOptions } from './cors-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { handleErrors } from '../middlewares/handle-errors.js';

import rolesRoutes from '../src/roles/role.routes.js';
import usersRoutes from '../src/users/user.routes.js';
import accountsRoutes from '../src/accounts/account.routes.js';
import depositsRoutes from '../src/deposits/deposit.routes.js';
import currenciesRoutes from '../src/currencies/currency.routes.js';
import cardsRoutes from '../src/cards/card.routes.js';
import passbooksRoutes from '../src/passbooks/passbook.routes.js';
import productsRoutes from '../src/products/product.routes.js';
import shoppingsRoutes from '../src/shoppings/shopping.routes.js';
import transactionsRoutes from '../src/transactions/transaction.routes.js';
import transfersRoutes from '../src/transfers/transfer.routes.js';
import servicesRoutes from '../src/services/service.routes.js';

import { Deposit } from '../src/deposits/deposit.model.js';
import { Shopping } from '../src/shoppings/shopping.model.js';
import { Transaction } from '../src/transactions/transaction.model.js';

const setupMiddlewares = (app) => {
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(morgan('dev'));
};

const setupRoutes = (app) => {
    const BASE_URL = '/api/v1';

    app.use(`${BASE_URL}/roles`, rolesRoutes);
    app.use(`${BASE_URL}/users`, usersRoutes);
    app.use(`${BASE_URL}/accounts`, accountsRoutes);
    app.use(`${BASE_URL}/deposits`, depositsRoutes);
    app.use(`${BASE_URL}/currencies`, currenciesRoutes);
    app.use(`${BASE_URL}/cards`, cardsRoutes);
    app.use(`${BASE_URL}/passbooks`, passbooksRoutes);
    app.use(`${BASE_URL}/products`, productsRoutes);
    app.use(`${BASE_URL}/shoppings`, shoppingsRoutes);
    app.use(`${BASE_URL}/transactions`, transactionsRoutes);
    app.use(`${BASE_URL}/transfers`, transfersRoutes);
    app.use(`${BASE_URL}/services`, servicesRoutes);

    app.get(`${BASE_URL}/check`, (req, res) => {
        res.status(200).json({ message: 'SistemaBancario Admin Server is up and running' });
    });

    app.use(handleErrors);
};

const syncHistoricalTransactions = async () => {
    try {
        console.log('Iniciando sincronización automática de transacciones históricas...');
        
        // Sincronizar depósitos
        const deposits = await Deposit.find();
        let depCount = 0;
        for (const dep of deposits) {
            const exists = await Transaction.findOne({
                type: 'Deposit',
                receptorAccount: dep.accountNumber,
                amount: dep.amount,
                date: dep.date
            });
            if (!exists) {
                await Transaction.create({
                    type: 'Deposit',
                    senderAccount: dep.senderAccount,
                    receptorAccount: dep.accountNumber,
                    amount: dep.amount,
                    description: dep.description || 'Depósito administrativo',
                    date: dep.date
                });
                depCount++;
            }
        }
        
        // Sincronizar compras
        const shoppings = await Shopping.find();
        let shopCount = 0;
        for (const shop of shoppings) {
            const exists = await Transaction.findOne({
                type: 'Payment',
                senderAccount: shop.accountNumber,
                amount: shop.amount,
                date: shop.date
            });
            if (!exists) {
                await Transaction.create({
                    type: 'Payment',
                    senderAccount: shop.accountNumber,
                    receptorAccount: shop.receptorAccount,
                    amount: shop.amount,
                    description: shop.description || 'Pago de compras',
                    date: shop.date
                });
                shopCount++;
            }
        }
        
        if (depCount > 0 || shopCount > 0) {
            console.log(`Sincronización finalizada: se auto-migraron ${depCount} depósitos y ${shopCount} compras al historial global.`);
        } else {
            console.log('Historial de transacciones ya se encuentra totalmente al día.');
        }
    } catch (error) {
        console.error('Error al sincronizar transacciones históricas:', error.message);
    }
};

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();
        await syncHistoricalTransactions();
        setupMiddlewares(app);
        setupRoutes(app);

        app.listen(PORT, () => {
            console.log(`Servidor Admin corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor Admin:', error);
    }
};
