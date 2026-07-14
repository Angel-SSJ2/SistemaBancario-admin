import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/SistemaBancarioDB';

const Deposit = mongoose.model('Deposit', new mongoose.Schema({}, { strict: false }));
const Transaction = mongoose.model('Transaction', new mongoose.Schema({}, { strict: false }));
const Shopping = mongoose.model('Shopping', new mongoose.Schema({}, { strict: false }));
const Account = mongoose.model('Account', new mongoose.Schema({}, { strict: false }));

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');
        
        console.log('--- Collection Counts ---');
        console.log(`Accounts: ${await Account.countDocuments()}`);
        console.log(`Deposits: ${await Deposit.countDocuments()}`);
        console.log(`Transactions: ${await Transaction.countDocuments()}`);
        console.log(`Shoppings: ${await Shopping.countDocuments()}`);
        
        console.log('\n--- Sample Deposits ---');
        console.log(await Deposit.find().limit(3));
        
        console.log('\n--- Sample Transactions ---');
        console.log(await Transaction.find().limit(3));

        console.log('\n--- Sample Shoppings ---');
        console.log(await Shopping.find().limit(3));
        
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
