import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/SistemaBancarioDB';

const Deposit = mongoose.model('Deposit', new mongoose.Schema({
    accountNumber: String,
    amount: Number,
    description: String,
    date: Date,
    status: String
}));

const Shopping = mongoose.model('Shopping', new mongoose.Schema({
    accountNumber: String,
    amount: Number,
    description: String,
    date: Date,
    status: String
}));

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    type: String,
    senderAccount: String,
    receptorAccount: String,
    amount: Number,
    description: String,
    date: Date
}));

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');
        
        console.log('Synchronizing existing Deposits to Transactions...');
        const deposits = await Deposit.find();
        let depCount = 0;
        for (const dep of deposits) {
            // Check if transaction already exists for this deposit
            const exists = await Transaction.findOne({
                type: 'Deposit',
                receptorAccount: dep.accountNumber,
                amount: dep.amount,
                date: dep.date
            });
            
            if (!exists) {
                await Transaction.create({
                    type: 'Deposit',
                    receptorAccount: dep.accountNumber,
                    amount: dep.amount,
                    description: dep.description || 'Depósito administrativo',
                    date: dep.date
                });
                depCount++;
            }
        }
        console.log(`Successfully migrated ${depCount} deposits to transactions.`);

        console.log('Synchronizing existing Shoppings to Transactions...');
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
                    amount: shop.amount,
                    description: shop.description || 'Pago de compras',
                    date: shop.date
                });
                shopCount++;
            }
        }
        console.log(`Successfully migrated ${shopCount} shoppings to transactions.`);
        
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
