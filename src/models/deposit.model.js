const { Schema, model } = require('mongoose');

const DepositSchema = Schema({

    user: { 
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

module.exports = model('Deposit', DepositSchema);
