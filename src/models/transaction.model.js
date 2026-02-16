const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({

    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    receiver: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    amount: { 
        type: Number, 
        required: true 
    },

    description: { 
        type: String 
    },

    date: { 
        type: Date, 
        default: Date.now 
    }
    
});

module.exports = model('Transaction', TransactionSchema);